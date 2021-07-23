import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { API, Storage } from "aws-amplify";
import { updateTodo as updateStudentMutation } from "../graphql/mutations";
import { SNS } from "aws-sdk";
const sns = new SNS({
  apiVersion: "2010-03-31",
  accessKeyId: "AKIAQQ6RSQ4T4DUM2E4T",
  secretAccessKey: "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",
  region: "us-east-1",
});
function EditStudent(props) {
  const student = props.history.location.state.student;

  const { id, firstname, lastname, age, email, studentId, program } = student;
  const pk = studentId;

  const initEditStudentFormData = {
    id,
    firstname,
    email,
    lastname,
    age,
    studentId,
    program,
  };

  const [editFormData, setEditFormData] = useState(initEditStudentFormData);

  const onFormChange = (e) => {
    setEditFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  async function onImageChange(e) {
    if (!e.target.files[0]) return;
    const image = e.target.files[0];
    setEditFormData({ ...editFormData, image: image.name });
    await Storage.put(image.name, image);
  }

  async function handleEdit() {
    try {
      const updatedStudent = await API.graphql({
        query: updateStudentMutation,
        variables: {
          input: { ...editFormData },
          condition: { studentId: { eq: pk } },
        },
      });

      if (editFormData.image) {
        const image = await Storage.put(editFormData.image);
      }
      console.log(updatedStudent);
      dispatchSNSEvent(editFormData.email);
    } catch (error) {
      console.log(error.message);
      console.log(error.response);
    }
  }

  const dispatchSNSEvent = async (email) => {
    let params = {
      Message: JSON.stringify({
        message: `User details for ${email} successfully updated`,
        email,
      }),
      Subject: "Update User",
      TopicArn: "arn:aws:sns:us-east-1:036409870119:RegisteredUsers",
    };

    sns.publish(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        props.history.push("/");
        console.log(data);
      } // successful response
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <br />
          <h1 className="text-center">Edit form</h1>
          <Form>
            <div>
              <label>Firstname</label>
              <input
                type="text"
                name="firstname"
                className="form-control"
                value={editFormData.firstname}
                onChange={(e) => onFormChange(e)}
              />
            </div>
            <div>
              <label>Lastname</label>
              <input
                type="text"
                name="lastname"
                value={editFormData.lastname}
                className="form-control"
                onChange={(e) => onFormChange(e)}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={editFormData.email}
                className="form-control"
                onChange={(e) => onFormChange(e)}
              />
            </div>
            <div className="row">
              <div className="col-md-6">
                <label>Student ID</label>
                <input
                  type="text"
                  name="studentId"
                  value={editFormData.studentId}
                  className="form-control"
                  onChange={(e) => onFormChange(e)}
                />
              </div>
              <div className="col-md-6">
                <label>Age</label>
                <input
                  type="text"
                  name="age"
                  value={editFormData.age}
                  className="form-control"
                  onChange={(e) => onFormChange(encodeURI)}
                />
              </div>
            </div>
            <div>
              <label>Select Program</label>
              <select
                className="form-control"
                name="program"
                value={editFormData.program}
                onChange={(e) => onFormChange(e)}
              >
                <option value="Bsc. Computer Science">
                  Bsc. Computer Science
                </option>
                <option value="Bsc. Information Technology">
                  Bsc. Information Technology
                </option>
                <option value="Bsc. Computer Networking">
                  Bsc. Computer Networking
                </option>
                <option value="Bsc. Computer Security and Network">
                  Bsc. Computer Security and Network
                </option>
              </select>
              <div>
                <label>Add Student Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => onImageChange(e)}
                />
              </div>
              <Button onClick={handleEdit}>Save Student</Button>
            </div>
          </Form>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
}

export default EditStudent;

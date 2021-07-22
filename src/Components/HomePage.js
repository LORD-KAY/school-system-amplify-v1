import React, { useState, useEffect } from "react";
import { API, Storage, graphqlOperation, Auth } from "aws-amplify";
import {
  createTodo as createStudentMutation,
  deleteTodo as deleteStudentMutation,
  deleteTodo,
} from "../graphql/mutations";
import { listTodos, searchTodos } from "../graphql/queries";
import { Button } from "react-bootstrap";
import AddStudentModal from "./Modal";
import StudentsTable from "./StudentsTable";
import Header from "./Header";
import Search from "./Search";
import "./Style.css";
const EventBridge = require("aws-sdk/clients/eventbridge");

const eventbridge = new EventBridge({
  apiVersion: "2015-10-07",
  region: "us-east-1",
  accessKeyId: "AKIAURDYITT4XLC33WG5",
  secretAccessKey: "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",
});

function HomePage() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [currentUser, setCurrentUser] = useState([]);
  const [color, setColor] = useState("");

  const handleShow = (state) => setShowModal(state);
  console.log(currentUser);

  async function fetchStudents() {
    const APIstudents = await API.graphql({ query: listTodos });
    const results = APIstudents.data.listTodos.items;
    await Promise.all(
      results.map(async (student) => {
        if (student.image) {
          const image = await Storage.get(student.image);
          student.image = image;
        }
        return student;
      })
    );
    setStudents(APIstudents.data.listTodos.items);
  }

  async function deleteStudent({ id }) {
    const filteredStudent = students.filter((student) => student.id !== id);
    await API.graphql({
      query: deleteStudentMutation,
      variables: { input: { id } },
    });
    setStudents(filteredStudent);
  }

  useEffect(() => {
    fetchStudents();
    getCurrentUser();
    setColorFun();
  }, []);

  async function getCurrentUser() {
    const { signInUserSession, attributes } =
      await Auth.currentAuthenticatedUser();
    console.log(attributes);
    setCurrentUser(attributes);
    if (signInUserSession.accessToken.payload["cognito:groups"]) {
      localStorage.setItem(
        "group",
        signInUserSession.accessToken.payload["cognito:groups"]
      );
      localStorage.setItem(
        "userLetter",
        attributes.email.charAt(0).toUpperCase().toString()
      );
    } else {
      localStorage.clear();
    }
  }

  async function saveStudentDetails(studentData) {
    const savedStudent = await API.graphql({
      query: createStudentMutation,
      variables: { input: studentData },
    });

    if (studentData.image) {
      const image = await Storage.put(studentData.image);
      studentData.image = image;
    }
    const { updatedAt, createdAt, ...rest } = savedStudent.data.createTodo;
    setStudents([...students, rest]);
    handleShow(false);
    sendSms(rest.phone);
  }

  const searchedValue = async (search) => {
    if (search === "") {
      fetchStudents();
      return;
    }
    const filter = {
      firstname: { match: search },
    };
    const results = await API.graphql(
      graphqlOperation(searchTodos, { filter: filter })
    );
    setStudents(results.data.searchTodos.items);
  };

  function setColorFun() {
    let colorsArray = [
      "rgb(0, 110, 161)",
      "rgb(150, 161, 0)",
      "rgb(161, 0, 54)",
      "rgb(123, 0, 161)",
      "rgb(0, 56, 161)",
    ];

    let randomColorIndex = Math.floor(Math.random() * colorsArray.length);
    let seletedColor = colorsArray[randomColorIndex];
    setColor(seletedColor);
  }

  const sendSms = async (phone) => {
    var params = {
      Entries: [
        /* required */
        {
          Detail: JSON.stringify({
            email: "dectechbusiness900@gmail.com",
            phone: phone,
            appType: "schoolsystem",
            message: "Testing from the event bridge",
          }),
          DetailType: "Sending Email to Registered Users",
          EventBusName:
            "arn:aws:events:us-east-2:311637351673:event-bus/Notifications--EventBridge",
          Resources: [],
          Source: "com.digitalagenetwork.schoolsystem",
          Time: new Date(),
        },
        /* more items */
      ],
    };
    eventbridge.putEvents(params, function (err, data) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else console.log(data); // successful response
    });
  };

  return (
    <div>
      <Header currentUser={currentUser} color={color} />
      <div className="header">
        <h1 className="container text-center">List of Students</h1>
        <div className="container">
          <hr style={{ background: `${color}` }} />
        </div>
      </div>

      <Search searchTerm={searchedValue} />
      <div className="tableSection container">
        <StudentsTable students={students} delFun={deleteStudent} />

        <AddStudentModal
          getStudentDetails={saveStudentDetails}
          showModal={showModal}
          handleShow={handleShow}
          state={showModal}
        />
        <Button variant="primary" onClick={() => handleShow(true)}>
          Add New Student
        </Button>
      </div>
    </div>
  );
}

export default HomePage;

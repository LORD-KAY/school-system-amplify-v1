import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { Storage } from 'aws-amplify'

const initStudentFormData = { firstname: '', lastname: '', age: '', studentId: '', program: 'Bsc. Computer Science' }

function AddStudentModal(props) {

    function handleClose() {
        props.handleShow(false)
    }
    const [studentFormData, setStudentFormData] = useState(initStudentFormData)

    function onFormChange(e) {
        setStudentFormData(prevState => {
            return {
                ...prevState, [e.target.name]: e.target.value
            }
        })
    }

    function handleSubmit() {
        // console.log(studentFormData)
        props.getStudentDetails(studentFormData)
        setStudentFormData(initStudentFormData)

    }

    async function onImageUpload(e) {
        if (!e.target.files[0]) return
        const image = e.target.files[0];
        setStudentFormData({ ...studentFormData, image: image.name })
        await Storage.put(image.name, image)
    }

    return (
        <div>


            <Modal show={props.showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div>
                            <label>Firstname</label>
                            <input type="text" name="firstname" value={studentFormData.firstname} onChange={e => onFormChange(e)} className="form-control" />
                        </div>
                        <div>
                            <label>Lastname</label>
                            <input type="text" value={studentFormData.lastname} name="lastname" className="form-control" onChange={e => onFormChange(e)} />
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label>Student ID</label>
                                <input type="text" name="studentId" value={studentFormData.studentId} onChange={e => onFormChange(e)} className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label>Age</label>
                                <input type="text" name="age" value={studentFormData.age} onChange={e => onFormChange(e)} className="form-control" />
                            </div>
                        </div>
                        <div>
                            <label>Select Program</label>
                            <select className="form-control" name="program" onChange={e => onFormChange(e)} value={studentFormData.program}>
                                <option value="Bsc. Computer Science">Bsc. Computer Science</option>
                                <option value="Bsc. Information Technology">Bsc. Information Technology</option>
                                <option value="Bsc. Computer Networking">Bsc. Computer Networking</option>
                                <option value="Bsc. Computer Security and Network">Bsc. Computer Security and Network</option>
                            </select>
                            <div>
                                <label>Add Student Image</label>
                                <input type="file" className="form-control" onChange={(e) => onImageUpload(e)} />
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddStudentModal
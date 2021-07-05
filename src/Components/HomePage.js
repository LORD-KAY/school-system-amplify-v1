import React, { useState, useEffect } from 'react'
import { API, Storage } from 'aws-amplify'
import { createTodo as createStudentMutation, deleteTodo as deleteStudentMutation, deleteTodo } from '../graphql/mutations'
import { listTodos } from '../graphql/queries'
import { Jumbotron, Button } from 'react-bootstrap'
import AddStudentModal from './Modal';
import StudentsTable from './StudentsTable';

function HomePage() {
    const [students, setStudents] = useState([])
    const [showModal, setShowModal] = useState(false)

    const handleShow = (state) => setShowModal(state);


    async function fetchStudents() {
        const APIstudents = await API.graphql({ query: listTodos })
        const results = APIstudents.data.listTodos.items
        await Promise.all(results.map(async student => {
            if (student.image) {
                const image = await Storage.get(student.image)
                student.image = image

            }
            return student
        }))
        setStudents(APIstudents.data.listTodos.items)

    }

    async function deleteStudent({ id }) {
        const filteredStudent = students.filter(student => student.id !== id)
        await API.graphql({ query: deleteStudentMutation, variables: { input: { id } } })
        setStudents(filteredStudent)
    }



    useEffect(() => {
        fetchStudents()
    }, [students])

    async function saveStudentDetails(studentData) {
        // console.log(studentData)

        const savedStudent = await API.graphql({ query: createStudentMutation, variables: { input: studentData } })
        //save actual stud image
        if (studentData.image) {
            const image = await Storage.put(studentData.image)
            studentData.image = image
        }
        const { updatedAt, createdAt, ...rest } = savedStudent.data.createTodo
        setStudents([...students, rest])
        handleShow(false)

    }

    return (
        <div>

            <Jumbotron>
                <h1 className="text-center">List of Students</h1>
            </Jumbotron>

            <div className="container">

                <StudentsTable students={students} delFun={deleteStudent} />

                <AddStudentModal getStudentDetails={saveStudentDetails} showModal={showModal} handleShow={handleShow} state={showModal} />
                <Button variant="primary" onClick={() => handleShow(true)}>
                    Add New Student
                </Button>

            </div>
        </div>
    )
}

export default HomePage
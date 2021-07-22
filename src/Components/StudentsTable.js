import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function StudentsTable(props) {

    const students = props.students
    function deleteStudent(student) {
        const results = window.confirm(`Do you want to delete ${student.firstname}?`)

        if (results) {
            props.delFun(student)
        }
    }



    return (
        <div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Stud Image</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Student ID</th>
                        <th>Phone</th>
                        <th>Age</th>
                        <th>Course</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map((student, index) => {
                            let studIndex = index + 1

                            return (
                                <tr key={student.id}>
                                    <td>{studIndex}</td>
                                    <td>{student.image ? <img  src={student.image} alt="Student" style={{ borderRadius: '50px', height: '55px', width: '55px' }} /> : student.firstname.charAt(0)}</td>
                                    <td>{student.firstname}</td>
                                    <td>{student.lastname}</td>
                                    <td>{student.studentId}</td>
                                    <td>{student.phone}</td>
                                    <td>{student.age}</td>
                                    <td>{student.program}</td>
                                    <td>
                                       { localStorage.getItem('group')?.toLocaleLowerCase() !== 'students' &&  <IconButton className="text-danger" onClick={() => deleteStudent(student)}><Icon>delete</Icon></IconButton> } 
                                        <Link to={{ pathname: `/studentEdit/${student.id}`, state: { student: student } }}><IconButton className="text-success"><Icon>edit</Icon></IconButton></Link>
                                    </td>
                                </tr>

                            )
                        })
                    }


                </tbody>
            </Table>

        </div>
    )
}

export default StudentsTable
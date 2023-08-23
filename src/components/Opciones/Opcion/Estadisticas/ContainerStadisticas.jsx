import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import CourseChartPie from '../../../Charts/CourseChartPie';
import AgeChartPie from '../../../Charts/AgeChartPie';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function ContainerStadisticas({ onClose }) {

    const [courses, setCourses] = useState()
    const [course, setCourse] = useState()
    const [users, setUsers] = useState()

    const getAllCourses = async () => {
        const response = await axios.get('https://mern-crud-back-g6vxux25g-nahucham18.vercel.app/api/course')
        // console.log(response.data)
        setCourses(response.data)
    }

    const handleCheck = async (event) => {
        const response = await axios.get(`https://mern-crud-back-g6vxux25g-nahucham18.vercel.app/api/course/${event.target.value}`)
        // console.log(response.data)
        setCourse(response.data)
        const responseUsers = await axios.get(`https://mern-crud-back-g6vxux25g-nahucham18.vercel.app/api/user/bycourse?courseID=${response.data._id}`)
        // console.log(responseUsers)
        setUsers(responseUsers.data)
    }

    const getAllUsers = async () => {
        const response = await axios.get('https://mern-crud-back-g6vxux25g-nahucham18.vercel.app/api/user')
        console.log(response.data)
        setUsers(response.data)
    }


    useEffect(() => {
        getAllUsers();
        getAllCourses();
    }, [])

    console.log(users)

    return (
        <div className="container d-flex flex-wrap jutify-content-center ">
            <Button className='mb-3' variant='dark' onClick={() => onClose('stats')}>Volver</Button>
            <div className="container  ">
                <div className="row">
                    <div className="col-sm-6">
                        <Card style={{ width: '18rem' }}>
                            {
                                course ?
                                <Card.Img variant="top" src={course?.img_course} />
                                :
                                <></>
                            }
                            
                            <Card.Body style={{ textAlign: 'left' }}>
                                <Card.Title>{course ? course?.name : "Titulo del curso"}</Card.Title>
                                <Card.Text>{course ? course?.description : "Descripcion del curso"}</Card.Text>
                                <Card.Text>{course ? course?.category?.name : "Categoria del curso"}</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-md-6 bg-body-secondary">
                        <div className="container">
                            <Form>
                                <Form.Control className='mb-3' type='text' name='id' placeholder='buscar curso' />
                                <div className='overflow-y-scroll' style={{ height: '200px' }}>
                                    {
                                        courses?.map((course, index) => {
                                            return (
                                                <Form.Check type='radio' key={index + 1} style={{textAlign:'left'}}>
                                                    <Form.Check.Input type='radio' name='id' id={index + 1} onChange={handleCheck} value={course?._id} />
                                                    <Form.Check.Label>{course?.category?.name} - {course?.name}</Form.Check.Label>
                                                </Form.Check>
                                            )
                                        })
                                    }
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className='container' style={{ width: "100%", height: "100%", padding: "10px 0", maxHeight: "400px", maxWidth: "600px" }}>
                    {
                        users?
                        <h2>personas {users.length  }</h2>
                        :
                        <></>
                    }
                    
                    <div className="row">
                        <div className="col-md-6">
                            <CourseChartPie users={users} />
                        </div>
                        <div className="col-md-6">
                            <AgeChartPie users={users} />
                        </div>


                    </div>
                </div>
            </div>


        </div>
    )
}
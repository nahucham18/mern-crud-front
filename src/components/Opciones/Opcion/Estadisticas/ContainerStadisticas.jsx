import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import CourseChartPie from '../../../Charts/CourseChartPie';

export default function ContainerStadisticas({ onClose }) {

    const [courses, setCourses] = useState()
    const [course, setCourse] = useState()

    const getAllCourses = async () => {
        const response = await axios.get('http://localhost:3001/api/course')
        console.log(response.data)
        setCourses(response.data)
    }

    const handleCheck = async (event) => {
        const response = await axios.get(`http://localhost:3001/api/course/${event.target.value}`)
        console.log(response.data)
        setCourse(response.data)
    }

    useEffect(() => {
        getAllCourses();
    }, [])

    return (
        <div className="container d-flex flex-wrap jutify-content-center ">
            <h2 onClick={() => onClose()}>Volver</h2>
            <div className="container  ">
                <div className="row">
                    <div className="col-sm-6 bg-danger">
                        <div className='row h-50'>
                            img-photo
                        </div>
                        <div className='row h-50' >
                            <h2>{course ? course.name : "Titulo de curso"}</h2>
                            <span>{course ? course?.category?.name : "Categoria"}</span>
                            <p>{course ? course.description : "Descripcion del curso"}</p>
                        </div>
                    </div>

                    <div className="col-md-6 bg-body-secondary">
                        <div className="container">
                            <Form>
                                <Form.Control type='text' name='id' placeholder='buscar curso' />
                                <div>
                                    {
                                        courses?.map((course, index) => {
                                            return (
                                                <Form.Check type='radio' key={index + 1} >
                                                    <Form.Check.Input type='radio' name='id' id={index + 1} onChange={handleCheck} value={course._id} />
                                                    <Form.Check.Label>{course.category.name} - {course.name}</Form.Check.Label>
                                                </Form.Check>
                                            )
                                        })
                                    }
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className='w' style={{width:"100&", height:"100%" , padding:"10px 0" , maxHeight:"300px" , maxWidth:"400px"}}>
                    <CourseChartPie />
                </div>
            </div>


        </div>
    )
}
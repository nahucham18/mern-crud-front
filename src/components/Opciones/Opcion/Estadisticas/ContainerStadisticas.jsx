import { useEffect, useState } from 'react';
//Axios
import axios from 'axios';
//React-bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row  from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//Charts
import CourseChartPie from '../../../Charts/CourseChartPie';
import AgeChartPie from '../../../Charts/AgeChartPie';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { searchCourses } from '../../../../features/courses/coursesSlice';

export default function ContainerStadisticas({ onClose }) {

    

    const dispatch = useDispatch()
    const categories = useSelector(state => state.category.categories)
    const courses = useSelector(state => state.courses.filterCourses)

    const [course, setCourse] = useState()
    const [users, setUsers] = useState()

    const searchCategory = (event) => {
        dispatch(searchCourses(event.target.value))
    }

    const handleCheck = async (event) => {
        const response = await axios.get(`https://mern-crud-back-silk.vercel.app/api/course/${event.target.value}`)
        setCourse(response.data)
        const responseUsers = await axios.get(`https://mern-crud-back-silk.vercel.app/api/user/bycourse?courseID=${response.data._id}`)
        setUsers(responseUsers.data)
    }

    const getAllUsers = async () => {
        const response = await axios.get('https://mern-crud-back-silk.vercel.app/api/user')
        setUsers(response.data)
    }



    useEffect(() => {
        getAllUsers();
    }, [])

    return (
        <Col className="container col-11 col-sm-10 col-md-8 col-lg-7" style={{margin:'0 auto'}}>
            <Row>
                <Button size='sm' className='mb-3 col-3 col-sm-2 col-lg-1' variant='dark'
                style={{minWidth:'70px'}}
                onClick={() => onClose('stats')}>Volver</Button>
            </Row>
            <Row className=''>
                <Col className="col-12 col-md-10 col-lg-6 bg-body-secondary" style={{margin:'0 auto'}}>

                    <Form>
                        <Form.Select className='mb-3' name='categoryID' onChange={searchCategory}>
                            <option value="">Seleccione una categoria</option>
                            <option value="all">Toda las categorias</option>
                            {
                                categories?.map((category, index) => {
                                    return (
                                        <option value={category?._id} key={index}>{category?.name}</option>
                                    )
                                })
                            }
                        </Form.Select>
                        <div className='overflow-y-scroll' style={{ height: '200px' }}>
                            {
                                courses?.map((course, index) => {
                                    return (
                                        <Form.Check type='radio' key={index + 1} style={{ textAlign: 'left' }}>
                                            <Form.Check.Input type='radio' name='id' id={index + 1} onChange={handleCheck} value={course?._id} />
                                            <Form.Check.Label>{course?.category?.name} - {course?.name}</Form.Check.Label>
                                        </Form.Check>
                                    )
                                })
                            }
                        </div>
                    </Form>

                </Col>
                <Col className=" col-12 col-md-10 col-lg-6" style={{margin:'0 auto'}}>
                    <Card style={{ height: '100%' }}>
                        {
                            course ?
                                <>
                                    <Card.Img variant="top" src={course?.img_course} />
                                    <Card.Body style={{ textAlign: 'left', height: '50%   ' }}>
                                        <Card.Title>{course ? course?.name : "Titulo del curso"}</Card.Title>
                                        <Card.Text>{course ? course?.description : "Descripcion del curso"}</Card.Text>
                                        <Card.Text>{course ? course?.category?.name : "Categoria del curso"}</Card.Text>
                                    </Card.Body>
                                </>
                                :
                                <>
                                    <Card.Body className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100%' }}>
                                        <Card.Title className='fs-2 fw-bold mb-3'>{"Titulo del curso"}</Card.Title>
                                        <Card.Text>{"Descripcion del curso"}</Card.Text>
                                        <Card.Text>{"Categoria del curso"}</Card.Text>
                                    </Card.Body>
                                </>
                        }


                    </Card>
                </Col>

            </Row>
            <Row>
                {
                    users ?
                        <h2 className='fw-bold fs-2'>Usuarios: {users.length}</h2>
                        :
                        <></>
                }
            </Row>
            <Row className=''>
                        <Col className=" col-12 col-sm-6">
                            <CourseChartPie users={users} />
                        </Col>
                        <Col className="col-12 col-sm-6">
                            <AgeChartPie users={users} />
                        </Col>
            </Row>


        </Col>
    )
}
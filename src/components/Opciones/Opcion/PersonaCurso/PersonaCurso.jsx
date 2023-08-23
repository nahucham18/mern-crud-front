import { useEffect, useState } from 'react';
import imgOpc from '../../../../assets/personaCurso.png';
import style from './PersonaCurso.module.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers } from '../../../../features/users/usersSlice';
import { searchCourses } from '../../../../features/courses/coursesSlice';

export default function PersonaCurso() {

    const dispatch = useDispatch()
    const users = useSelector(state => state.users.filterUsers)
    const categorias = useSelector(state => state.category.categories)
    const courses = useSelector(state => state.courses.filterCourses)

    const [show, setShow] = useState(false);
    // const [users, setUsers] = useState()
    const [user, setUser] = useState("")
    // const [courses, setCourses] = useState()
    const [curso, setCurso] = useState("")

    const onShow = () => {
        setShow(true);
    }

    const onClose = () => {
        setShow(false);
    }


    // const getAllUsers = async () => {
    //     const usuarios = await axios.get('https://mern-crud-back-g6vxux25g-nahucham18.vercel.app/api/user');
    //     setUsers(usuarios.data)
    //     console.log(usuarios)
    // }

    // const getAllCourses = async () => {
    //     const cursos = await axios.get('https://mern-crud-back-g6vxux25g-nahucham18.vercel.app/api/course')
    //     setCourses(cursos.data)
    // }

    const searchUser = (event) => {
        dispatch(searchUsers(event.target.value.toLowerCase()))
    }

    const searchCategory = (event) => {
        dispatch(searchCourses(event.target.value))
    }

    const handleCheckUser = async (event) => {
        console.log(event.target.value)
        const response = await axios.get(`https://mern-crud-back-g6vxux25g-nahucham18.vercel.app/api/user/${event.target.value}`)
        setUser(response.data)
    }

    const handleCheckCourse = async (event) => {
        console.log(event.target.value)
        const response = await axios.get(`https://mern-crud-back-g6vxux25g-nahucham18.vercel.app/api/course/${event.target.value}`)
        console.log(response.data)
        setCurso(response.data)
    }

    const putUser = async () => {
        try {
            const response = await axios.put(`https://mern-crud-back-g6vxux25g-nahucham18.vercel.app/api/user/${user._id}`, { courses: curso._id });
            console.log(response.data.data);
            const newCourse = response.data.data.courses.slice(-1)[0]
            console.log({ newCourse: newCourse })
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Se agrego exitosamente`,
                text: `${response.data.data.first_name} se agrego a ${response.data.data.courses.slice(-1)[0].name}`
            })
        } catch (error) {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Error',
                text: error.response.data.message
            })
        }
    }

    useEffect(() => {
        console.log(user._id)
        console.log(curso._id)
    }, [show])


    console.log(user)
    console.log(curso)
    return (
        <>
            <div className='col-8 col-sm-6 col-md-6 col-lg-4 mb-3 px-3'style={{margin:'0 auto'}}>
                <article className="card pointer" onClick={onShow} style={{height:'200px'}}>
                    <img className='cardImage' src={imgOpc} alt="img-asignar-persona-a-curso" style={{height:'80%', objectFit:'contain'}}/>
                    <h3 className='card-title card-title-custom'>Asignar a curso</h3>
                </article>
            </div>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>Asignar persona a curso</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control
                                type='text'
                                placeholder='Buscar alumno..'
                                autoFocus
                                onChange={searchUser}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Personas:</Form.Label>

                            {
                                users
                                    ?
                                    <div className='container overflow-y-scroll' style={{ height: '130px' }}>
                                        {
                                            (users.length > 0)
                                            ?
                                           
                                            users?.map((user, index) => {
                                                return (
                                                    <Form.Check type='radio' key={index + 1}>
                                                        <Form.Check.Input type='radio' name='id' id={index + 1} onChange={handleCheckUser} value={user._id} />
                                                        <Form.Check.Label>DNI: {user.dni} - {user.last_name} {user.first_name}</Form.Check.Label>
                                                    </Form.Check>
                                                )
                                            })
                                        :
                                        <>No hay personas con ese nombre..</>}
                                    </div>
                                    :
                                    <></>
                            }
                        </Form.Group>


                        <Form.Group>
                            <Form.Label>Cursos:</Form.Label>
                            <Form.Group className='mb-3' controlId='exampleForm'>
                                {
                                    categorias
                                        ?
                                        <Form.Select name='categoryID' onChange={searchCategory}>
                                            <option disabled value="">Buscar por categoria..</option>
                                            <option value='all'>Todas las categorias</option>
                                            {
                                                categorias?.map((category, index) => {
                                                    return (
                                                        <option key={index} value={category?._id}>{category?.name}</option>
                                                    )
                                                })
                                            }
                                        </Form.Select>
                                        :
                                        <></>}
                            </Form.Group>
                            {
                                courses
                                    ?
                                    <div className='container overflow-y-scroll' style={{ height: '130px' }}>
                                        {
                                            courses?.map((course, index) => {
                                                return (
                                                    <Form.Check type='radio' key={index + 1}>
                                                        <Form.Check.Input type='radio' name='curso ' id={index + 1} value={course?._id} onChange={handleCheckCourse} />
                                                        <Form.Check.Label>{course?.category?.name} - {course?.name}</Form.Check.Label>
                                                    </Form.Check>
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    <></>
                            }
                        </Form.Group>
                    </Form>
                    

                </Modal.Body>
                <Modal.Footer>
                <div className='container mt-3 '>
                        <Row className="justify-content-center " style={{textAlign: 'center', fontSize:'1rem',fontWeight:'bold', marginBottom: "2rem"}}>
                            {
                                user?
                                <Col  xs={5}>{user?.last_name} {user?.first_name}</Col>
                                : <></>
                            }
                            {
                                user && curso 
                                ?
                                <Col xs={2}>-</Col>
                                :
                                <></>
                            }
                            {
                                curso?
                                <Col xs={5}>{curso?.name} - {curso?.category?.name}</Col>
                                :
                                <></>
                            }
                            
                            
                        </Row>
                        <div className='mt-3' style={{display:'flex', justifyContent:'center'}}>
                            {
                                (user._id === undefined || curso._id === undefined)
                                ?
                                <Button  variant='secondary' >Agregar</Button>
                                :
                                <Button  onClick={putUser} variant='primary' >Agregar</Button>
                            }
                            
                        </div>
                    </div>
                </Modal.Footer>
            </Modal >
        </>
    )
}
import { useEffect, useState } from 'react';
import imgOpc from '../../../../assets/opc4.jpg';
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
    const [user, setUser] = useState()
    // const [courses, setCourses] = useState()
    const [curso, setCurso] = useState()

    const onShow = () => {
        setShow(true);
    }

    const onClose = () => {
        setShow(false);
    }


    // const getAllUsers = async () => {
    //     const usuarios = await axios.get('http://localhost:3001/api/user');
    //     setUsers(usuarios.data)
    //     console.log(usuarios)
    // }

    // const getAllCourses = async () => {
    //     const cursos = await axios.get('http://localhost:3001/api/course')
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
        const response = await axios.get(`http://localhost:3001/api/user/${event.target.value}`)
        setUser(response.data)
    }

    const handleCheckCourse = async (event) => {
        console.log(event.target.value)
        const response = await axios.get(`http://localhost:3001/api/course/${event.target.value}`)
        console.log(response.data)
        setCurso(response.data)
    }

    const putUser = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/api/user/${user._id}`, { courses: curso._id });
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
        // getAllUsers()
        // getAllCourses()
    }, [show])


    console.log(user)
    console.log(curso)
    return (
        <>
            <div className="col-md-4 mb-3 px-3">
                <article className="card" onClick={onShow}>
                    <img className={style.cardImage} src={imgOpc} alt="img-asignar-persona-a-curso" />
                    <h3 className='card-title'>Asignar persona a curso</h3>
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
                                            <option selected disabled value="">Buscar por categoria..</option>
                                            <option value='all'>Todas las categorias</option>
                                            {
                                                categorias?.map((category, index) => {
                                                    return (
                                                        <option key={index} value={category._id}>{category.name}</option>
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
                                                        <Form.Check.Input type='radio' name='curso ' id={index + 1} value={course._id} onChange={handleCheckCourse} />
                                                        <Form.Check.Label>{course.category.name} - {course.name}</Form.Check.Label>
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
                        <Row className="justify-content-center">
                            <Col xs={6}>{user?.last_name} {user?.first_name}</Col>
                            <Col xs={6}>{curso?.name} - {curso?.category?.name}</Col>
                        </Row>
                        <div className='row col-3 mt-3'>
                            <Button onClick={putUser} variant='primary' >Agregar</Button>{''}
                        </div>
                    </div>
                </Modal.Footer>
            </Modal >
        </>
    )
}
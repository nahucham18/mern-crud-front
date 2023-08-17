import { useEffect, useState } from 'react';
import imgOpc from '../../../../assets/opc4.jpg';
import style from './PersonaCurso.module.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


export default function PersonaCurso() {

    const [show, setShow] = useState(false);
    const [users, setUsers] = useState()
    const [user, setUser] = useState()
    const [courses, setCourses] = useState()
    const [curso, setCurso] = useState()

    const onShow = () => {
        setShow(true);
    }

    const onClose = () => {
        setShow(false);
    }


    const getAllUsers = async () => {
        const usuarios = await axios.get('http://localhost:3001/api/user');
        setUsers(usuarios.data)
        console.log(usuarios)
    }

    const getAllCourses = async () => {
        const cursos = await axios.get('http://localhost:3001/api/course')
        setCourses(cursos.data)
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

    const putUser = async() =>{
        const response = await axios.put(`http://localhost:3001/api/user/${user._id}`,{courses:curso._id});
        console.log(response.data);
    }

    useEffect(() => {
        getAllUsers()
        getAllCourses()
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
                            />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Personas:</Form.Label>

                            <div className='container overflow-y-scroll' style={{ maxHeight: '130px' }}>
                                {
                                    users?.map((user, index) => {
                                        return (
                                            <Form.Check type='radio' key={index + 1}>
                                                <Form.Check.Input type='radio' name='id' id={index + 1} onChange={handleCheckUser} value={user._id} />
                                                <Form.Check.Label>DNI: {user.dni} - {user.last_name} {user.first_name}</Form.Check.Label>
                                            </Form.Check>
                                        )
                                    })
                                }
                            </div>


                        </Form.Group>


                        <Form.Group>
                            <Form.Label>Cursos:</Form.Label>
                            <div className='container overflow-y-scroll' style={{ maxHeight: '130px' }}>
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
                        </Form.Group>
                    </Form>
                    <div className='container mt-5'>
                        <dl className='row'>
                            <dd className='font-weight-bold '>{user?.last_name} {user?.first_name}</dd>
                        </dl>
                        <dl className='row'>
                            <dd>{curso?.name} - {curso?.category?.name}</dd>
                        </dl>
                        <div className='row col-3'>
                            <Button onClick={putUser} variant='primary' >Agregar</Button>{''}
                        </div>
                    </div>

                </Modal.Body>
            </Modal >
        </>
    )
}
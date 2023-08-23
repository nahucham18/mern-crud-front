import { useEffect, useState } from 'react';
import imgOpc from '../../../../assets/editarCurso.png';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import Swal from 'sweetalert2';
import { searchUsers } from '../../../../features/users/usersSlice';
import { sortUpdatedCourse } from '../../../../features/courses/coursesSlice';

export default function EditarPersona() {

    const dispatch = useDispatch()

    const courses = useSelector(state => state.courses.filterCourses)
    const categories = useSelector(state => state.category.categories)

    const [show, setShow] = useState(false);
    // const [users, setUsers] = useState()
    const [course, setCourse] = useState()
    const [data, setData] = useState(
        {
            name: "",
            description: "",
            categoryID: "",
        }
    )

    const onShow = () => {
        setShow(true);
    }

    const onClose = () => {
        setShow(false)
    }

    const searchUser = (event) => {
        dispatch(searchUsers(event.target.value.toLowerCase()))
    }

    // const getAllUsers = async () => {
    //     const response = await axios.get('https://mern-crud-back-g6vxux25g-nahucham18.vercel.app/api/user')
    //     console.log(response.data)
    //     setUsers(response.data)

    // }

    const handleCheck = async (event) => {

        const response = await axios.get(`https://mern-crud-back-g6vxux25g-nahucham18.vercel.app/api/course/${event.target.value}`)
        console.log(response.data)
        setCourse(response.data)
    }

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const handleOnSubmit = async () => {
        console.log(course._id)
        console.log(data)
        try {
            const response = await axios.put(`https://mern-crud-back-g6vxux25g-nahucham18.vercel.app/api/course/${course._id}`, data)
            console.log(response)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Usuario actualizado'
            })
            dispatch(sortUpdatedCourse())
        } catch (error) {
            console.log(error)
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Error',
                text: error.response.data.message,
            })
        }

    }

    useEffect(() => {
        console.log(course)
    }, [show, courses])

    useEffect(() => {
        setData({
            name: course?.name || "",
            description: course?.description || "",
            categoryID: course?.category?._id || "",
        })
    }, [course])

    console.log(data)

    return (
        <>
            <div className='col-6 col-sm-6 col-md-6 col-lg-4 mb-3 px-3'style={{margin:'0 auto'}}>
                <article className="card pointer" onClick={onShow} style={{ height: '200px' }}>
                    <img className='cardImage' src={imgOpc} alt="img-editar-persona" style={{ height: '80%' ,objectFit:'contain' }} />
                    <h3 className='card-title card-title-custom'>Editar curso</h3>
                </article>
            </div>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>Editar Curso</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control className='mb-3' type='text' placeholder='Buscar curso' onChange={searchUser} />
                        {
                            courses
                                ?
                                <Form.Group>
                                    <div className='container overflow-y-scroll' style={{ height: '130px' }}>
                                        {
                                            courses?.map((course, index) => {
                                                return (
                                                    <Form.Check key={index + 1} type='radio'>
                                                        <Form.Check.Input type='radio'
                                                            name='id' id={index + 1} value={course._id}
                                                            onChange={handleCheck}
                                                        />
                                                        <Form.Check.Label>{course.name}</Form.Check.Label>
                                                    </Form.Check>
                                                )
                                            })
                                        }
                                    </div>
                                </Form.Group>
                                :
                                <></>
                        }

                        <Form.Group>
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control
                                name='name'
                                type='text'
                                placeholder='Ingrese Nombre del curso..'
                                value={data.name}
                                onChange={handleOnChange}
                            />
                        </Form.Group>


                        <Form.Group>
                            <Form.Label>Descripcion:</Form.Label>
                            <Form.Control
                                name='description'
                                as="textarea" rows={3}
                                placeholder='Ingrese descripcion del curso..'
                                value={data.description}
                                onChange={handleOnChange}
                            />
                        </Form.Group>
                        <Form.Group>

                            <Form.Label>Categoria:</Form.Label>
                            {
                                categories
                                    ?
                                    <Form.Select name='categoryID' onChange={handleOnChange} value={data.categoryID}>
                                        <option disabled  value="">Seleccione una categoria</option>
                                        {
                                            categories?.map((category, index) => {
                                                return (
                                                    <option value={category._id} key={index}>{category.name}</option>
                                                )
                                            })
                                        }

                                    </Form.Select>
                                    :
                                    <></>
                            }

                        </Form.Group>

                    </Form>
                    <Modal.Footer>
                        <Button onClick={onClose} variant='secondary'>Cerrar</Button>
                        {
                            course === undefined
                                ?
                                <Button variant='secondary'>Guardar Cambios</Button>
                                :
                                <Button onClick={handleOnSubmit} variant='primary'>Guardar Cambios</Button>
                        }


                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </>
    )
}
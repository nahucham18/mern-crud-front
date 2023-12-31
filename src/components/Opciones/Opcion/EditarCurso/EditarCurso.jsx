import { useEffect, useState } from 'react';
//Image
import imgOpc from '../../../../assets/editarCurso.png';
//React-bootstrap
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//Axios
import axios from 'axios';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers } from '../../../../features/users/usersSlice';
import { deleteCourse, sortUpdatedCourse, updateCourse } from '../../../../features/courses/coursesSlice';
//Sweetalert
import Swal from 'sweetalert2';

export default function EditarPersona() {

    const dispatch = useDispatch()

    const courses = useSelector(state => state.courses.filterCourses)
    const categories = useSelector(state => state.category.categories)

    const [show, setShow] = useState(false);
    const [access, setAccess] = useState(false)
    const [category, setCatgory] =useState({
        _id:"",
        name:""
    })
    const [course, setCourse] = useState({
        _id: "",
        name: "",
        description: "",
        categoryID: "",
    })
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

    const resetData = () => {
        setData({
            name: "",
            description: "",
            categoryID: "",
        })
    }

    const onClose = () => {
        resetData()
        setShow(false)
        setAccess(false)
    }

    const searchUser = (event) => {
        dispatch(searchUsers(event.target.value.toLowerCase()))
    }

    const handleDeleteCourse = async () => {
        try {
            const response = await axios.delete(`https://mern-crud-back-silk.vercel.app/api/course/${course._id}`)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: response.data.message
            })
            dispatch(deleteCourse(course._id))
            setAccess(false)
            resetData()
        } catch (error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Error',
                text: error.response.data.message,
            })
        }
    }

    const handleCheck = async (event) => {
        const response = await axios.get(`https://mern-crud-back-silk.vercel.app/api/course/${event.target.value}`)
        setCourse(response.data)
        setCatgory(response.data.category)
        setAccess(true)
    }

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const handleOnSubmit = async () => {
        try {
            const response = await axios.put(`https://mern-crud-back-silk.vercel.app/api/course/${course._id}`, data)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: response.data.message
            })
            dispatch(updateCourse(response.data.data))
            dispatch(sortUpdatedCourse())
        } catch (error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Error',
                text: error.response.data.message,
            })
        }

    }

    useEffect(() => {
        setData({
            name: course?.name || "",
            description: course?.description || "",
            categoryID: category?._id || "",
        })
    }, [course])

    return (
        <>
            <div className='col-10 col-sm-6 col-md-5 col-lg-4 mb-3 px-3'style={{margin:'0 auto'}}>
                <article className='card pointer col-10 col-md-12' onClick={onShow} style={{height:'200px',margin:'0 auto '}}>
                    <img className='cardImage' src={imgOpc} alt="img-editar-persona" style={{ height: '80%', objectFit: 'contain' }} />
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
                                        <option disabled value="">Seleccione una categoria</option>
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
                        {
                            access === true
                            ?
                            <Button onClick={handleDeleteCourse} variant='danger'>Eliminar</Button>
                            :
                            <></>
                        }
                        <Button onClick={onClose} 
                        variant='secondary'>Cerrar</Button>
                        {
                            access === true
                                ?
                                <Button onClick={handleOnSubmit} variant='primary'>Guardar Cambios</Button>
                                :
                                <Button variant='secondary'>Guardar Cambios</Button>
                        }


                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </>
    )
}
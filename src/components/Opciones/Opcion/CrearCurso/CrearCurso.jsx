import { useEffect, useState } from 'react';
import imgOpc from '../../../../assets/crearCurso.png';
import style from './CrearCurso.module.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import axios from 'axios';

import * as formik from 'formik';
import * as yup from 'yup';

import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { addCourse } from '../../../../features/courses/coursesSlice';

export default function CrearCurso() {

    const categorias = useSelector(state => state.category.categories)
    const dispatch = useDispatch()


    const [show, setShow] = useState(false)
    // const [categorias, setCategorias] = useState(categoriasSlice)
    const [curso, setCurso] = useState(
        {
            name: "",
            description: "",
            categoryID: ""
        }
    )

    const { Formik } = formik
    const [submitted, setSubmitted] = useState(false)

    const schema = yup.object().shape({
        name: yup
            .string()
            .required('Se requiere nombre')
            .min(2, 'Min 2 caracteres'),
        description: yup
            .string()
            .required('Se requiere apellido')
            .min(2, 'Min 2 caracteres'),
        categoryID: yup
            .string()
            .required('Se requiere DNI')
    });

    const onShow = () => {
        setShow(true)
    }

    const onClose = () => {
        setShow(false)
    }

    const handleOnChange = (event) => {
        setCurso({ ...curso, [event.target.name]: event.target.value })
    }

    // const getCategories = async()=>{
    //     const categories = await axios.get('https://mern-crud-back-g6vxux25g-nahucham18.vercel.app/api/category')
    //     setCategorias(categories.data);
    // }

    const handleOnSubmit = async (values, { setSubmitting }) => {
        setSubmitted(true)
        console.log(values)
        try {
            const response = await axios.post('https://mern-crud-back-g6vxux25g-nahucham18.vercel.app/api/course', values)
            console.log(response)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: response.data.message
            })
            dispatch(addCourse(response.data.data))

        } catch (error) {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Error',
                text: error.response.data.message
            })
        }
        setSubmitting(false)
    }

    useEffect(() => {
        // getCategories();
    }, [show, categorias])


    return (
        <>
            <div className='col-8 col-sm-6 col-md-6 col-lg-4 mb-3 px-3'style={{margin:'0 auto'}}>

                <article className="card pointer" onClick={onShow} style={{height:'200px'}}>
                    <img className={style.cardImage} src={imgOpc} alt="img-crear-curso" style={{height:'80%'}}/>
                    <h3 className='card-title card-title-custom'>Crear curso</h3>
                </article>
                <Modal show={show} onHide={onClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Crear curso</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            validationSchema={schema}
                            onSubmit={handleOnSubmit}
                            initialValues={{
                                name: "",
                                description: "",
                                categoryID: "",
                            }}
                        >
                            {({ handleSubmit, handleChange, values, touched, errors }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group className='mb-3' controlId='labelName'>
                                        <Form.Label>Titulo</Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='name'
                                            value={values.name}
                                            placeholder='Ingrese el titulo del curso..'
                                            autoFocus
                                            onChange={handleChange}
                                            isValid={touched.name && !errors.name}
                                            isInvalid={!!errors.name}
                                        />
                                        {submitted && <Form.Control.Feedback type='invalid'>
                                            {errors.name}
                                        </Form.Control.Feedback>}
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='labelDescription'>
                                        <Form.Label>Descripcion:</Form.Label>
                                        <Form.Control
                                            name='description'
                                            value={values.description}
                                            as="textarea" rows={3}
                                            onChange={handleChange}
                                            placeholder='Ingrese descripcion del curso..'
                                            isValid={touched.description && !errors.description}
                                            isInvalid={!!errors.description}
                                        />
                                        {submitted && <Form.Control.Feedback type='invalid'>
                                            {errors.description}
                                        </Form.Control.Feedback>}
                                    </Form.Group>

                                    {
                                        categorias
                                            ?
                                            <Form.Group className='mb-3' controlId='exampleForm'>
                                                <Form.Label>Elegir categoria:</Form.Label>
                                                <Form.Select 
                                                    name='categoryID' 
                                                    values={values.categoryID}
                                                    onChange={handleChange}
                                                    isValid={touched.categoryID && !errors.categoryID}
                                                    isInvalid={!!errors.categoryID}
                                                    >
                                                    <option selected disabled value="">Seleccione una categoria</option>
                                                    {
                                                        categorias?.map((category, index) => {
                                                            return (
                                                                <option key={index} value={category._id}>{category.name}</option>
                                                            )
                                                        })
                                                    }
                                                </Form.Select>
                                                {submitted && <Form.Control.Feedback type='invalid'>
                                                    {errors.categoryID}
                                                    </Form.Control.Feedback>}
                                            </Form.Group>
                                            : <></>

                                    }
                                     <ButtonToolbar aria-label='Toolbar with button group'>
                                        <ButtonGroup  className='me-2' aria-label="Frist group buttons">
                                            <Button  onClick={onClose} style={{ marginLeft: '8px' }} variant='secondary'>Cerrar</Button>
                                        </ButtonGroup>
                                        <ButtonGroup className='me-2' aria-label='Second group buttons'>
                                            <Button  type='submit' onClick={() => { setSubmitted(true) }} >Crear</Button>   
                                        </ButtonGroup>

                                    </ButtonToolbar>
                                </Form>
                            )}


                        </Formik>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}
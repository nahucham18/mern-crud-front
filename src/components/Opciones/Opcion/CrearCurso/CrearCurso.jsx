import { useEffect, useState } from 'react';
//axios
import axios from 'axios';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { addCourse } from '../../../../features/courses/coursesSlice';
//Formik
import * as formik from 'formik';
import * as yup from 'yup';
//Imagen
import imgOpc from '../../../../assets/crearCurso.png';
//React-bootstrap
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
//Sweetaler
import Swal from 'sweetalert2';

export default function CrearCurso() {

    const dispatch = useDispatch()
    const categorias = useSelector(state => state.category.categories)

    const [show, setShow] = useState(false)

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
            .required('Se requiere categoria')
    });

    const onShow = () => {
        setShow(true)
    }

    const onClose = () => {
        setShow(false)
    }

    const handleOnSubmit = async (values, {resetForm, setSubmitting }) => {
        setSubmitted(true)
        try {
            const response = await axios.post('https://mern-crud-back-silk.vercel.app/api/course', values)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: response.data.message
            })
            dispatch(addCourse(response.data.data))
            resetForm()

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
    }, [show, categorias])

    return (
            <div className='col-10 col-sm-6 col-md-5 col-lg-4 mb-3 px-3'style={{margin:'0 auto'}}>
                <article className='card pointer col-10 col-md-12' onClick={onShow} style={{height:'200px',margin:'0 auto '}}>
                <img className='cardImage' src={imgOpc} alt="img-crear-categoria" style={{ height: '80%' ,objectFit: 'contain'}} />
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
                                                    value={values.categoryID}
                                                    onChange={handleChange}
                                                    isValid={touched.categoryID && !errors.categoryID}
                                                    isInvalid={!!errors.categoryID}
                                                    >
                                                    <option  value="">Seleccione una categoria</option>
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
    )
}
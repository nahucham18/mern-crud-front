import imgOpc from '../../../../assets/crearCategoria.png';
import style from './CrearCategoria.module.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { useState } from 'react';
import axios from 'axios';

import * as formik from 'formik';
import * as yup from 'yup';

import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../../../features/category/categorySlica';

export default function CrearCategoria() {

    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const [categoria, setCategoria] = useState(
        {
            name: ""
        }
    )

    const { Formik } = formik
    const [submitted, setSubmitted] = useState(false)

    const schema = yup.object().shape({
        name: yup
            .string()
            .required('Se requiere nombre')
    });


    const onShow = () => {
        setShow(true)
    }

    const onCLose = () => {
        setShow(false)
    }

    const handleOnChange = (event) => {
        setCategoria({ ...categoria, [event.target.name]: event.target.value })
    }

    const handleOnSubmit = async (values, {resetForm, setSubmitting }) => {
        setSubmitted(true)
        try {
            const response = await axios.post('https://mern-crud-back-g6vxux25g-nahucham18.vercel.app/api/category', values)
            console.log(response.data)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${response.data.message}`
            })
            dispatch(addCategory(response.data.data))
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

    return (
        <>
            <div className='col-6 col-sm-6 col-md-6 col-lg-4 mb-3 px-3'style={{margin:'0 auto'}}>
                <article className="card pointer " onClick={onShow} style={{ height: '200px'}}>
                    <img className='cardImage' src={imgOpc} alt="img-crear-categoria" style={{ height: '80%' ,objectFit: 'contain'}} />
                    <h3 className='card-title card-title-custom'>Crear categoria</h3>
                </article>
                <Modal show={show} onHide={onCLose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Crear categoria</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            validationSchema={schema}
                            onSubmit={handleOnSubmit}
                            initialValues={{
                                name: "",
                            }}
                        >
                            {({ handleSubmit, handleChange, values, touched, errors }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group className='mb-3' controlId='labelName'>
                                        <Form.Label>Nombre de categoria</Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='name'
                                            value={values.name}
                                            placeholder='Ingrese nombre de la categoria'
                                            autoFocus
                                            onChange={handleChange}
                                            isValid={touched.name && !errors.name}
                                            isInvalid={!!errors.name}
                                        />
                                        {submitted && <Form.Control.Feedback type='invalid'>
                                            {errors.name}
                                        </Form.Control.Feedback>}
                                    </Form.Group>
                                    <ButtonToolbar aria-label='Toolbar with button group'>
                                        <ButtonGroup  className='me-2' aria-label="Frist group buttons">
                                            <Button  onClick={onCLose} style={{ marginLeft: '8px' }} variant='secondary'>Cerrar</Button>
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
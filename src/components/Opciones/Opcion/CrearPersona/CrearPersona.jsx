import { useState } from 'react';
import imgOpc from '../../../../assets/crearUsuario.png';
import style from './CrearPersona.module.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import axios from 'axios';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import * as formik from 'formik';
import * as yup from 'yup';

import Swal from 'sweetalert2';


export default function CrearPersona() {

    // const { handleSubmit, handleChange } = useFormik({
    //     initialValues: {
    //         first_name: "Nahuel",
    //         last_name: "",
    //         dni: 0,
    //         age: 0,
    //         gender: "",
    //     },
    //     onSubmit: (values) => {
    //         console.log(values)
    //     }
    // })

    const { Formik } = formik
    const [submitted, setSubmitted] = useState(false)

    const schema = yup.object().shape({
        first_name: yup
            .string('Tiene que ser un nombre')
            .required('Se requiere nombre')
            .matches(/^[a-zA-Z\s]+$/, 'El nombre no debe contener números')
            .min(2, 'Min 2 caracteres'),
        last_name: yup
            .string()
            .required('Se requiere apellido')
            .matches(/^[a-zA-Z\s]+$/, 'El apellido no debe contener números')
            .min(2, 'Min 2 caracteres'),
        dni: yup
            .number()
            .required('Se requiere DNI')
            .min(1000000, 'DNI invalido')
            .max(99999999, 'DNI invalidos'),
        age: yup
            .number()
            .required('Se requiere edad')
            .min(15, 'Minimo 15 años')
            .max(100, 'Maximo 100 años'),
        // .matches(/^\d+$/, 'El DNI sol debe contener números'),
        gender: yup
            .string()
            .required('Se require genero'),
    });

    const [show, setShow] = useState(false)
    const [person, setPerson] = useState(
        {
            first_name: "",
            last_name: "",
            dni: 0,
            age: 0,
            gender: "",
        }
    )

    const handleOnSubmit = async (values, { setSubmitting }) => {
        console.log('entre')
        setSubmitted(true)
        
        try {
            const response = await axios.post('https://mern-crud-back-g6vxux25g-nahucham18.vercel.app/api/user', values)
            Swal.fire({
                position:'top-end',
                icon:'success',
                title: `${response.data.message}`
            })
            

        } catch (error) {
            console.log(error)
            Swal.fire({
                        position: 'top',
                        icon: 'error',
                        title: 'Error',
                        text: `${error.response.data.message}`
                    })
        } 
            

        setSubmitting(false);
    }

    const handleClick = () => {
        setShow(true)
    }

    const onClose = () => {
        setSubmitted(false)
        setShow(false)
    }

    const handleOnChange = (event) => {
        if ((event.target.name === 'dni') || (event.target.name === 'age')) {
            setPerson({ ...person, [event.target.name]: parseInt(event.target.value) })
        } else {
            setPerson({ ...person, [event.target.name]: event.target.value })
        }
    }




    return (
        <>
            <div className='col-8 col-sm-6 col-md-6 col-lg-4 mb-3 px-3'style={{margin:'0 auto'}}>
                <article className='card pointer' onClick={handleClick} style={{height:'200px'}}>
                    <img className={style.cardImage} src={imgOpc} alt="img-crear-personas" style={{height:'80%'}}/>
                    <h3 className='card-title card-title-custom'>Nuevo usuario</h3>
                </article>
                <Modal show={show} onHide={onClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Crear usuario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            validationSchema={schema}
                            onSubmit={handleOnSubmit}
                            initialValues={{
                                first_name: "",
                                last_name: "",
                                dni: 0,
                                age: 0,
                                gender: "",
                            }}
                        >
                            {({ handleSubmit, handleChange, values, touched, errors }) => (

                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group className='mb-3' controlId='labelName'>
                                        <Form.Label>Nombre:</Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='first_name'
                                            value={values.first_name}
                                            onChange={handleChange}
                                            placeholder='Ingrse el nombre de la persona..'
                                            isValid={touched.first_name && !errors.first_name}
                                            isInvalid={!!errors.first_name}
                                        />
                                        {submitted && <Form.Control.Feedback type='invalid'>
                                            {errors.first_name}
                                        </Form.Control.Feedback>}
                                    </Form.Group>
                                    <Form.Group className='mb-3' controlId='labelLast'>
                                        <Form.Label>Apellido:</Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='last_name'
                                            value={values.last_name}
                                            onChange={handleChange}
                                            placeholder='Ingrese el apellido de la persona..'
                                            autoFocus
                                            isValid={touched.last_name && !errors.last_name}
                                            isInvalid={!!errors.last_name}
                                        />
                                        {submitted && <Form.Control.Feedback type='invalid'>
                                            {errors.last_name}
                                        </Form.Control.Feedback>}
                                    </Form.Group>
                                    <Form.Group className='mb-3' controlId='labelDni'>
                                        <Form.Label>Dni:</Form.Label>
                                        <Form.Control
                                            type='number'
                                            name='dni'
                                            value={values.dni}
                                            onChange={handleChange}
                                            placeholder='Ingrese el dni de la persona..'
                                            autoFocus
                                            isValid={touched.dni && !errors.dni}
                                            isInvalid={!!errors.dni}
                                        />
                                        {submitted && <Form.Control.Feedback type='invalid'>
                                            {errors.dni}
                                        </Form.Control.Feedback>}
                                    </Form.Group>
                                    <Form.Group className='mb-3' controlId='labelAge'>
                                        <Form.Label>Edad:</Form.Label>
                                        <Form.Control
                                            type='number'
                                            name='age'
                                            value={values.age}
                                            onChange={handleChange}
                                            placeholder='Ingrese la edad de la persona..'
                                            autoFocus
                                            isValid={touched.age && !errors.age}
                                            isInvalid={!!errors.age}
                                        />
                                        {submitted && <Form.Control.Feedback type='invalid'>
                                            {errors.age}
                                        </Form.Control.Feedback>}
                                    </Form.Group>
                                    <Form.Group className='mb-3' controlId='labelGender'>
                                        <Form.Label>Genero:</Form.Label>
                                        <Form.Select
                                            name='gender'
                                            values={values.gender}
                                            onChange={handleChange}
                                            isValid={touched.gender && !errors.gender}
                                            isInvalid={!!errors.gender}
                                        >
                                            <option disabled selected value="">Selecciona genero</option>
                                            <option value="hombre">Hombre</option>
                                            <option value="mujer">Mujer</option>
                                        </Form.Select>
                                        {submitted && <Form.Control.Feedback type='invalid'>
                                            {errors.gender}
                                        </Form.Control.Feedback>}
                                    </Form.Group>
                                    <ButtonToolbar aria-label='Toolbar with button group'>
                                        <ButtonGroup  className='me-2' aria-label="Frist group buttons">
                                            <Button  onClick={onClose} style={{ marginLeft: '8px' }} variant='secondary'>Cerrar</Button>
                                        </ButtonGroup>
                                        <ButtonGroup className='me-2' aria-label='Second group buttons'>
                                            <Button  type='submit' onClick={() => { setSubmitted(true) }} >Crear</Button>   
                                        </ButtonGroup>

                                    </ButtonToolbar>
                                    {/* <Button onClick={handleOnSubmit} variant='primary'>Crear</Button> */}
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
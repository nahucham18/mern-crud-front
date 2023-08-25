import { useState } from 'react';
//Axios
import axios from 'axios';
//Imagen
import imgOpc from '../../../../assets/crearUsuario.png';
//React-bootstrap
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
//Formik
import * as formik from 'formik';
import * as yup from 'yup';
//Sweetalert
import Swal from 'sweetalert2';
//Redux
import { useDispatch } from 'react-redux';
import { addNewUser } from '../../../../features/users/usersSlice';


export default function CrearPersona() {

    const dispatch = useDispatch()
    
    const [show, setShow] = useState(false)

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
            .max(99999999, 'DNI invalido'),
        age: yup
            .number('Tiene que ser un numero')
            .required('Se requiere edad')
            .min(15, 'Minimo 15 años')
            .max(100, 'Maximo 100 años'),
        gender: yup
            .string()
            .required('Se requiere genero'),
    });

    //Submit
    const handleOnSubmit = async (values, { resetForm, setSubmitting }) => {
        setSubmitted(true)
        try {
            const response = await axios.post('https://mern-crud-back-silk.vercel.app/api/user', values)
            Swal.fire({
                position:'top-end',
                icon:'success',
                title: `${response.data.message}`
            })
            dispatch(addNewUser(response.data.data))
            resetForm()
        } catch (error) {
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

    return (
        <>
            <div className='col-10 col-sm-6 col-md-5 col-lg-4 mb-3 px-3'style={{margin:'0 auto'}}>
                <article className='card pointer col-10 col-md-12' onClick={handleClick} style={{height:'200px',margin:'0 auto '}}>
                <img className='cardImage' src={imgOpc} alt="img-crear-categoria" style={{ height: '80%' ,objectFit: 'contain'}} />
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
                                dni: "",
                                age: "",
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
                                            placeholder='Ingrese el nombre de la persona..'
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
                                            value={values.gender}
                                            onChange={handleChange}
                                            isValid={touched.gender && !errors.gender}
                                            isInvalid={!!errors.gender}
                                        >
                                            <option disabled  value="">Selecciona genero</option>
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
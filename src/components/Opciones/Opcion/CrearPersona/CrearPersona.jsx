import { useState } from 'react';
import imgOpc from '../../../../assets/opc1.png';
import style from './CrearPersona.module.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function CrearPersona() {

    const [show, setShow] = useState(false)
    const [person,setPerson] = useState(
        {
            first_name:"",
            last_name:"",
            dni:0,
            age:0,
            gender:"",
        }
    )

    const handleClick = () => {
        setShow(true)
    }

    const onClose = () =>{
        setShow(false)
    }

    const handleOnChange = (event)=>{
        setPerson({...person,[event.target.name]:event.target.value})
        
    }
    const handleOnSubmit = async() =>{
        console.log('entre')
        const response = await axios.post('http://localhost:3001/api/user',person)
        console.log(response)
    }

    console.log(person)

    return (
        <>
        <div className='col-md-4 mb-3 px-3'>
            <article className='card' onClick={handleClick}>
                <img className={style.cardImage} src={imgOpc} alt="img-crear-personas" />
                <h3 className='card-title'>Crear Personas</h3>
            </article>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Personas</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className='mb-3' controlId='exampleForm'>
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control
                            name='first_name'
                            value={person?.first_name}
                            type='text'
                            placeholder='Ingre el nombre de la persona..'
                            autoFocus
                            onChange={handleOnChange}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='exampleForm'>
                            <Form.Label>Apellido:</Form.Label>
                            <Form.Control
                            name='last_name'
                            value={person?.last_name}
                            type='text'
                            placeholder='Ingrese el apellido de la persona..'
                            autoFocus
                            onChange={handleOnChange}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='exampleForm'>
                            <Form.Label>Dni:</Form.Label>
                            <Form.Control
                            name='dni'
                            value={person?.dni}
                            type='number'
                            placeholder='Ingrese el dni de la persona..'
                            autoFocus
                            onChange={handleOnChange}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='exampleForm'>
                            <Form.Label>Edad:</Form.Label>
                            <Form.Control
                            name='age'
                            value={person?.age}
                            type='number'
                            placeholder='Ingrese la edad de la persona..'
                            autoFocus1
                            onChange={handleOnChange}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='examampleForm'>
                            <Form.Label>Genero:</Form.Label>
                            <Form.Select name='gender' onChange={handleOnChange}>
                                <option disabled selected value="">Selecciona genero</option>
                                <option value="hombre">Hombre</option>
                                <option value="mujer">Mujer</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onClose} variant='secondary'>Cerrar</Button>
                    <Button onClick={handleOnSubmit} variant='primary'>Crear</Button>
                </Modal.Footer>
            </Modal>
            </div>
        </>
    )
}
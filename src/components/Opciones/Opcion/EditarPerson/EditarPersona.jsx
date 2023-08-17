import { useEffect, useState } from 'react';
import imgOpc from '../../../../assets/opc5.png';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function EditarPersona() {

    const [show, setShow] = useState(false);
    const [users, setUsers] = useState()
    const [user, setUser] = useState()
    const [data, setData] = useState(
        {
            first_name: "",
            last_name: "",
            dni: 0,
            age: 0,
            gender: "",
        }
    )

    const onShow = () => {
        setShow(true);
    }

    const onClose = () => {
        setShow(false)
    }

    const getAllUsers = async () => {
        const response = await axios.get('http://localhost:3001/api/user')
        console.log(response.data)
        setUsers(response.data)

    }

    const handleCheck = async (event) => {  
        
        const response = await axios.get(`http://localhost:3001/api/user/${event.target.value}`)
        console.log(response.data)
        setUser(response.data)
    }

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const handleOnSubmit = async() =>{
        console.log(user._id)
        console.log(data)
        const response = await axios.put(`http://localhost:3001/api/user/${user._id}`, data)
        console.log(response)
    }

    useEffect(() => {
        getAllUsers()
    }, [show])

    useEffect(() => {
        setData({
            first_name: user?.first_name,
            last_name: user?.last_name,
            dni: user?.dni,
            age: user?.age,
            gender: user?.gender
        })
    }, [user])

    console.log(data)

    return (
        <>
            <div className="col-md-4 mb-3 px-3" >
                <article className="card" onClick={onShow}>
                    <img className='cardImage' src={imgOpc} alt="img-editar-persona" />
                    <h3 className='card-title'>Editar persona</h3>
                </article>
            </div>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>Editar Persona</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control type='text' placeholder='Buscar Alumno' />
                        <Form.Group>
                            <div className='container'>
                                {
                                    users?.map((user, index) => {
                                        return (
                                            <Form.Check key={index + 1} type='radio'>
                                                <Form.Check.Input type='radio'
                                                    name='id' id={index + 1} value={user._id}
                                                    onChange={handleCheck}
                                                />
                                                <Form.Check.Label>DNI-{user.dni} - {user.last_name} {user.first_name}</Form.Check.Label>
                                            </Form.Check>
                                        )
                                    })
                                }
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control
                                name='first_name'
                                type='text'
                                placeholder='Ingrese Nombre de la persona..'
                                value={data.first_name}
                                onChange={handleOnChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Apellido:</Form.Label>
                            <Form.Control
                            name='last_name'
                            type='text'
                            placeholder='Ingrese Apellido de la persona..'
                            value={data.last_name}
                            onChange={handleOnChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>DNI:</Form.Label>
                            <Form.Control
                            name='dni'
                            type='number'
                            placeholder='Ingrese n° de documento de la persona..'
                            value={data.dni}
                            onChange={handleOnChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Edad:</Form.Label>
                            <Form.Control
                            name='age'
                            type='text'
                            placeholder='Ingrese edad de la persona..'
                            value={data.age}
                            onChange={handleOnChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Genero:</Form.Label>
                            <Form.Select name='gender' onChange={handleOnChange} value={data.gender}>
                                <option disabled selected value="">Seleccione genero</option>
                                <option value="hombre">Hombre</option>
                                <option value="mujer">Mujer</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                    <Modal.Footer>
                                <Button onClick={onClose} variant='secondary'>Cerrar</Button>
                                <Button onClick={handleOnSubmit} variant='primary'>Guardar Cambios</Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </>
    )
}
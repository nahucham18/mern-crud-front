import { useEffect, useState } from 'react';
import imgOpc from '../../../../assets/editarUsuario.png';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import Swal from 'sweetalert2';
import { searchUsers } from '../../../../features/users/usersSlice';

export default function EditarPersona() {

    const dispatch = useDispatch()

    const users = useSelector(state => state.users.filterUsers)

    const [show, setShow] = useState(false);
    // const [users, setUsers] = useState()
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

    const searchUser = (event) => {
        dispatch(searchUsers(event.target.value.toLowerCase()))
    }

    // const getAllUsers = async () => {
    //     const response = await axios.get('https://mern-crud-back-g6vxux25g-nahucham18.vercel.app/api/user')
    //     console.log(response.data)
    //     setUsers(response.data)

    // }

    const handleCheck = async (event) => {

        const response = await axios.get(`https://mern-crud-back-g6vxux25g-nahucham18.vercel.app/api/user/${event.target.value}`)
        console.log(response.data)
        setUser(response.data)
    }

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const handleOnSubmit = async () => {
        console.log(user._id)
        console.log(data)
        try {
            const response = await axios.put(`https://mern-crud-back-g6vxux25g-nahucham18.vercel.app/api/user/${user._id}`, data)
            console.log(response)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Usuario actualizado'
            })
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
        console.log(user)
    }, [show, users])

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
                <article className="card pointer" onClick={onShow} style={{height:'200px'}}>
                    <img className='cardImage' src={imgOpc} alt="img-editar-persona" style={{height:'80%', objectFit:'contain'}}/>
                    <h3 className='card-title card-title-custom'>Editar persona</h3>
                </article>
            </div>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>Editar Persona</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control className='mb-3' type='text' placeholder='Buscar Alumno' onChange={searchUser} />
                        {
                            users
                                ?
                                <Form.Group>
                                    <div className='container overflow-y-scroll' style={{ height: '130px' }}>
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
                                :
                                <></>
                        }

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
                                <option disabled value="">Seleccione genero</option>
                                <option value="hombre">Hombre</option>
                                <option value="mujer">Mujer</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                    <Modal.Footer>
                        <Button onClick={onClose} variant='secondary'>Cerrar</Button>
                        {
                            user === undefined
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
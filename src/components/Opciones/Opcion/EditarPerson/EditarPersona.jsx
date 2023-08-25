import { useEffect, useState } from 'react';
//Imagen
import imgOpc from '../../../../assets/editarUsuario.png';
//React-bootstrap
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//Axios
import axios from 'axios';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, searchUsers, updateUser } from '../../../../features/users/usersSlice';
//Sweetalert
import Swal from 'sweetalert2';

export default function EditarPersona() {

    const dispatch = useDispatch()

    const users = useSelector(state => state.users.filterUsers)

    const [show, setShow] = useState(false);
    const [access, setAccess] =useState(false)
    const [user, setUser] = useState({
        _id: "",
        first_name: "",
        last_name: "",
        dni: "",
        age: "",
        gender: "",
    });
    const [data, setData] = useState(
        {
            first_name: "",
            last_name: "",
            dni: "",
            age: "",
            gender: "",
        }
    )

    const onShow = () => {
        setShow(true);
    }
    const resetData = ()=>{
        setData({
            first_name: "",
            last_name: "",
            dni: "",
            age: "",
            gender: "",
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

    const handleDeleteUser = async()=>{
        try {
            const response = axios.delete(`https://mern-crud-back-silk.vercel.app/api/user/${user._id}`)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: response.data.message
            })
            dispatch(deleteUser(user._id))
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
        const response = await axios.get(`https://mern-crud-back-silk.vercel.app/api/user/${event.target.value}`)
        setUser(response.data)
        setAccess(true)
    }

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const handleOnSubmit = async () => {
        try {
            const response = await axios.put(`https://mern-crud-back-silk.vercel.app/api/user/${user._id}`, data)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: response.data.message
            })
            dispatch(updateUser(response.data.data))
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
            first_name: user?.first_name,
            last_name: user?.last_name,
            dni: user?.dni,
            age: user?.age,
            gender: user?.gender
        })
        
    }, [user])

    return (
        <>
            <div className='col-10 col-sm-6 col-md-5 col-lg-4 mb-3 px-3'style={{margin:'0 auto'}}>
                <article className='card pointer col-10 col-md-12' onClick={onShow} style={{height:'200px',margin:'0 auto '}}>
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
                                <option value="" >Seleccione genero</option>
                                <option value="hombre">Hombre</option>
                                <option value="mujer">Mujer</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                    <Modal.Footer>
                        {
                            access === true
                            ?
                            <Button onClick={handleDeleteUser} variant='danger'>Eliminar</Button>
                            :
                            <></>
                        }
                        <Button onClick={onClose} variant='secondary'>Cerrar</Button>
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
import imgOpc from '../../../../assets/editarCategoria.png';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, getAllCategoires } from '../../../../features/category/categorySlica';

export default function EditarCategoria() {

    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const categories = useSelector(state => state.category.categories)
    const [categoria, setCategoria] = useState()

    const [data, setData] = useState({
        name: ""
    })


    const onShow = () => {
        setShow(true)
    }

    const onCLose = () => {
        setShow(false)
    }

    const handleOnChange = (event) => {
        setCategoria({ ...categoria, [event.target.name]: event.target.value })
    }

    const handleCheck = async (event) => {

        const response = await axios.get(`http://localhost:3001/api/category/${event.target.value}`)
        console.log(response.data)
        setCategoria(response.data)
    }

    const handleOnSubmit = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/api/category/${categoria._id}`, categoria)
            console.log(response.data)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${response.data.message}`
            })
            const allCategories = await axios.get('http://localhost:3001/api/category')
            dispatch(getAllCategoires(allCategories.data))
            

        } catch (error) {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Error',
                text: error.response.data.message
            })
        }
    }

    const deleteCategory = async () => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/category/${categoria._id}`)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${response.data.message}`
            })
            setData({
                name:""
            })
            setCategoria(undefined)
            const allCategories = await axios.get('http://localhost:3001/api/category')
            dispatch(getAllCategoires(allCategories.data))
            
        } catch (error) {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Error',
                text: error.response.data.message
            })
        }

    }

    useEffect(() => {
        console.log(categoria)
    }, [show, categoria])

    useEffect(() => {
        setData({
            name: categoria?.name || "",
        })
    }, [categoria])

    useEffect(() => {
        console.log(categoria)
    }, [])


    return (
        <>
            <div className='col-md-4 mb-3 px-3'>
                <article className="card pointer" onClick={onShow} style={{ height: '200px' }}>
                    <img className='cardImage' src={imgOpc} alt="img-crear-categoria" style={{ height: '80%' ,objectFit: 'contain'}} />
                    <h3 className='card-title card-title-custom'>Editar categoria</h3>
                </article>
                <Modal show={show} onHide={onCLose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar categoria</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className='mb-3' controlId='labelRadio'>
                                {
                                    categories ?
                                        <div className='container overflow-y-scroll' style={{ height: '130px' }}>
                                            {
                                                categories?.map((course, index) => {
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
                                        :
                                        <></>
                                }

                            </Form.Group>
                            <Form.Group className='mb-3' controlId='exampleForm'>
                                <Form.Label>Nombre de categoria</Form.Label>
                                <Form.Control
                                    name='name'
                                    value={data.name}
                                    type='text'
                                    placeholder='Ingrese nombre de la categoria'
                                    autoFocus
                                    onChange={handleOnChange}
                                />
                            </Form.Group>
                            {
                                categoria !== undefined
                                    ?
                                    <div style={{ display: 'flex', justifyContent: "end" }}>
                                        <Button onClick={deleteCategory} style={{ textAlign: "right" }} variant='danger'>Elimiar</Button>
                                    </div>
                                    :
                                    <></>
                            }

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={onCLose} variant='secondary'>Cerrar</Button>
                        {
                            categoria === undefined
                                ?
                                <Button variant='secondary'>Actualizar</Button>
                                :
                                <Button onClick={handleOnSubmit} variant='primary'>Actualizar</Button>
                        }

                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}
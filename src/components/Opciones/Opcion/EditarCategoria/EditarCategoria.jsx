import imgOpc from '../../../../assets/editarCategoria.png';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategory, getAllCategoires, updateCategory } from '../../../../features/category/categorySlica';

export default function EditarCategoria() {

    const dispatch = useDispatch()

    const [access , setAccess] = useState(false)
    const [show, setShow] = useState(false);
    const categories = useSelector(state => state.category.categories)
    const [categoria, setCategoria] = useState({
        _id: "",
        name:""
    })

    const [data, setData] = useState({
        name: ""
    })


    const onShow = () => {
        setShow(true)
    }

    const resetData = () =>{
        setData({
            name:""
        })
    }

    const onCLose = () => {
        setShow(false)
        resetData()
        setAccess(false)
    }

    const handleOnChange = (event) => {
        setCategoria({ ...categoria, [event.target.name]: event.target.value })
    }

    const handleCheck = async (event) => {

        const response = await axios.get(`https://mern-crud-back-silk.vercel.app/api/category/${event.target.value}`)
        console.log(response.data)
        setCategoria(response.data)
        setAccess(true)
    }

    const handleOnSubmit = async () => {
        try {
            const response = await axios.put(`https://mern-crud-back-silk.vercel.app/api/category/${categoria._id}`, categoria)
            console.log(response.data)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${response.data.message}`
            })
            dispatch(updateCategory(response.data.data))
            // const allCategories = await axios.get('https://mern-crud-back-silk.vercel.app/api/category')
            // dispatch(getAllCategoires(allCategories.data))
            // resetData()

        } catch (error) {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Error',
                text: error.response.data.message
            })
        }
    }

    const handleDeleteCategory = async () => {
        try {
            const response = await axios.delete(`https://mern-crud-back-silk.vercel.app/api/category/${categoria._id}`)
            console.log(response)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                // title: `${response.data.message}`
                title: 'Catgoria eliminada'
            })
            dispatch(deleteCategory(categoria._id))
            resetData()
            setAccess(false)
            // setCategoria(undefined)
            // const allCategories = await axios.get('https://mern-crud-back-silk.vercel.app/api/category')
            // dispatch(getAllCategoires(allCategories.data))
            
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

    console.log(data)

    return (
        <>
            <div className='col-10 col-sm-6 col-md-5 col-lg-4 mb-3 px-3'style={{margin:'0 auto'}}>
                <article className='card pointer col-10 col-md-12' onClick={onShow} style={{height:'200px',margin:'0 auto '}}>
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
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {
                            access === true
                            ?
                            <Button onClick={handleDeleteCategory} style={{ textAlign: "right" }} variant='danger'>Elimiar</Button>
                            :
                            <></>
                        }
                        <Button onClick={onCLose} variant='secondary'>Cerrar</Button>
                        {
                                
                            access === true
                                ?
                                <Button onClick={handleOnSubmit} variant='primary'>Actualizar</Button>
                                :
                                <Button variant='secondary'>Actualizar</Button>
                        }

                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}
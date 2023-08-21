import { useEffect, useState } from 'react';
import imgOpc from '../../../../assets/opc2.png';
import style from './CrearCurso.module.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

export default function CrearCurso() {

    const categorias = useSelector(state => state.category.categories)

    const [show, setShow] = useState(false)
    // const [categorias, setCategorias] = useState(categoriasSlice)
    const [curso, setCurso] = useState(
        {
            name:"",
            description:"",
            categoryID:""
        }
    )

    const onShow = () => {
        setShow(true)
    }

    const onClose = () => {
        setShow(false)
    }

    const handleOnChange = (event)=>{
        setCurso({...curso,[event.target.name]:event.target.value})
    }

    // const getCategories = async()=>{
    //     const categories = await axios.get('http://localhost:3001/api/category')
    //     setCategorias(categories.data);
    // }

    const handleOnSubmit = async() =>{
        try {
            const response = await axios.post('http://localhost:3001/api/course',curso)
            console.log(response)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: response.data.message
            })
        } catch (error) {
            Swal.fire({
                position:'top',
                icon: 'error',
                title: 'Error',
                text: error.response.data.message
            })
        }
    }

    useEffect(()=>{
        // getCategories();
    },[show,categorias])


    return (
        <>
        <div className='col-md-4 mb-3 px-3'>

            <article className="card" onClick={onShow}>
                <img className={style.cardImage} src={imgOpc} alt="img-crear-curso" />
                <h3 className='card-title'>Crear curso</h3>
            </article>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear curso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className='mb-3' controlId='exampleForm'>
                            <Form.Label>Titulo</Form.Label>
                            <Form.Control
                                name='name'
                                value={curso.name}
                                type='text'
                                placeholder='Ingrese el titulo del curso..'
                                autoFocus
                                onChange={handleOnChange}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='exampleForm'>
                            <Form.Label>Descripcion:</Form.Label>
                            <Form.Control 
                            name='description'
                            value={curso.description}
                            as="textarea" rows={3} 
                            onChange={handleOnChange}
                            />
                        </Form.Group>
                    </Form>
                        {
                            categorias
                            ?
                    <Form.Group className='mb-3' controlId='exampleForm'>
                        <Form.Label>Elegir categoria:</Form.Label>
                        <Form.Select name='categoryID' onChange={handleOnChange}>
                            <option selected disabled value="">Seleccione una categoria</option>
                            {
                                categorias?.map((category,index)=>{
                                    return (
                                        <option key={index} value={category._id}>{category.name}</option>
                                    )
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                    : <></>

                        }
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
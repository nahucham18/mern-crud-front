import { useEffect, useState } from 'react';
import imgOpc from '../../../../assets/opc2.png';
import style from './CrearCurso.module.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function CrearCurso() {

    const [show, setShow] = useState(false)
    const [categorias, setCategorias] = useState()
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

    const getCategories = async()=>{
        const categories = await axios.get('http://localhost:3001/api/category')
        setCategorias(categories.data);
    }

    const handleOnSubmit = async() =>{
        const response = await axios.post('http://localhost:3001/api/course',curso)
        
        console.log(response)
    }

    useEffect(()=>{
        getCategories();
    },[show])

    console.log(curso)

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
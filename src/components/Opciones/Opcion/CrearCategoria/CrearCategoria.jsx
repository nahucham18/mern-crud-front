import imgOpc from '../../../../assets/opc3.png';
import style from './CrearCategoria.module.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';

import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../../../features/category/categorySlica';

export default function CrearCategoria (){

    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const [categoria, setCategoria] = useState(
        {
            name:""
        }
    )


    const onShow = ()=>{
        setShow(true)
    }

    const onCLose = () =>{
        setShow(false)
    }

    const handleOnChange = (event) =>{
        setCategoria({...categoria,[event.target.name]: event.target.value})
    }

    const handleOnSubmit = async() =>{
        try {
            const response = await axios.post('http://localhost:3001/api/category',categoria)
            console.log(response.data)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${response.data.message}`
            })
            dispatch(addCategory(response.data.data))

        } catch (error) {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Error',
                text: error.response.data.message
            })  
        }
    }

    

    return (
        <>
        <div className='col-md-4 mb-3 px-3'>
        <article className="card" onClick={onShow} >
            <img className={style.cardImage} src={imgOpc} alt="img-crear-categoria" />
            <h3 className='card-title'>Crear categoria</h3>
        </article>
        <Modal show={show} onHide={onCLose}>
            <Modal.Header closeButton>
                <Modal.Title>Crear categoria</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='mb-3' controlId='exampleForm'>
                        <Form.Label>Nombre de categoria</Form.Label>
                        <Form.Control
                        name='name'
                        value={categoria.name}
                        type='text'
                        placeholder='Ingrese nombre de la categoria'
                        autoFocus
                        onChange={handleOnChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onCLose} variant='secondary'>Cerrar</Button>
                <Button onClick={handleOnSubmit} variant='primary'>Crear</Button>
            </Modal.Footer>
        </Modal>
        </div>
        </>
    )
}
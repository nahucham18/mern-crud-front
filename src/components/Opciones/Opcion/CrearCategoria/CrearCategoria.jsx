import imgOpc from '../../../../assets/opc3.png';
import style from './CrearCategoria.module.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';

export default function CrearCategoria (){

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
        const response = await axios.post('http://localhost:3001/api/category',categoria)
        console.log(response.data)
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
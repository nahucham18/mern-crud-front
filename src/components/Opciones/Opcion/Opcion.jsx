import { useState } from 'react';
import style from './Opcion.module.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Opcion({ opc }) {

    const [show, setShow] = useState(
        {
            opc1: false,
            opc2: false,
            opc3: false,
            opc4: false,
            opc5: false,
            opc6: false,
        },
    )

    const handleShow = (id) => {
        id === 1 && setShow({ ...show, opc1: true })
        console.log('click me')
    }

    const hadleOnClose = (num) => {
        num === 1 && setShow({ ...show, opc1: false })
    }

    const handleSubmit = () =>{

    }

    console.log(show)

    return (
        <>
            <div className='col-md-4 mb-3 px-3'
                onClick={() => handleShow(opc.id)}
            >
                <div className='card' key={opc}>
                    <img className={style.cardImage} src={opc.img} alt="img-opc" />
                    <h4 className='card-title'>{opc.title}</h4>
                </div>
            </div>
            
            <Modal show={show.opc1} onHide={() => hadleOnClose(1)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Crear nueva persona</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className='mb-3' controlId='exampleForm'>
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Nombre de la persona'
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='exampleForm'>
                            <Form.Label>Apellido:</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Apellido de la persona'
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='exampleForm'>
                            <Form.Label>DNI:</Form.Label>
                            <Form.Control type="number" placeholder="Ingresa un número" />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='exampleForm'>
                            <Form.Label>Genero:</Form.Label>
                            <Form.Select>
                                <option disabled value=''>Seleccione el genero</option>
                                <option value='hombre'>Hombre</option>
                                <option value='mujer'>Mujer</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='exampleForm'>
                            <Form.Label>Edad:</Form.Label>
                            <Form.Control
                            type='number'
                            placeholder='Ingrese la edad de la persona'
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary'>Cerrar</Button>
                    <Button variant='primary' onClick={handleSubmit}>Crear</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
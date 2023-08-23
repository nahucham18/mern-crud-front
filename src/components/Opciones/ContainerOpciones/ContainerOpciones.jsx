import style from './Opciones.module.css';
import opc2 from '../../../assets/opc2.png';
import opc3 from '../../../assets/opc3.png';
import opc4 from '../../../assets/opc4.jpg';
import opc5 from '../../../assets/opc5.png';
import opc6 from '../../../assets/opc6.png';
import Opcion from '../Opcion/Opcion';
import CrearPersona from '../Opcion/CrearPersona/CrearPersona';
import CrearCurso from '../Opcion/CrearCurso/CrearCurso';
import CrearCategoria from '../Opcion/CrearCategoria/CrearCategoria';
import PersonaCurso from '../Opcion/PersonaCurso/PersonaCurso';
import EditarPersona from '../Opcion/EditarPerson/EditarPersona';
import Estadisticas from '../Opcion/Estadisticas/Estadisticas';
import { useState } from 'react';
import ContainerStadisticas from '../Opcion/Estadisticas/ContainerStadisticas';
import ViewCourses from '../Opcion/ViewCourses/ViewCourses';
import ContainerViewCourse from '../Opcion/ViewCourses/ContainerViewCourses';
import EditarCurso from '../Opcion/EditarCurso/EditarCurso';
import EditarCategoria from '../Opcion/EditarCategoria/EditarCategoria';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function ContainerOpciones() {

    const [showStats, setShowStats] = useState(false)
    const [showViewCourses, setshowViewCourses] = useState(false)



    const handleShow = (name) => {
        if (name === 'viewCourses') {
            setshowViewCourses(true)
        } else if (name === 'stats') {
            setShowStats(true)
        }
    }

    const onClose = (name) => {
        if (name === 'stats') {
            setShowStats(false)
        } else if (name === 'viewCourses') {
            setshowViewCourses(false)
        }
    }


    return (
        <section style={{width:'80%', margin:'0 auto'}}>
            {
                showStats ?
                    <ContainerStadisticas onClose={onClose} />
                    :
                    showViewCourses ?
                        <ViewCourses onClose={onClose} />
                        :
                        <div className="container d-flex flex-wrap jutify-content-center ">
                            <CrearPersona />
                            <CrearCurso />
                            <CrearCategoria />
                            <PersonaCurso />
                            <Estadisticas handleShow={handleShow} />
                            <ContainerViewCourse handleShow={handleShow} />
                            <EditarPersona />
                            <EditarCurso />
                            <EditarCategoria />
                        </div>
            }

            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body style={{textAlign:'left'}}>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>

        </section>
    )
}
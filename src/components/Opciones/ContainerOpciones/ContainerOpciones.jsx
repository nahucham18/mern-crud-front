import { useState } from 'react';
//Componentes opciones
import CrearPersona from '../Opcion/CrearPersona/CrearPersona';
import CrearCurso from '../Opcion/CrearCurso/CrearCurso';
import CrearCategoria from '../Opcion/CrearCategoria/CrearCategoria';
import PersonaCurso from '../Opcion/PersonaCurso/PersonaCurso';
import EditarPersona from '../Opcion/EditarPerson/EditarPersona';
import Estadisticas from '../Opcion/Estadisticas/Estadisticas';
import ContainerStadisticas from '../Opcion/Estadisticas/ContainerStadisticas';
import ViewCourses from '../Opcion/ViewCourses/ViewCourses';
import ContainerViewCourse from '../Opcion/ViewCourses/ContainerViewCourses';
import EditarCurso from '../Opcion/EditarCurso/EditarCurso';
import EditarCategoria from '../Opcion/EditarCategoria/EditarCategoria';
//React-bootstrap
import Row from 'react-bootstrap/Row';

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
            <>
            {
                showStats ?
                <Row>
                    <ContainerStadisticas onClose={onClose} />
                </Row>
                    :
                    showViewCourses ?
                    <Row>
                        <ViewCourses onClose={onClose} />
                    </Row>
                        :
                        <Row >
                            <CrearPersona />
                            <CrearCurso />
                            <CrearCategoria />
                            <PersonaCurso />
                            <Estadisticas handleShow={handleShow} />
                            <ContainerViewCourse handleShow={handleShow} />
                            <EditarPersona />
                            <EditarCurso />
                            <EditarCategoria />
                            
                        </Row>
            }
        </>   
    )
}
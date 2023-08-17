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

export default function ContainerOpciones() {

    const [showStats, setShowStats] = useState(false)

    const opciones = [
        {
            id: 6,
            title: "Estadisticas",
            img: opc6,
        }
    ]

    const handleShow = () => {
        setShowStats(true)
    }

    const onClose = () =>{
        setShowStats(false)
    }


    return (
        <section >
            {
                showStats
                    ?
                    <ContainerStadisticas onClose={onClose}/>
                    :
                    <div className="container d-flex flex-wrap jutify-content-center ">
                        <CrearPersona />
                        <CrearCurso />
                        <CrearCategoria />
                        <PersonaCurso />
                        <EditarPersona />
                        <Estadisticas handleShow={handleShow} />
                        {
                            opciones?.map((opc) => {
                                return (
                                    <Opcion key={opc.id} opc={opc} />
                                )
                            })
                        }
                    </div>

            }
        </section>
    )
}
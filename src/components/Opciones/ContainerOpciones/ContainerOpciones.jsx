import style from './Opciones.module.css';
import opc1 from '../../../assets/opc1.png';
import opc2 from '../../../assets/opc2.png';
import opc3 from '../../../assets/opc3.png';
import opc4 from '../../../assets/opc4.jpg';
import opc5 from '../../../assets/opc5.png';
import opc6 from '../../../assets/opc6.png';
import Opcion from '../Opcion/Opcion';
import CrearPersona from '../Opcion/CrearPersona/CrearPersona';

export default function ContainerOpciones() {

    const opciones = [
        {
            id: 1,
            title: "Crear persona",
            img:opc1,
        },
        {
            id: 2,
            title: "Crear curso",
            img:opc2,
        },
        {
            id: 3,
            title: "Crear categoria",
            img:opc3,
        },
        {
            id: 4,
            title: "Asignar persona a curso",
            img:opc4,
        },
        {
            id: 5,
            title: "Editar persona",
            img:opc5,
        },
        {
            id: 6,
            title: "Estadisticas",
            img:opc6,
        }
    ]



    return (
        <section >
            <div className="container d-flex flex-wrap jutify-content-center ">
                <CrearPersona/>
            {
                opciones?.map((opc)=>{
                    return (
                        <Opcion key={opc.id} opc={opc}/>
                    )
                })
            }
            </div>
        </section>
    )
}
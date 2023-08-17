import imgOpc from '../../../../assets/opc6.png';

export default function Estadisticas ({handleShow}){



    return (
        <>
        <div className="col-md-4 nb-3 px-">
            <article className="card" onClick={()=>handleShow()}>
                <img className='cardImage' src={imgOpc} alt="img-estadisticas" />
                <h3 className='card-title'>Estadisticas</h3>
            </article>
        </div>
        </>
    )
}
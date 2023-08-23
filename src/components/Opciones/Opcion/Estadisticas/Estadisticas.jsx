import imgOpc from '../../../../assets/opc6.png';

export default function Estadisticas ({handleShow}){



    return (
        
        <div className='col-8 col-sm-6 col-md-6 col-lg-4 mb-3 px-3'style={{margin:'0 auto'}}>
            <article className="card pointer" onClick={()=>handleShow('stats')} style={{height:'200px'}}>
                <img className='cardImage' src={imgOpc} alt="img-estadisticas" style={{height:'80%' ,objectFit:"contain"}}/>
                <h3 className='card-title card-title-custom'>Estadisticas</h3>
            </article>
        </div>
        
    )
}
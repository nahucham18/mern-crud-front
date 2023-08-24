import imgOpc from '../../../../assets/opc6.png';

export default function Estadisticas ({handleShow}){



    return (
        <div className='col-10 col-sm-6 col-md-5 col-lg-4 mb-3 px-3'style={{margin:'0 auto'}}>
                <article className='card pointer col-10 col-md-12' onClick={()=>handleShow('stats')} style={{height:'200px',margin:'0 auto '}}>
                <img className='cardImage' src={imgOpc} alt="img-estadisticas" style={{height:'80%' ,objectFit:"contain"}}/>
                <h3 className='card-title card-title-custom'>Estadisticas</h3>
            </article>
        </div>
        
    )
}
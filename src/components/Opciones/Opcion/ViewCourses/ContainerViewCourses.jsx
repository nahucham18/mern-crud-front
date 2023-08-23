import imgOpc from '../../../../assets/lista.png';

export default function Estadisticas ({handleShow}){



    return (
        
        <div className="col-md-4 nb-3 px-3">
            <article className="card pointer" onClick={()=>handleShow('viewCourses')} style={{height:'200px'}}>
                <img className='cardImage' src={imgOpc} alt="img-estadisticas"  style={{height:'80%',objectFit:'contain'}}/>
                <h3 className='card-title card-title-custom'>Ver cursos</h3>
            </article>
        </div>
        
    )
}
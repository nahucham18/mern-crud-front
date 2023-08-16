import Carousel from '../../components/Carousel/Carousel';
import Opciones from '../../components/Opciones/ContainerOpciones/ContainerOpciones';

export default function Home() {
    return (
        <main className='d-flex justify-content-center'>
        <div className='w-60' style={{maxWidth:'60%', width:'100%'}}>
            <Carousel />
            <Opciones/>
        </div>
        </main>
        
    )
} 
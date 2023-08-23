import op1 from '../../assets/carouselExample.jpg';

export default function ExampleCarouselImage({text}){
    return (
        <div>
          <img
            src={op1} // Ruta a tu imagen
            alt={text}
            style={{width: '100%',
                height: 'auto',
                objectFit: 'cover',}}
          />
          <p>{text}</p>
        </div>
      )
}
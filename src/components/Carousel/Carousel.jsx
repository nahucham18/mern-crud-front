import React, { useEffect, useState } from 'react';
//Redux
import { useSelector } from 'react-redux';
//Reac-bootstrap
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function Carouse() {
    const courses = useSelector(state => state.courses.filterUpdatedCourses);
    const win = window.innerWidth
    let winValue = 0
    if(win < 576){
         winValue = 1
    }else if (win < 768) {
         winValue = 2
    } else if (win < 992) {
         winValue = 2
    } else if(win < 1200) {
         winValue = 3
    } else{
         winValue = 4
    }

    const [itemsPerSlide, setItemsPerSlide] = useState(winValue);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setActiveIndex(selectedIndex);
    };

    const renderSlide = (startIdx) => {
        const slides = [];
        for (let i = startIdx; i < startIdx + itemsPerSlide; i++) {
            if (i < 12) {
                const course = courses[i];
                slides.push(

                    <div className=' col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3' key={i} style={{margin: '0 auto', maxWidth:"300px"}}>
                        {
                            course ?
                                <Card className='card'
                                    style={{ height:'100%', margin: '0 10px', paddingBottom:'1rem' }}>
                                    <img  className='cardImage' style={{height:'60%', maxHeight: '400px'}}  src={course?.img_course} alt="img-course" />
                                    <Card.Body style={{ textAlign: 'left' ,height:'40%'}}>
                                        <Card.Title className='fs-4'>{course.name}</Card.Title>
                                        {
                                            course?.category?.name
                                                ?
                                                <Card.Text style={{fontSize:"0.8rem" }}>{course?.category?.name} </Card.Text>
                                                :
                                                <Card.Text style={{fontSize:"0.8rem" }}>"</Card.Text>

                                        }
                                        <Card.Text className='text-secondary' style={{textAlign:'right'}}>Actualizado: {new Date(course?.updatedAt).toLocaleDateString()}</Card.Text>
                                    </Card.Body>
                                </Card>
                                :
                                <></>
                        }

                    </div>
                );
            }
        }
        return slides;
    };

    const handleRize = () => {
        const media = window.innerWidth
        if(media < 576){
            setItemsPerSlide(1)
        }else if (media < 768) {
            setItemsPerSlide(2)
        } else if (media < 992) {
            setItemsPerSlide(2)
        } else if(media < 1200) {
            setItemsPerSlide(3)
        } else{
            setItemsPerSlide(4)
        }

    }

    useEffect(() => {
        window.addEventListener('resize', handleRize)
    }, [])

    return (
        <Col className='col-12'>
            <Carousel
                className=' mb-5 '
                activeIndex={activeIndex}
                onSelect={handleSelect}
                interval={null}
                indicators={false}
                controls={courses.length > itemsPerSlide}
            >
                {Array.from({ length: Math.ceil(courses?.length / itemsPerSlide) }).map((_, index) => (
                    <Carousel.Item key={index} style={{ background: 'rgba(1,1,1,0.7)', padding: '1rem ' }}>
                        <div className="container d-flex">
                            {renderSlide(index * itemsPerSlide)}
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Col>
    );
}

export default Carouse;
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Carouse() {
    const courses = useSelector(state => state.courses.filterUpdatedCourses);
    const [itemsPerSlide, setItemsPerSlide] = useState(4);

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

                    <div className=' col-10 col-md-6 col-lg-4 col-xl-3' key={i} style={{margin: '0 auto'}}>
                        {
                            course ?
                                <Card className='card'
                                    style={{ height:'100%', margin: '0 10px', paddingBottom:'1rem' ,minWidth:'250px'}}>
                                    <img  className='cardImage' style={{height:'60%', maxHeight: '400px'}}  src={course?.img_course} alt="img-course" />
                                    <Card.Body style={{ textAlign: 'left' ,height:'40%'}}>
                                        <Card.Title style={{fontSize:"1rem"}}>{course.name}</Card.Title>
                                        {
                                            course?.category?.name
                                                ?
                                                <Card.Text style={{fontSize:"0.8rem" }}>{course?.category?.name} </Card.Text>
                                                :
                                                <Card.Text>"</Card.Text>

                                        }
                                        <Button size='sm' variant="primary">Go somewhere</Button>
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
        if (media < 768) {
            setItemsPerSlide(1)
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
        <Carousel
            className=' mb-5 '
            activeIndex={activeIndex}
            onSelect={handleSelect}
            interval={null}
            indicators={false}
            controls={courses.length > itemsPerSlide}
        >
            {Array.from({ length: Math.ceil(courses?.length / itemsPerSlide) }).map((_, index) => (
                <Carousel.Item key={index} style={{ background: 'rgba(1,1,1,0.3', padding: '1rem 6rem 1rem 6rem' }}>
                    <div className="container d-flex">
                        {renderSlide(index * itemsPerSlide)}
                    </div>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default Carouse;
import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Carouse() {
    const courses = useSelector(state => state.courses.filterUpdatedCourses);
    const itemsPerSlide = 4;

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

                    <div style={{ width: '33.3%', padding: '0 15px' }} key={i}>
                        {
                            course ?
                                <Card style={{ height: '100%' }}>
                                    <img className='cardImage h-50' src={course?.img_course} alt="img-course" />
                                    <Card.Body style={{ textAlign: 'left' }}>
                                        <Card.Title >{course.name}</Card.Title>
                                        {
                                            course?.category?.name
                                                ?
                                                <Card.Text>{course?.category?.name}</Card.Text>
                                                :
                                                <Card.Text>"</Card.Text>

                                        }
                                        <Button variant="primary">Go somewhere</Button>
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
                <Carousel.Item key={index} style={{ height: '300px', background: 'rgba(1,1,1,0.3', padding: '1rem 6rem 1rem 6rem' }}>
                    <div className="d-flex h-100 ">{renderSlide(index * itemsPerSlide)}</div>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default Carouse;
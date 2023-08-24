import { useEffect } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import Opciones from '../../components/Opciones/ContainerOpciones/ContainerOpciones';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../../features/users/usersSlice';
import { getAllCategoires } from '../../features/category/categorySlica';
import { getAllCourses, sortUpdatedCourse } from '../../features/courses/coursesSlice';
import { Col, Row } from 'react-bootstrap';

export default function Home() {

    const dispatch = useDispatch()

    const getData = async () => {
        const users = await axios.get('https://mern-crud-back-silk.vercel.app/api/user')
        dispatch(getAllUsers(users.data))
        const categories = await axios.get('https://mern-crud-back-silk.vercel.app/api/category')
        dispatch(getAllCategoires(categories.data))
        const courses = await axios.get('https://mern-crud-back-silk.vercel.app/api/course')
        dispatch(getAllCourses(courses.data))
        dispatch(sortUpdatedCourse())
    }

    useEffect(() => {
        getData();

    }, [])

    return (
        <main className='container-fluid p-0' >
            <div className='cointer'>
                <Col>
                <h2 className='mb-3 fs-1' style={{ textAlign: 'left', paddingLeft: '1rem', fontWeight: "bold" }}>Cursos actualizados </h2>
                </Col>
            </div>
            <Row>
                <Carousel />
            </Row>
            <div>

                    <h2 className='mb-4' style={{ fontWeight: 'bold', fontSize: "2rem" }}>Opciones</h2>
            </div>
                <div className='col-8 col-sm-10 col-md-8 col-lg-7 col-xl-6' style={{margin:'0 auto'}}>
                    <Opciones />
                </div>
        </main>

    )
} 
import { useEffect } from 'react';
//Components
import Carousel from '../../components/Carousel/Carousel';
import Opciones from '../../components/Opciones/ContainerOpciones/ContainerOpciones';
//Axios
import axios from 'axios';
//Redux
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../../features/users/usersSlice';
import { getAllCategoires } from '../../features/category/categorySlica';
import { getAllCourses, sortUpdatedCourse } from '../../features/courses/coursesSlice';
//Reac-bootstrap
import Row from 'react-bootstrap/Row';
import  Col from 'react-bootstrap/Col';

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
        <main className=' py-5' >
            <div className=''>
                <Col>
                <h2 className='mb-3 fs-1' style={{ textAlign: 'left', paddingLeft: '1rem', fontWeight: "bold" }}>Cursos actualizados </h2>
                </Col>
            </div>
            <div>
                <Carousel />
            </div>
            <div>

                    <h2 className='mb-4' style={{ fontWeight: 'bold', fontSize: "2rem" }}>Opciones</h2>
            </div>
                <div className='col-8 col-sm-10 col-md-10 col-lg-10 col-xl-6' style={{margin:'0 auto'}}>
                    <Opciones />
                </div>
        </main>

    )
} 
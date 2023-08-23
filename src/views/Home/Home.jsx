import { useEffect } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import Opciones from '../../components/Opciones/ContainerOpciones/ContainerOpciones';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../../features/users/usersSlice';
import { getAllCategoires } from '../../features/category/categorySlica';
import { getAllCourses, sortUpdatedCourse } from '../../features/courses/coursesSlice';

export default function Home() {

    const dispatch = useDispatch()

    const getData = async () => {
        const users = await axios.get('https://mern-crud-back-g6vxux25g-nahucham18.vercel.app/api/user')
        dispatch(getAllUsers(users.data))
        const categories = await axios.get('https://mern-crud-back-g6vxux25g-nahucham18.vercel.app/api/category')
        dispatch(getAllCategoires(categories.data))
        const courses = await axios.get('https://mern-crud-back-g6vxux25g-nahucham18.vercel.app/api/course')
        dispatch(getAllCourses(courses.data))
        dispatch(sortUpdatedCourse())
    }

    useEffect(() => {
        getData();

    }, [])

    return (
        <main className='d-flex justify-content-center'>
            <div className='w-60 mt-4' style={{ width: '100%' }}>
                <h2 className='mb-3' style={{ textAlign: 'left', paddingLeft: '4rem', fontWeight:"bold" }}>Cursos actualizados </h2>
                <Carousel />
                <div style={{ width: '80%', margin: "0 auto" }} >
                    <h2 className='mb-4' style={{ fontWeight: 'bold', fontSize: "2rem" }}>Opciones</h2>
                    <Opciones />
                </div>
            </div>
        </main>

    )
} 
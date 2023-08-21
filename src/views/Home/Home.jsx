import { useEffect } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import Opciones from '../../components/Opciones/ContainerOpciones/ContainerOpciones';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../../features/users/usersSlice';
import { getAllCategoires } from '../../features/category/categorySlica';
import { getAllCourses } from '../../features/courses/coursesSlice';

export default function Home() {

    const dispatch = useDispatch()

    const getData = async() =>{
        const users = await axios.get('http://localhost:3001/api/user')
        dispatch(getAllUsers(users.data))
        const categories = await axios.get('http://localhost:3001/api/category')
        dispatch(getAllCategoires(categories.data))
        const courses = await axios.get('http://localhost:3001/api/course')
        dispatch(getAllCourses(courses.data))
    }

    useEffect(()=>{
        getData();
    })

    return (
        <main className='d-flex justify-content-center'>
        <div className='w-60' style={{maxWidth:'60%', width:'100%'}}>
            <Carousel />
            <Opciones/>
        </div>
        </main>
        
    )
} 
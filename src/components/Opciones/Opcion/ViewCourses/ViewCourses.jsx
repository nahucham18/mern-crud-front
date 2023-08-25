import { useState } from 'react';
//React-bootstrap
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { searchCourses, sortCourses } from '../../../../features/courses/coursesSlice';

export default function ContainerViewCourse({ onClose }) {

    const dispatch = useDispatch()

    const courses = useSelector(state => state.courses.filterCourses)
    const categories = useSelector(state => state.category.categories)

    const [sortOrder, setSortOrder] = useState('asc');

    const handleSearchCategory = (event) => {
        dispatch(searchCourses(event.target.value))
    }

    const handleSort = (title) => {
        const order = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(order)
        dispatch(sortCourses({ order, title }))
    }

    return (
        <section className='container '>
            <div className=' d-flex justify-content-between align-items-center'>
            <Button variant='dark' onClick={() => onClose('viewCourses')}>Volver</Button>
            </div>

            <Row className='col-md-4 my-4'>
                <Form.Select onChange={handleSearchCategory} className='fit-content'>
                    <option disabled value="">Seleccione una categoria</option>
                    <option value="all">Toda las categorias</option>
                    {
                        categories?.map((category, index) => {
                            return (
                                <option key={index + 1} value={category._id}>{category.name}</option>
                            )
                        })
                    }
                </Form.Select>
            </Row>

            <div className='overflow-y-scroll' style={{height:'420px'}}>

            
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>#</th>
                        <th onClick={() => handleSort('name')}>First Name</th>
                        <th>Categoria</th>
                        <th onClick={() => handleSort('createdAt')}>Fecha Creacion</th>
                        <th onClick={() => handleSort('updatedAt')}> Fecha Actulizacion</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        courses?.map((course, index) => {
                            const fechaCreated = new Date(course.createdAt);
                            const fechaUpdated = new Date(course.updatedAt);
                            const formattedFecha = `${fechaCreated.getDate()}/${fechaCreated.getMonth() + 1}/${fechaCreated.getFullYear()} ${fechaCreated.getHours()}:${fechaCreated.getMinutes()}:${fechaCreated.getSeconds()}`;
                            const formattedUpdate = `${fechaUpdated.getDate()}/${fechaUpdated.getMonth() + 1}/${fechaUpdated.getFullYear()} ${fechaUpdated.getHours()}:${fechaUpdated.getMinutes()}:${fechaUpdated.getSeconds()}`;
                            // const fecha = new Date(course.createdAt);
                            return (
                                <tr key={index + 1}>
                                    <td>{index + 1}</td>
                                    <td>{course.name}</td>
                                    <td>{course?.category?.name}</td>
                                    <td>{formattedFecha}</td>
                                    <td>{formattedUpdate}</td>
                                </tr>
                            )

                        })
                    }
                </tbody>
            </Table>
            </div>
        </section>
    )
}
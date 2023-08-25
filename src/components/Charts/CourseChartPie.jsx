import { useEffect, useState } from "react";
//Chart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {Pie} from 'react-chartjs-2';
//React-bootstrap
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
    

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CourseChartPie({users}){
 
  const [mujeres, setMujeres] = useState([]);
  const [hombres, setHombres] = useState([]);
  
  useEffect(()=>{
    const userMujeres = users?.filter(user => {
      return user.gender === 'mujer'
    })
    setMujeres(userMujeres)

    const userHombres = users?.filter(user=>{
      return user.gender === 'hombre'
    })
    setHombres(userHombres)
  },[users])

  return (
    <>
    <Row className='mt-5' style={{width:'100%' , height:'300px'}}>
      <Col className="col-12">
      <h3>Por genero</h3>
      </Col>
      {
        (users)
        ?
        <Col className="col-12">
        <Pie data={{
          labels:['Hombres','Mujeres'],
          datasets:[
            {
              data: [hombres?.length, mujeres?.length],
              backgroundColor:['rgba(145, 200, 255, 0.7)','rgba(255, 193, 255, 0.7)'],
            },
           
            ],
        }}
        options={{maintainAspectRatio: false,
          responsive: true,}}
        />
        </Col>
        :
        <></>
      }
      
      
    </Row>
      
    
    </>
  )
}

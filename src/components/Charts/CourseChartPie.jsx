import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
// import { Doughnut } from "react-chartjs-2";
import {Pie} from 'react-chartjs-2';
import axios from 'axios';
import { Col, Row } from "react-bootstrap";
    

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CourseChartPie({users}){
 
  const [mujeres, setMujeres] = useState([]);
  const [hombres, setHombres] = useState([]);
  
 

  useEffect(()=>{
    console.log(users)
    
    const userMujeres = users?.filter(user => {
      return user.gender === 'mujer'
    })
    console.log({mujeres:userMujeres})
    setMujeres(userMujeres)

    const userHombres = users?.filter(user=>{
      return user.gender === 'hombre'
    })
    console.log({hombres:  userHombres})
    setHombres(userHombres)
    
  },[users])

  console.log(users)
  console.log(mujeres?.length)
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

// const options = {
//     responsive : true,
//     maintainAspectRatio : false,
//   }

//  const data = {
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//     datasets: [
//       {
//         label: '# of Votes',
//         data: [12, 19, 3, 5, 2, 3],
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(255, 206, 86, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(153, 102, 255, 0.2)',
//           'rgba(255, 159, 64, 0.2)',
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

  

  

// export default function CourseChartPie(){
//     return <Pie data={data} options={options}/>
// }
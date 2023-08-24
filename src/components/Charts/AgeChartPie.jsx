import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
// import { Doughnut } from "react-chartjs-2";
import {Pie} from 'react-chartjs-2';
import axios from 'axios';
import { Col, Row } from "react-bootstrap";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AgeChartPie({users}){
 
    const [menores, setMenores] = useState([]);
    const [mayores, setMayores] = useState([]);
    
   
  
    useEffect(()=>{
      console.log(users)
      
      const userMenores = users?.filter(user => {
        return user.age < 18 ;
      })
      console.log({menores:userMenores});
      setMenores(userMenores);
  
      const userMayores = users?.filter(user=>{
        return user.age > 17 ;
      })
      console.log({mayores:  userMayores})
      setMayores(userMayores)
      
    },[users])
  
    console.log(users)
    
    return (
      <>
      <Row className="mt-5" style={{width:'100%',height:'300px'}}>
        <Col className="col-12">
        <h3>Mayores de 18</h3>
        </Col>
        {
          (users)
          ?
          <Col className="col-12">
          <Pie data={{
            labels:['Menores','Mayores'],
            datasets:[
              {
                data: [menores?.length, mayores?.length],
                backgroundColor:['rgba(164, 255, 72, 0.7)','rgba(0, 128, 192, 0.7)'],
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
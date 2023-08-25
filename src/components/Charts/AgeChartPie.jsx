import { useEffect, useState } from "react";
//Chart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {Pie} from 'react-chartjs-2';
//React-bootstrap
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AgeChartPie({users}){
 
    const [menores, setMenores] = useState([]);
    const [mayores, setMayores] = useState([]);
  
    useEffect(()=>{
      const userMenores = users?.filter(user => {
        return user.age < 18 ;
      })
      setMenores(userMenores);
  
      const userMayores = users?.filter(user=>{
        return user.age > 17 ;
      })
      setMayores(userMayores)  
    },[users])
    
    return (
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
    )
  }
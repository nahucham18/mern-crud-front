import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
// import { Doughnut } from "react-chartjs-2";
import {Pie} from 'react-chartjs-2';
import axios from 'axios';

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
      <div className="my-4" style={{width:'100%',height:'250px'}}>
        <h3>Mayores de 18</h3>
        {
          (users)
          ?
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
          :
          <></>
        }
        
        
      </div>
        
      
      </>
    )
  }
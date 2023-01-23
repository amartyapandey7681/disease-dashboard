import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios'

let url = "https://f3c5-183-82-162-123.ngrok.io/initial/";


function App(){

  let [data,setData] = useState([]);
  let [page,setPage] = useState(1);

  async function getAll(){

    let f = 'getData/' + page;

    let r = await axios.get(url+f);

    console.log(r);

    if(r.status>=200 && r.status<=299){

      let g =  r.data.data;

      console.log(g);

      setData(g);
    }else{

      console.log("error");
    }


  }


  useEffect(()=>{

    getAll();

  },[])


  if(data.length === 0){

    return <>
    <h1>Loading ....</h1>
    </>
  }

  async function decpage(){

    if(page>1){

      let p = page;
      p--;

      let d = await axios.get(url+'getData/'+p)

      if(d.status>=200 && d.status<=299){

        let u = d.data.data;

        setData(u)
        setPage(p);
      }else{
        console.log("error");
      }

      
    }
  }

  async function incpage(){

      let p = page;
      p++;

      let d = await axios.get(url+'getData/'+p)

      if(d.status>=200 && d.status<=299){

        let u = d.data.data;

        if(u.length>0){

          setData(u)
          setPage(p);
        }else{
          console.log("no data");
        }

        
      }else{
        console.log("error");
      }


  }

  return <div>

      <div className='top'>
      <div className='a1'>S. no</div>
      <div className='a1'>Name</div>
      <div className='a1'>City</div>
      <div className='a1'>Disease</div>
      {
        data.map((val,i)=>{

          let { Name ,City , Disease} = val;

          return <>
            <div className='a'>{((page-1)*10)+i+1}</div>
            <div className='a'>{Name}</div>
            <div className='a'>{City}</div> 
            <div className='a'>{Disease}</div>
            </>
          
        })
      }
      </div>

      <button type="button"  className= "btn" onClick={()=>decpage()}>Decrease</button>
      <button type="button" className= "btn" onClick={()=>incpage()}>Increase</button>

  </div>
}

function Addata(){

  async function addData(){


  }


  return <>
    <button type="button" className= "btn1" onClick={()=>addData()}>Add</button>
  </>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <h1>Disease Dashboard</h1>

    <Addata />
    <div className='whole'>

    <App />
    </div>

  </React.StrictMode>
);

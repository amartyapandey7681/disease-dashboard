import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios'

let url = "https://5386-183-82-162-123.ngrok.io/initial/";


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

function Formy(){

    let [name,setName] = useState('');
    let [city,setCity] = useState('');
    let [disease,setDis] = useState('');

    async function apicall(e){

      e.preventDefault();

      if(name!=='' && city!=='' && disease!==''){

        console.log(name,city,disease);

        try{

          await axios.get(url+'addData/'+city+'/'+name+'/'+disease)
          setCity('');
          setName('');
          setDis('');

        }catch(err){
          console.log(err);
          setCity('');
          setName('');
          setDis('');
        }

        
      }else{
        console.log('err');
      }

    }

    return <div className='formy'>
      <form onSubmit={(e)=>apicall(e)}>
        <label className='l' >Name : </label>
        <input  className='l' label="name" onChange={(e)=>setName(e.target.value)} value={name}/>
        <label className='l' >Disease : </label>
        <input  className='l' type = "text" onChange={(e)=>setDis(e.target.value)} value={disease}/>
        <label className='l' >City : </label>
        <input  className='l' type = "text" onChange={(e)=>setCity(e.target.value)} value={city}/>

        <button type="submit" className='sub'>Submit</button>
      </form>
    </div>;

}

function Addata(){

  let [showform,setShowForm] = useState(false);


  return <>
    <button type="button" className= "btn1" onClick={()=>setShowForm(!showform)}>Add</button>
    {showform && <Formy />}
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

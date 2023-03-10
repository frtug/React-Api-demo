import Axios from 'axios'
import { useState } from 'react';

function App() {
  const [data,setData] = useState([]);
  const [year,setYear] = useState("");
  const [totalPages,setTotalPages]= useState(0);
  
  const fetchpage = async(e)=>{
    setYear(e.target.value)
    console.log(e.target.value)
    if(e.target.value.length !== 4 || e.target.value === year) return
      console.log(e.target.value)
      const url = `https://jsonmock.hackerrank.com/api/moviesdata?Year=${e.target.value}`
     try{
       const pageData = await Axios.get(url)
       setTotalPages(pageData.data.total_pages)
       console.log(pageData.data.total_pages)
     }
     catch(err)
     {
       console.log(err);
     }
    
    
  }

  const calledEvent = async ()=>{
    let requestedData = [];
    if(year.length !== 4)  return;
    console.log(totalPages);
      for(let i=1;i<=totalPages;i++){
        let page_no = i;
        try{
          const url = `https://jsonmock.hackerrank.com/api/moviesdata?Year=${year}&page=${page_no}`
          const res = await Axios.get(url)
          requestedData.push(res.data)
        }
        catch(err){
          console.log(err)
        }
      }
      setData(requestedData);
    }
  
  return (
    <div className="App">
      <input name="input" placeholder='Enter the year' value ={year} onChange={fetchpage}/>
      {/* {console.log(totalPages)} */}
      {console.log(data)}

      <button onClick={calledEvent}>Button</button>
      {
      data && data.map((o,index)=>{return(
        <ul key={index}>
        {o.data.map((element,i)=>(
          
          <li key={i}>{element.Title}</li>
        ))}
        </ul>
      )
      })
    }
    </div>
  );

}

export default App;

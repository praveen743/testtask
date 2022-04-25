import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';

function P4() {
const[titles,settitles] = useState();
const[pagenum,setpagenum] = useState();

  // useEffect(async () => {
  //   fetch()
  //    }, [])

  const formik = useFormik({
    initialValues: {
      title: '',
      pageno:''
    },
    onSubmit: async (values) => {
      
      settitles(values.title)
      setpagenum(values.pageno)

     }

  })
    
async function fetch(){
  var  arr = await axios.get(`https://jsonmock.hackerrank.com/api/moviesdata/search/?Title=${titles}&page=${pagenum}`);
  // console.log(arr.data.data);
  var finarr= arr.data.data
  // console.log(finarr)

  var sortarr= finarr.sort(function (a, b) {
    return a.Year - b.Year;
  });
  // console.log(sortarr)

  for(var i=0;i<sortarr.length;i++){
        console.log(sortarr[i].Title,sortarr[i].Year)
    }

   
}

  return (
    <>
    <div>Task 4</div>
    <form onSubmit={formik.handleSubmit}  >
<label>Enter Title:</label>
<input type="text" className='form-control' 
            onChange={formik.handleChange} value={formik.values.title} name='title'></input><br/><br/>
            <label>Enter Page number:</label>
<input type="number" className='form-control' 
            onChange={formik.handleChange} value={formik.values.pageno} name='pageno'></input>
         <br/>
          <button type='submit' onClick={()=> fetch()}>Search</button>

</form>

    </>
     
  )
}

export default P4

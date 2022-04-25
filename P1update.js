import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

function P1update() {
    const[ID,setID]= useState();
    const formik = useFormik({

        initialValues: {
        
          stage: '',
          ids: '',
        },
        onSubmit: async (values) => {
            setID(values.ids)
            console.log(ID)

            var  redata = await axios.put(`http://localhost:3001/addtitle/${ID}`,values);
            
        }
    
      })

  return (

   
    <>
        <div>P1update</div>
        <form onSubmit={formik.handleSubmit}  >
<label>Enter ID:</label>
<input type="number" className='form-control' 
            onChange={formik.handleChange} value={formik.values.ids} name='ids'></input>
            <label>Enter Stage:</label>
<input type="number" className='form-control' 
            onChange={formik.handleChange} value={formik.values.stage} name='stage' min={1}
            max={3}></input>
          
          <button type='submit'>Enter</button>

</form>
    </>
  )
}

export default P1update

import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useEffect } from 'react';
import P1update from './P1update';

function P1() {
    

    const formik = useFormik({

        initialValues: {
          title: '',
          stage: 1,
          id:''
           
        },
        onSubmit: async (values) => {
          console.log(values.id)
            var  redata = await axios.post(`http://localhost:3001/addtitle`,values);
            // fetch();
        }
    
      })
  return (
      <>
      <div>P1</div>
      <form onSubmit={formik.handleSubmit}  >
<label>Enter Title:</label>
<input type="text" className='form-control' 
            onChange={formik.handleChange} value={formik.values.title} name='title'></input>
          <button type='submit'>Enter</button>

</form>
<P1update></P1update>
      </>
    
  )
}

export default P1

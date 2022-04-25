import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';


function P5() {
  const [items, setitems] = useState()
  const formik = useFormik({
    initialValues: {
      item: '',
    },
    onSubmit: async (values) => {
      
      console.log(values.item)
      setitems(values.item)
    }

  })

  async function additem() {
    console.log(items);

    var  redata = await axios.post(`http://localhost:3001/additem`,{items});
    alert(redata.data.message)
  }

async function getitemlist(){
  var  arr = await axios.get(`http://localhost:3001/getarr`);
  console.log(arr.data);
}

async function removeitem(){
  var  redata = await axios.delete(`http://localhost:3001/delitem/${items}`);
  alert(redata.data.message)
}

  return (
    <>
      <div>Problem 5</div>
      <form onSubmit={formik.handleSubmit}  >
<label>Enter item:</label>
<input type="text" className='form-control' 
            onChange={formik.handleChange} value={formik.values.item} name='item'></input>
          <button type='submit'>Enter</button>

</form>


      <button onClick={() => additem()}>ADD Item</button>
      <button onClick={()=>removeitem()}>REMOVE Item</button>
<button onClick={()=>getitemlist()}>GET Item List</button>
    </>

  )
}

export default P5

import { useState } from 'react'
import './App.css'
import { useForm } from 'react-hook-form';

function App() {
  
  const {
    register,
    handleSubmit,
    formState: { errors , isSubmitting },
  } = useForm();

 async function onsubmit(data){
    await new Promise((resolve) => setTimeout(resolve,5000));
    console.log("submitting the form ",data);
}

  return (
    <>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div>
        <label >First Name :</label>
        <input className= {errors.firstName? 'input-error':""}
        {...register('firstName',
          { required: {value:true,message:'this is required field'},
          minLength:{value:3,message:'min length is 3'},
          maxLength:{value:7,message:'max length is 7'}
          })}/>
        {errors.firstName && <p className='error-msg'>{errors.firstName.message}</p>}
      </div>
      <br />
      <div>
        <label >Middle Name :</label>
        <input {...register('middleName')}/>
      </div>
      <br />
      <div>
        <label >Last Name :</label>
        <input {...register('lastName')}/>
      </div>
      <br />

      <input type="submit"  disabled={isSubmitting} value={isSubmitting? "submitting": "submit"} />
      </form>
    </>
  )
}

export default App

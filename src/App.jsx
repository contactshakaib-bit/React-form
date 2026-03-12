import { useState } from 'react'
import './App.css'

function App() {
  const [values, setvalue]= useState({
    firstname:"",
    lastname:"",
    email:"",
    contact:"",
    gender:"",
   dob:"",
   age:"",
   about:""
  })

  const [Error, setError]=useState({})
 
  const handleChanges=(e)=>{
    setvalue({...values,[e.target.name]:e.target.value})
     const { name, value } = e.target;

  if (name === "dob") {
    const age = calculateAge(value);

    setvalue({
      ...values,
      dob: value,
      age: `your age:${age} years`
    });
  } else {
    setvalue({
      ...values,
      [name]: value
    });
  }
};
    


  const handleSubmit=(e)=>{
    e.preventDefault()
    const validationErrors = validate();
  setError(validationErrors);

  if (Object.keys(validationErrors).length === 0) {
    console.log(values);
    alert("Form submitted successfully!");
  }

  }

  const resetFun=() =>{
    setvalue({firstname:"", lastname:"", email:"", contact:"", gender:"", dob:"",age:"", about:""})
    setError({})
  }

  const validate = () => {
  let newErrors = {};

  if (!values.firstname) {
    newErrors.firstname = "First name is required";
  }
  if (!values.lastname) {
    newErrors.lastname = "First name is required";
  }

  if (!values.email) {
    newErrors.email = "Email is required";
  }

  if (!values.contact) {
    newErrors.contact = "Contact number is required";
  }

  if (values.contact && values.contact.length < 11) {
    newErrors.contact = "Contact must be at least 10 digits";
  }
    return newErrors;
};
const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

  return (
  <div className='cont'>
    <form onSubmit={handleSubmit}>
    <h1>Registration Form</h1>
<label htmlFor='firstname'>First name</label>
<input type='text'className='in1' placeholder='Enter First Name' name='firstname' value={values.firstname} onChange={(e)=> handleChanges(e)} ></input>
<p>{Error.firstname}</p>

<label htmlFor='lastname'>Last name</label>
<input type='text'className='in1'placeholder='Enter Last Name' name='lastname' value={values.lastname} onChange={(e)=> handleChanges(e)} ></input>
<p>{Error.lastname}</p>

<label htmlFor='email'>Email</label>
<input type='email'className='in1' placeholder='Enter Email' name='email' value={values.email} onChange={(e)=> handleChanges(e)} ></input>
<p>{Error.email}</p>

<label htmlFor='contact'>Contact</label>
<input type='number'className='in1' placeholder='Enter Contact' name='contact' value={values.contact} onChange={(e)=> handleChanges(e)}></input>
<p>{Error.contact}</p>

<label htmlFor='gender'>Gender</label>
<input
 type="radio"
 name="gender"
 value="Male"
 checked={values.gender === "Male"}
 onChange={handleChanges}
/> Male
<input
 type="radio"
 name="gender"
 value="Female"
 checked={values.gender === "Female"}
 onChange={handleChanges}
/> Female
<input
 type="radio"
 name="gender"
 value="Other"
 checked={values.gender === "Other"}
 onChange={handleChanges}
/> Other

<label htmlFor='dob'>Select Date of Birth</label>
<input type='date' className='dob1' name='dob' onChange={(e)=> handleChanges(e)} value={values.dob}></input> 
<textarea cols={2} rows={1} className='dob1' name="age" onChange={(e)=> handleChanges(e)} value={values.age}></textarea>

<label htmlFor='about'>About</label>
<textarea className="tex1" placeholder="Describe Yourself"cols={25} rows={4} name='about' onChange={(e)=> handleChanges(e)} value={values.about}></textarea>
<div className='button1'>
  <button type='reset' onClick={resetFun}>Reset</button> <button type='submit'>Submit</button>
</div>

</form>
  </div>

  )
}

export default App

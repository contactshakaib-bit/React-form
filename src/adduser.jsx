import { useState } from 'react'
import './App.css'

function Adduser() {
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

  const [Error, setError]=useState({});
  const [Error1, setError1]=useState({});
 
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
    


  const handleSubmit= async (e)=>{
    e.preventDefault()
    const validationErrors = validate();
    const validationErrors1 = validate1();
  setError(validationErrors);
  setError1(validationErrors1);

  if (Object.keys(validationErrors).length === 0) {
    try {
      const response =  await fetch('http://localhost:5000/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      if (response.ok) alert("Data saved to SQL!");
    } catch (err) {
      console.error("Error connecting to server:", err);
    }
  }
  };

  const resetFun=() =>{
    setvalue({firstname:"", lastname:"", email:"", contact:"", gender:"", dob:"",age:"", about:""})
    setError({});
    setError1({});
  }

  const validate = () => {
  let newErrors = {};

  if (!values.firstname) {
    newErrors.firstname = "First name is required";
  }
  if (!values.lastname) {
    newErrors.lastname = "Last name is required";
  }

  if (!values.email) {
    newErrors.email = "Email is required";
  }

  if (!values.contact) {
    newErrors.contact = "Contact number is required";
  }

  if (values.contact && values.contact.length < 11 ) {
    newErrors.contact = "Contact must be at least 11 digits";
  }
  if( values.contact && !/^\d+$/.test(values.contact))
  {
    newErrors.contact = "Invalid input";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email) {
      newErrors.email = "Email is required";
  }
  else{
    if(!emailRegex.test(values.email))
      newErrors.email = "Invalid email (e.g. user@example.com)";
  }
  if (!values.gender) {
    newErrors.gender = "Gender is required";
  }
  if (!values.dob) {
    newErrors.dob = "Date of Birth is required";
  } else {
    const selectedDate = new Date(values.dob);
    const today = new Date();
    if (selectedDate > today) {
      newErrors.dob = "Date of Birth cannot be in the future";
    }
    
  };
  return newErrors;
}

const validate1 = () => {
  let newErrors = {};

  if (!values.firstname) {
    newErrors.firstname = "*";
  }
  if (!values.lastname) {
    newErrors.lastname = "*";
  }

  if (!values.email) {
    newErrors.email = "*";
  }

  if (!values.contact) {
    newErrors.contact = "*";
  }

  if (values.contact && values.contact.length < 11) {
    newErrors.contact = "*";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email) {
      newErrors.email = "*";
  }
  else{
    if(!emailRegex.test(values.email))
      newErrors.email = "*";
  }
  if (!values.gender) {
    newErrors.gender = "*";
  }
  if (!values.dob) {
    newErrors.dob = "*";
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
<label htmlFor='firstname'>First name <span>{Error1.firstname}</span></label>
<input type='text'className='in1' placeholder='Enter First Name' name='firstname' value={values.firstname} onChange={(e)=> handleChanges(e)} ></input>
<p>{Error.firstname}</p>

<label htmlFor='lastname'>Last name <span>{Error1.lastname}</span></label>
<input type='text'className='in1'placeholder='Enter Last Name' name='lastname' value={values.lastname} onChange={(e)=> handleChanges(e)} ></input>
<p>{Error.lastname}</p>

<label htmlFor='email'>Email <span>{Error1.email}</span></label>
<input type='text'className='in1' placeholder='Enter Email' name='email' value={values.email} onChange={(e)=> handleChanges(e)} ></input>
<p>{Error.email}</p>

<label htmlFor='contact'>Contact <span>{Error1.contact}</span></label>
<input type='text'className='in1' placeholder='Enter Contact' name='contact' value={values.contact} onChange={(e)=> handleChanges(e)}></input>
<p>{Error.contact}</p>

<label htmlFor='gender'>Gender <span>{Error1.gender}</span></label>
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
<p>{Error.gender}</p>
<label htmlFor='dob'>Date of Birth <span>{Error1.dob}</span></label>
<input type='date' className='dob1' name='dob' onChange={(e)=> handleChanges(e)} value={values.dob}></input> 
<p>{Error.dob}</p>
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

export default Adduser

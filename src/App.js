import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const initialValues = {username:"",email:"",password:""};
  const [formValues,setFormValues] = useState(initialValues); 
  const [formErrors,setFormErrors] = useState({}); 
  const [isSubmit,setisSubmit] = useState(false); 
  const handleChange = (event) =>{
    const { name, value} = event.target;
    setFormValues ({...formValues, [name]:value});
  };
  const handleSubmit = (event) =>{
    event.preventDefault();
    setFormErrors(validate(formValues))
    setisSubmit(true);
  }
  useEffect(()=>{
    console.log(formErrors);
    if(Object.keys(formErrors).length === 0 && isSubmit){
      console.log(formValues);
    }
  },[formErrors])

  const validate=(values)=>{
    const errors = {};
    const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if(!values.username){
      errors.username = "Username is Required"
    }
    if(!values.email){
      errors.email = "Email is Required"
    }else if(!regex.test(values.email)){
      errors.email = "Enter Valid Email Address";
    }
    if(!values.username){
      errors.password = "Password is Required";
    }else if(values.password.length < 4){
      errors.password = "Password contains atleast 4 character ";
    }else if(values.password.length > 10){
      errors.password = "Password can't be  more than 10 characters";
    }
    return errors;
  };
  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Signed in successfully</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )}
      <form onSubmit={handleSubmit}>
      <div className="ui divider"></div>
      <div className="ui form">
          <h1 className='field'>Login Page</h1>
          <div className="mt-3 card-title">
            {/* <label htmlFor="">Username</label> */}
            <input type="text" name='username' placeholder='Enter Your Username' value={formValues.username} onChange={handleChange}/>
          </div>
          <p className='fs-6 text-dark'>{formErrors.username}</p>
          {/* <br /> */}
          <div className="field">
            {/* <label htmlFor="">Email</label> */}
            <input type="text" name='email' placeholder='Enter Your Email' value={formValues.email} onChange={handleChange}/>
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            {/* <label htmlFor="">Password</label> */}
            <input type="text" name='password' placeholder='Enter Your Password' value={formValues.password} onChange={handleChange}/>
            <p className='text-dark'>{formErrors.password}</p>
            <button className="fluid ui button blue">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default App;

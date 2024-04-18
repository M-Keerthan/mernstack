import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';

function Login() {
  const [credentials,setCredentials]=useState({email:"",password:""})
  const navigate=useNavigate()
    const handleSubmit= async(e)=>{
        e.preventDefault(); // Corrected method name to preventDefault()
        const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                
                email: credentials.email,
                password: credentials.password
                
            })
        });
        const json = await response.json();
        console.log(json);
        if (!json.success) {
            alert("Enter valid credentials");
        }
        if(json.success)
        {
          navigate("/")
          localStorage.setItem('authToken', json.authtoken);
          console.log(localStorage.getItem('authToken'))
        }


    }
    const onchange = async(event)=>{
        setCredentials({...credentials,[event.target.name]:event.target.value})
    }
  return (
    <>
    
    <div className='container ' >
      <form onSubmit={handleSubmit}>
        
        <div className="mb-3 ">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onchange}/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={onchange}/>
        </div>
        
        <button type="submit" className="btn btn-success">Submit</button>
        <Link to="/createuser" className='m-3 btn btn-danger'>I am a New User</Link>
        <Link to="/" className='m-3 btn btn-danger'>Home</Link>
      </form>
      </div>
    </>
    
  )
}

export default Login
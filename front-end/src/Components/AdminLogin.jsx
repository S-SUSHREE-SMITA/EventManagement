import React,{useState} from "react"
import "./Form.css"

function AdminLogin(){

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const handleSubmit = async(e)=>{

e.preventDefault()

const res = await fetch("http://localhost:5000/api/admin/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({email,password})
})

const data = await res.json()

if(res.status===200){
alert("Admin Login Successful")
}else{
alert(data.message)
}

}

return(

<div className="form-container">

<div className="form-box">

<h2>Admin Login</h2>

<form onSubmit={handleSubmit}>

<input
type="email"
placeholder="Enter Admin Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type="password"
placeholder="Enter Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button type="submit">Login</button>

</form>

</div>

</div>

)

}

export default AdminLogin;
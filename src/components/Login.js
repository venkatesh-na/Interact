import {useState} from "react"
import {Link,useNavigate} from "react-router-dom"
import "./Login.css"
//useNavigate use for navigating to other page automatically 
const Login = ()=>{
    const [loginInput,setloginInput] = useState({email:"",password:""})
    const [loginError,setloginError] = useState(null)
    const [loginsucess,setloginSucess] = useState(false)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const handleLogin = (e)=>{
        e.preventDefault()
        if(loginInput.email.match(/([a-zA-Z0-9_.-]+)@([a-zA-Z]+)([\.])([a-zA-Z]+)/g) && 
        loginInput.password.match(/(^[A-Z])[a-z]+(@|#|&|!|\.\?)\d{2,}$/g))
        {
            setloginError(null)
            setLoading(true)
            fetch("https://interact-app-1.herokuapp.com/login",
            {
                method:"POST",
                headers:{
                "Content-Type":"application/json"
                },
                body:JSON.stringify(loginInput)
            })
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                if(data.length === 0)
                {
                    setloginError({error:"Email or password does not match"})
                }
                else
                {
                    setloginError(null)
                    setloginSucess(true)
                    setTimeout(()=>{
                        navigate(`/user/${data[0].email}/${data[0].password}`)
                    },2000)
                }
            })
            .catch(err => {
                setloginError({err:err})
            })
        }
        else
        {
            setloginError({error:"Please enter a valid email or password"})
        }
    }
    return (
        <section className="login-section">
            <div className = "login-container">
                 {loginsucess && <p className = "successMessage">Login Successfull</p>}
                {loginError && 
                    <div className = "error">
                        <div className = "error_sidebar"></div>
                        <p>{loginError.error}</p>
                    </div>
                }
                <h1>Login</h1>
                <form>
                    <input onChange = {(e)=>setloginInput({...loginInput,email:e.target.value})} type = "text" placeholder="Email"/>
                    <input onChange = {(e)=>setloginInput({...loginInput,password:e.target.value})} type = "password" placeholder="Password"/>
                    <button type = "submit" onClick={(e)=>handleLogin(e)}>{loading ? "Loading..." : "LOGIN"}</button>
                </form>
                <p>Not Registered?<Link to = "/Register">Register Now</Link></p>
            </div>
        </section>
    )
}
export default Login;
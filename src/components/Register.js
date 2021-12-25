import {useState} from "react"
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./Register.css"

const Register = ()=>{
    const [input,setInput] = useState({firstName:"",lastName:"",bio:"",email:"",password:""})
    const [emailError,setemailError] = useState("")
    const [passwordError,setpasswordError] = useState("")
    const [firstlastError,setfirstlastError] = useState("") 
    const [success,setSuccess] = useState(false)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const handleRegister = (e)=>{
            e.preventDefault()
            if(input.email.match(/([a-zA-Z0-9_.-]+)@([a-zA-Z]+)([\.])([a-zA-Z]+)/g) && input.password.match(/(^[A-Z])[a-z]+(@|#|&|!|\.\?)\d{2,}$/g) && input.firstName.length > 1 && input.lastName.length > 1)
            {
                setLoading(true)
            fetch("https://interact-app-1.herokuapp.com/register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(input)
            })
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                setSuccess(true)
                setInput({firstName:"",lastName:"",bio:"",email:"",password:""})
                setTimeout(()=>{
                    navigate("/login")
                },2000)
            })
            .catch(err=>console.log(err))
        }
        else
        {
            if(input.email.match(/([a-zA-Z0-9_.-]+)@([a-zA-Z]+)([\.])([a-zA-Z]+)/g) == null)
            {
                setemailError("-Please enter a valid email")
            }
            if(input.password.match(/(^[A-Z])[a-z]+(@|#|&|!|\.\?)\d{2,}$/g) == null)
            {
               setpasswordError("-Please follow the password pattern given below")
            }
            if(input.firstName.length < 2 || input.lastName.length < 2)
            {   
               setfirstlastError("-The length of FirstName and LastName must be greater than one")
            }
        }
    }
    return (
        <section className="register-section">
            <div className="register-container">
                {success && <p className = "successMessage">Registered Successfully</p>}
                {(emailError || passwordError || firstlastError) &&
                    <div className = "error register_error">
                        <div className = "error_sidebar"></div>
                        {firstlastError && <p>{firstlastError}</p>}
                        {emailError && <p>{emailError}</p>}
                        {passwordError && <p>{passwordError}</p>}
                    </div>
                }
                <h1>Register</h1>
                <form id = "register-id">
                    <input value = {input.firstName} onChange = {(e)=>setInput({...input,firstName:e.target.value})} type = "text" placeholder="First name"/>
                    <input value = {input.lastName} onChange = {(e)=>setInput({...input,lastName:e.target.value})} type = "text" placeholder="Last name"/>
                    <textarea value = {input.bio} onChange = {(e)=>setInput({...input,bio:e.target.value})}placeholder="Bio(optional)" form = "register-id"/>
                    <input value = {input.email} onChange = {(e)=>setInput({...input,email:e.target.value})} type = "email" placeholder="Email"/>
                    <input value = {input.password} onChange = {(e)=>setInput({...input,password:e.target.value})}type = "text" placeholder="Password"/>
                    <button type = "submit" onClick = {(e)=>handleRegister(e)}>{loading ? "Loading..." : "Register"}</button>
                </form>
                <p>Already Registered?<Link to = "/login">Login Now</Link></p>
            </div>
            <div className="password-rule">
                <h3>Pattern of password (Type in a below order)</h3>
                <ol>
                    <li>first letter must me capital</li>
                    <li>Any letter form a-z n no of times</li>
                    <li>Any one special charcater from this @,#,&,!,.,?</li>
                    <li>Digit with size 2 or more</li>
                </ol>
                <p>eg. Interact@650</p>
            </div>
        </section>
    )
}
export default Register;
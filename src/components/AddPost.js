import { useEffect, useState } from "react";
import  {useLocation, Link} from "react-router-dom"
import {FaBackward} from "react-icons/fa"
import "./AddPost.css"
const AddPost = ()=>{
    const [addInput,setaddInput] = useState({title:"",description:""})
    const [titleError,settitleError] = useState("")
    const [descriptionError,setdescriptionError] = useState("")
    const [posted,setPosted] = useState(false)
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(false)
   const location = useLocation()
   const path = location.pathname.split("/")
    const handleaddPost = (e)=>{
        e.preventDefault()
        if(addInput.title.length < 2 || addInput.description.length < 2)
        {
           if(addInput.title.length == 0)
           {
               settitleError("This is a required field")
           }
           else if(addInput.title.length < 2)
           {
                settitleError("Title must have atleast 2 character")
           }
           else
           {
               settitleError("")
           }
           if(addInput.description.length == 0)
           {
               setdescriptionError("This is a required field")
           }
           else if(addInput.description.length < 2)
           {
              setdescriptionError("Description must have atleast 2 character")
           }
           else
           {
               setdescriptionError("")
           }
        }   
        else
        {
            setLoading(true)
            fetch(`https://interact-app-1.herokuapp.com/post/${path[path.length-2]}/${path[path.length-1]}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(addInput)
            })
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                setPosted(true)
                setTimeout(()=>{
                    setPosted(false)
                },3000)
                settitleError("")
                setdescriptionError("")
                setaddInput({title:"",description:""})
            })
            .catch(err => console.log(err))
            }
        }
       useEffect(()=>{
        fetch(`https://interact-app-1.herokuapp.com/users/${path[path.length-1]}`)
        .then(res => res.json())
        .then(data => {
            setUser({email:data[0].email,password:data[0].password})
        })
       },[])
    return (
        <div className = "post-container">
             {posted && <p className = "successMessage">Your post has been posted</p>}
            <form id = "post-id" className="addPost">
                <input value = {addInput.title} onChange = {(e)=>setaddInput({...addInput,title:e.target.value})} type = "text" placeholder="Title"/>
                {titleError && <p className = "addpostError">{titleError}</p>}
                <textarea value = {addInput.description} onChange = {(e)=>setaddInput({...addInput,description:e.target.value})} placeholder="Description">
                </textarea>
                {descriptionError && <p className = "addpostError">{descriptionError}</p>}
                <button type = "submit" onClick = {(e)=>handleaddPost(e)}>{loading ? "Loading..." : "Add Post"}</button>
            </form>
            {user &&
            <div className = "toHome">
                <Link to = {`/user/${user.email}/${user.password}`}><button><FaBackward/></button></Link>
            </div>
            }
        </div>
    )
}
export default AddPost;
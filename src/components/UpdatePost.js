import { useEffect, useState } from "react";
import { useLocation ,Link} from "react-router-dom";
import { FaBackward } from "react-icons/fa"

const UpdatePost = ()=>{
    const [updateData,setupdateData] = useState({title:"",description:""})
    const [titleError,settitleError] = useState("")
    const [descriptionError,setdescriptionError] = useState("")
    const [updated,setUpdated] = useState(false)
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(false)
    const location = useLocation()
    const path = location.pathname.split("/")
    
    useEffect(()=>{
        let isMounted = true
        fetch(`https://interact-app-1.herokuapp.com/users/${path[path.length-2]}`)
        .then(res => res.json())
        .then(data => {
            setUser({email:data[0].email,password:data[0].password})
            fetch(`https://interact-app-1.herokuapp.com/post/${path[path.length-1]}`)
            .then(res => res.json())
            .then(data => {
                setupdateData({title:data.title,description:data.description})
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
        return ()=> { isMounted = false }
    },[])
    const handleUpdate = (e)=>{
        e.preventDefault()
         if(updateData.title.length < 2 || updateData.description.length < 2)
        {
           if(updateData.title.length == 0)
           {
               settitleError("This is a required field")
           }
           else if(updateData.title.length < 2)
           {
                settitleError("Title must have atleast 2 character")
           }
           else
           {
               settitleError("")
           }
           if(updateData.description.length == 0)
           {
               setdescriptionError("This is a required field")
           }
           else if(updateData.description.length < 2)
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
            fetch(`https://interact-app-1.herokuapp.com/post/${path[path.length-1]}`,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(updateData)  
            })
            .then(res => res.json())
            .then(data =>{
                setLoading(false)
                setUpdated(true)
                setTimeout(()=>{
                    setUpdated(false)
                },3000)
                setupdateData({title:"",description:""})
                settitleError("")
                setdescriptionError("")
            })
            .catch(err => console.log(err))
        }
    }
    return (
        <section className="update-post-section">
            {updated && <p className="successMessage">Your post has been updated</p>}
            <form id = "update-id" className="addPost">
                <input value = {updateData.title} onChange = {(e)=>setupdateData({...updateData,title:e.target.value})} type = "text" placeholder="Title"/>
                 {titleError && <p className = "addpostError">{titleError}</p>}
                <textarea value = {updateData.description} onChange = {(e)=>setupdateData({...updateData,description:e.target.value})} placeholder="Description">
                </textarea>
                {descriptionError && <p className = "addpostError">{descriptionError}</p>}
                <button type = "submit" onClick={handleUpdate}>{loading ? "Loading..." : "update"}</button>
            </form>
             {user &&
            <div className = "toHome">
                <Link to = {`/user/${user.email}/${user.password}`}><button><FaBackward/></button></Link>
            </div>
            }
        </section>
    )
}
export default UpdatePost;
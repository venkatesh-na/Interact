import { useState , useEffect} from "react"
import {Link,useLocation} from "react-router-dom"
import { FaEdit , FaTrashAlt , FaGlobeAsia} from "react-icons/fa"
import "./User.css"
//useLocation hook for accessing the path 
const User = ()=>{
    const [user,setUser] = useState([])
    const [deleted,setDeleted] = useState(false)
    const location = useLocation()
    const [loading,setLoading] = useState(false)
    const path = location.pathname.split("/")
    useEffect(()=>{
    setLoading(true)
    fetch(`https://interact-2.herokuapp.com/user/${path[path.length-2]}/${path[path.length-1]}`)
    .then(res => res.json())
    .then(data =>{
        setUser(data)
        setLoading(false)
    })
    .catch(err=>console.log("err",err))
    setDeleted(false)
},[deleted])
    const handleDelete = (userId,postId)=>{
        let title,description;
        fetch(`https://interact-2.herokuapp.com/post/${postId}`)
            .then(res => res.json())
            .then(data => {
                title = data.title
                description = data.description
                        fetch(`https://interact-2.herokuapp.com/post/${userId}/${postId}`,{
                            method:"PATCH",
                            headers:{
                                "Content-Type":"application/json"
                            }
                        })
                        .then(res => res.json())
                        .then(data => {
                            fetch("https://interact-2.herokuapp.com/globaldelete",{
                                method:"DELETE",
                                headers:{
                                    "Content-Type":"application/json"
                                },
                                body:JSON.stringify({userpostid:userId,title,description})
                            })
                            .then(res => res.json())
                            .then(data => {
                                setDeleted(true)
                            })
                            .catch(err => console.log(err))
                        })
                        .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        }
        if(loading)
        {
            return (
                 <div className = "loading">
                    <h1>Loading...</h1>
                </div>
            )
        }
        else
        {
            return (
        <section className = "user-section">
            {user.length > 0 &&
            <nav>
                <h1>Interact</h1>
                <Link title = "see others post" to = {`/global/${user[0]._id}`}><button><FaGlobeAsia/></button></Link>
            </nav>
            }
            {user.length > 0 && user.map(e=>{
                const {name,bio,post,_id:userId} = e
                return (
                    <div key = {userId} className = "inner-user-section">
                    <article className="profile-add">
                        <div>
                            <h1>{name}</h1>
                            <p>{bio}</p>
                        </div>
                        <div>
                            <Link className = "post-link" to = {`/addPost/${name}/${userId}`}>
                                <button>
                                    add post
                                </button>
                            </Link>
                            <div className = "auth">
                                <Link className = "login-link" to = "/login">Login</Link>
                                <Link className = "register-link" to = "/register">Register</Link>
                            </div>
                        </div>
                    </article>
                    <article className ="posts">
                        <div>
                            <h1>your post</h1>
                        </div>
                        <div className = "post-div">
                            {post.length > 0 ? post.map(e=>{
                                    const {name,title,description,date,_id} = e
                                    return (
                                        <div key = {_id}>
                                            <div className = "post-header">
                                                <div className = "profile">   
                                                </div>
                                                <p>{name}</p>
                                            </div>
                                            <div className = "post-main-content">
                                                <h3>{title}</h3>
                                                <p>{description}</p>
                                                <p>{date}</p>
                                            </div>
                                            <div className = "post-buttons">
                                                <button onClick = {()=>handleDelete(userId,_id)}><FaTrashAlt/></button>
                                                <Link to = {`/updatePost/${userId}/${_id}`}>
                                                    <button>
                                                        <FaEdit/>
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                }) : 
                                <div className = "post-add">
                                    <Link to = {`/addPost/${name}/${userId}`}><button>+</button></Link>
                                </div>
                            }
                        </div>
                    </article>
                    </div>
                )
            })}
        </section>
    )}
}
export default User;
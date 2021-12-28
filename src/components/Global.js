import { useEffect, useState } from "react"
import "./Global.css"
import "./User.css"
import {FaHome} from "react-icons/fa"
import { useLocation , Link} from "react-router-dom"

const Global = ()=>{
    const [globalData,setglobalData] = useState([])
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(false)
    const location = useLocation()
    const path = location.pathname.split("/")
    useEffect(()=>{
        setLoading(true)
        fetch(`https://interact-2.herokuapp.com/users/${path[path.length-1]}`)
        .then(res => res.json())
        .then(data => {
            setUser({email:data[0].email,password:data[0].password})
        })
        .catch(err => console.log(err))

        fetch("https://interact-2.herokuapp.com/global")
        .then(res => res.json())
        .then(data => {
            setLoading(false)
            setglobalData(data)
        })
        .catch(err => console.log(err))
    },[])

     
      
    if(loading)
    {
        return (
        <div className = "loading">
            <h1>Loading...</h1>
        </div>)
    }
    else
    {
    return (
        <section className="global-section">
             {user  &&
            <nav>
                <h1>Interact</h1>
                <Link title = "see others post" to = {`/user/${user.email}/${user.password}`}><button><FaHome/></button></Link>
            </nav>
            }
            <div className = "post-div">
                {globalData.length > 0 ? globalData.map(e=>{
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
                            </div>
                        )
                    }) : <p className = "nopost">No One Has Posted Yet</p>
                }
            </div>
        </section>
    )
            }
}
export default Global;
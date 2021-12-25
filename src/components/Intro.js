import {Link} from "react-router-dom"
import "./Intro.css"
const Intro = ()=>{
    return (
        <div className="intro">
        <h1>Interact</h1>
            <Link to = "/login">
                <button>
                    Login
                </button>
            </Link>
        </div>
    )
}
export default Intro;
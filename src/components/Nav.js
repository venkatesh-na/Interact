import {Link} from "react-router-dom"
const Nav = ()=>{
    return (
        <ul>
            <li><Link to = "/">Login</Link></li>
            <li><Link to = "/Register">Register</Link></li>
        </ul>
    )
}
export default Nav;
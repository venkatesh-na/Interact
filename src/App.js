import {HashRouter as Router,Routes,Route} from "react-router-dom"
import './App.css';
import Intro from "./components/Intro";
import Login from "./components/Login";
import Register from "./components/Register"
import User from "./components/User";
import UpdatePost from "./components/UpdatePost";
import Global from "./components/Global";
import AddPost from "./components/AddPost";
//element = {<Component/>}
//Routes as Switch
function App() {
  return (
      <main className = "App">
        <Router>
          <Routes>
            <Route path = "/" element = {<Intro/>}/>
            <Route path = "/Login" element = {<Login/>}/>
            <Route path = "/Register" element = {<Register/>}/>
            <Route path = "/user/:email/:password" element = {<User/>}/>
            <Route path = "/addPost/:name/:id" element = {<AddPost/>}/>
            <Route path = "/updatePost/:userId/:id" element = {<UpdatePost/>}/>
            <Route path = "/global/:id" element = {<Global/>}/>
          </Routes>
        </Router>
      </main>
  );
}

export default App;

import React, { useEffect } from "react";
import './Navbar.scss'
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [active,setActive] = useState(false)
    const [show,setShow] = useState(false)

    const isActive = ()=>{
        window.scrollY >0 ?setActive(true):setActive(false)
    }
    useEffect(()=>{
window.addEventListener("scroll", isActive)

return ()=>{
    window.removeEventListener("scroll", isActive)
}
    },[])
    const currentUser = {
        id:1,
        userName:'Dixit03',
        isServiceProvider:true
    }
  return (
    <>
   
    <div className={active ? "navbar active":"navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">

          <span className="text">ProSkill</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
           { !currentUser?.isServiceProvider && <span className="white-bold-underline">Pro Apply</span>}
            <span>Help</span>
            <span>Sign In</span>
           {!currentUser && <button>Register</button>}
           {currentUser && (
            <div className="user" onClick={()=>setShow(!show)}>
                <img src="https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600" alt=""/>
                <span>{currentUser?.userName}</span>
               {show &&  <div className="options">
                    {currentUser?.isServiceProvider && <>
                    <span>Services</span>
                    <span>Add New Service</span>
                    </>}
                    <span>Orders</span>
                    <span>Messages</span>
                    <span>Logout</span>
                </div>}
            </div>
           )}
        </div>
      </div>
   {active && (<>
   <hr />
    <div className="menu">
        <span>Test</span>
        <span>Test2</span>
    </div>
    </> )}
    </div>
  
    </>

  );
};


export default Navbar;

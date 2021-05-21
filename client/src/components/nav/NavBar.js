import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Logo from "./rare.jpeg"
import { UserContext } from '../users/UserProvider'

export const NavBar = () => {
    const history = useHistory()
    const { getAllUsers, users } = useContext(UserContext)
    const currentUserId = parseInt(localStorage.getItem('rare_user_id'))
    const [isStaff, setIsStaff] =useState(false)
    const [userNow, setUserNow] = useState({})

    useEffect(() => {
        getAllUsers() 
    }, [])
    
    useEffect(() => {
        if(users.length){
            const currentUser= users.find(user => user.id === parseInt(currentUserId))
          setUserNow(currentUser)
        }    
    }, [users])
    
    useEffect(() => {
        if(userNow.user){
          if(userNow.user.is_staff === true){
            setIsStaff(true)
        }   
        } 
         
    }, [userNow])


    
      
    //     // const isUser = userNow.user
        
             
    // console.log(currentUser)
    
    return (
        <ul className="navbar">
            {/* <li className="navbar__item">
                <img className="navbar__logo" src={Logo} />
            </li> */}
            <li className="navbar__item">
                <h1 className="navbar__title">Rare.</h1>
            </li>
            <li className="navbar__item link">
                <Link className="navbar__link" to="/posts">Posts</Link>
            </li>
            <li className="navbar__item link">
                <Link className="navbar__link" to="/posts/create">Add Post</Link>
            </li>
            <li className="navbar__item link">
                <Link className="navbar__link" to="/myposts">My Posts</Link>
            </li>
            {isStaff ? <li className="navbar__item link">
                <Link className="navbar__link" to="/tags">Tag Management</Link>
            </li> : <></>}
            
            <li className="navbar__item link">
                <Link className="navbar__link" to="/categories">Categories</Link>
            </li>
            <li className="navbar__item link">
                <Link className="navbar__link" to="/users">Users</Link>
            </li>
            {
                (localStorage.getItem("rare_user_id") !== null) ?
                    <li className="navbar__item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("rare_user_id")
                                localStorage.removeItem("rare_user_token")
                                history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    </li> :
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        </>
            }
        </ul>
    )
}

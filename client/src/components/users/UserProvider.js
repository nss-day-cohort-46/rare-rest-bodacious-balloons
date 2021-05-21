import React, { createContext, useEffect, useState } from 'react'

export const UserContext = createContext();

export const UserProvider = props => {
    const [users, setUsers] = useState([])
    const [userNow, setUserNow] = useState({})
    const currentUserId = parseInt(localStorage.getItem('rare_user_id'))

    useEffect(() => {
        if(users.length){
            const currentUser= users.find(user => user.id === parseInt(currentUserId))
          setUserNow(currentUser)
        }    
    }, [users])

    const getAllUsers = () => {
        return fetch(`http://localhost:8000/users`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
            }
        })
            .then(res => res.json())
            .then(setUsers)
    }

    const getUserById = (id) => {
        return fetch(`http://localhost:8000/users/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
            }
        })
            .then(res => res.json())
    }

    const updateAdminStatus = user => {
        return fetch(`http://localhost:8000/users/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
          },
          body: JSON.stringify(user)
        })
          .then(getAllUsers)
      }

    return (
        <UserContext.Provider value={{
            users, getAllUsers, getUserById, updateAdminStatus, userNow
        }}>
            {props.children}
        </UserContext.Provider>
    )
}


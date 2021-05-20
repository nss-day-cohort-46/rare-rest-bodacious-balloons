import React, { createContext, useState } from 'react'

export const UserContext = createContext();

export const UserProvider = props => {
    const [users, setUsers] = useState([])

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
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        })
          .then(getUserById)
      }

    return (
        <UserContext.Provider value={{
            users, getAllUsers, getUserById, updateAdminStatus
        }}>
            {props.children}
        </UserContext.Provider>
    )
}


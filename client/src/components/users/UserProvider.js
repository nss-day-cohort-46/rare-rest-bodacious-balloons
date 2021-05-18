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
            .then(res => { res.map(users => {
                return {
                    firstName: users.first_name,
                    lastName: users.last_name,
                    userName: users.username
                }
            })})
            .then(setUsers())
    }

    const getUserById = (id) => {
        return fetch(`http://localhost:8000/users/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
            }
        })
            .then(res => res.json())
    }

    return (
        <UserContext.Provider value={{
            users, getAllUsers, getUserById
        }}>
            {props.children}
        </UserContext.Provider>
    )
}


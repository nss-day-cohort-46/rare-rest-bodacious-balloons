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

    const uploadUserImage = (image, userId) => {
        return fetch(`http://localhost:8000/users/${userId}/image`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(image)
        })
    }

    return (
        <UserContext.Provider value={{
            users, getAllUsers, getUserById, uploadUserImage
        }}>
            {props.children}
        </UserContext.Provider>
    )
}


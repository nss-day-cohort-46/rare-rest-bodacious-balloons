import React, { createContext, useState } from 'react'

export const CategoryContext = createContext()

export const CategoryProvider = props => {
    const [categories, setCategories] = useState([])

    const getCategories = () => {
        return fetch(`http://localhost:8000/categories`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
            }
        })
            .then(res => res.json())
            .then(setCategories)
    }

    const addCategory = (newCategory) => {
        return fetch(`http://localhost:8000/categories`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem('rare_user_token')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCategory)
        })
    }

    const editCategory = (newCategory) => {
        return fetch(`http://localhost:8088/categories/${newCategory.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCategory)
        })
            .then(getCategories)
    }

    const deleteCategory = id => {
        return fetch(`http://localhost:8088/categories/${id}`, {
            method: "DELETE"
        })
            .then(getCategories)
    }

    return (
        <CategoryContext.Provider value={{
            categories, getCategories, addCategory, deleteCategory, editCategory
        }}>
            {props.children}
        </CategoryContext.Provider>
    )
}


import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import "./CategoryForm.css"
import { CategoryContext } from './CategoryProvider'

export const CategoryForm = () => {
    const { addCategory } = useContext(CategoryContext)
    const [category, setCategory] = useState({})
    const history = useHistory()

    const handleInputChange = e => {
        const newCategory = {...category}
        newCategory[e.target.id] = e.target.value
        setCategory(newCategory)
    }

    const handleSubmit = () => {
        addCategory(category)
        history.push("/categories")
    }

    return (
        <section className="category__form">
            <h2>Create A New Category</h2>
            <input type="text" 
                placeholder="Enter a new category"
                id="label"
                onChange={handleInputChange}></input>
            <button onClick={handleSubmit}>Submit</button>
        </section>
    )
}
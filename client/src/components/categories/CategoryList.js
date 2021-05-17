import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { CategoryContext } from './CategoryProvider'
import "./CategoryList.css"

export const CategoryList = props => {
    const {categories, getCategories, deleteCategory, editCategory } = useContext(CategoryContext)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState({})
    const [editingCategory, setEditingCategory] = useState("")
    const history = useHistory()
    

    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        setEditingCategory(selectedCategory.label)
    }, [selectedCategory])

    const handleAdd = e => {
        history.push("/categories/create")
    }

    const openEditModal = e => {
        const id = parseInt(e.target.id.split("--")[1])
        setSelectedCategory(categories.find(cat => cat.id === id))
        setEditModalOpen(true)
    }

    const handleEditConfirm = e => {
        const editedCategory = {...selectedCategory}
        editedCategory.label = editingCategory
        editCategory(editedCategory)
        setEditModalOpen(false)
    }

    const confirmDelete = e => {
        const id = parseInt(e.target.id.split("--")[1])
        setSelectedCategory(categories.find(cat => cat.id === id))
        setDeleteModalOpen(true)
        
    }

    const handleDelete = e => {
        const id = selectedCategory.id
        deleteCategory(id)
        setDeleteModalOpen(false)
    }

    return (
        <section className="categories">
            <h2>Categories</h2>
            <button onClick={handleAdd}>Add A New Category</button>
            {
                categories.map(cat => {
                    return (
                        <section className="category" key={cat.id}>
                            <h3>{cat.label}</h3>
                            <button className="editButton" id={"category--" + cat.id} onClick={openEditModal}>e</button>
                            <button className="deleteButton" id={"category--" + cat.id} onClick={confirmDelete}>X</button>
                        </section>
                    )
                })
            }
            <dialog open={deleteModalOpen}>Are you sure you want to delete {selectedCategory.label}?
                <button className="confirmDeleteButton" onClick={handleDelete}>Yes</button>
                <button className="closeModalButton" onClick={() => setDeleteModalOpen(false)}>X</button>
            </dialog>
            <dialog open={editModalOpen}>Edit Category
                <input type="text" value={editingCategory} onChange={e => setEditingCategory(e.target.value)}></input>
                <button className="confirmEditButton" onClick={handleEditConfirm}>Confirm</button>
                <button className="closeModalButton" onClick={() => setEditModalOpen(false)}>X</button>
            </dialog>
        </section>
    )
}
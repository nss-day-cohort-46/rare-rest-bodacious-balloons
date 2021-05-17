import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { TagContext } from './TagProvider'

export const CreateTag= () => {
    const {addTag, updateTag, getTagById} = useContext(TagContext)
    const history = useHistory()
    const {tagId} = useParams()

   
    
    const [tag, setTag] = useState ({
        label: ""
    })

     useEffect(() =>{
         if(tagId){
            getTagById(tagId)
            .then(setTag)
        }
        
    },[])
    
    
    const handleChange = (event) => {
        const newTag = {...tag}
        newTag[event.target.id] = event.target.value
        setTag(newTag)
    }

    

    const saveTag = () => {
        if(tag.label === ""){
            window.alert("Please fill all input fields!")
        }
        else {
            if(tagId){
                updateTag({
                    id: tag.id,
                    label: tag.label
                })
                .then(() => history.push("/tags"))
            }
            else {
                 addTag(tag)
                 .then(() => history.push("/tags"))
            }   
        }  
    }

    // console.log(tagById)

    return (
        <>
            <h2>{tagId ? "Edit Tag": "Create a New Tag"  }</h2>
            <form className="tag_form">
                <label htmlFor="label">Tag Name: </label>
                <input type="text" id="label" value={tag.label} onChange={handleChange} ></input>
                <button className="save_tag" onClick={event => {
                    event.preventDefault()
                    saveTag()
                }}>{tagId ? "Save Tag" : "Add Tag"}</button>

            </form>
        </>
    )

}
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { PostContext } from '../posts/PostProvider'
import { TagContext } from './TagProvider'

export const PostTags = () => {
    const {tags, getTags, addPostTags} = useContext(TagContext)
    const {getPostById, postTagDelete} = useContext(PostContext)
    const [postById, setPostById]=useState({})
   

    useEffect(() => {
        getTags() 
        .then(getPostById(postId)
            .then(post => {
                setPostById(post)
        })     
    )}, [])

    const {postId} = useParams()

    const history = useHistory()
    
    const [savePostTags, setSavePostTags] = useState ([
    ])
    
    //handles tag checkbox event change and stores each check to state as an array
    const handleTagChange = (event) => {
        if (event.target.name.includes('tag')) {
            const newTag = [...savePostTags]
            if (event.target.checked) {
                newTag.push(
                    {postId: parseInt(postId),
                    tagId: newTag[event.target.id] = parseInt(event.target.value) 
                })
            } 
            //remove object from array if unchecked
            else {
                const index = newTag.indexOf(parseInt(event.target.value))
                newTag.splice(index, 1)
            }
            setSavePostTags(newTag)      
        }
        
    }

    const saveTagPost =()=> {
        savePostTags.map(pTag => addPostTags(pTag))
        history.push(`/posts/detail/${postId}`)
    }

    const handleTagRemoval =(postTagId)=> {
        postTagDelete(postTagId)
            .then(() => getPostById(postId))
                .then(post => {
                    setPostById(post)
            })     
        
    }



    console.log(postById)
    return (
        <>
            <h2>Choose from the following tags for {postById.title}</h2>
            <section className="tag_select">
                <div>{tags.map(t => <div key ={t.id}><input type="checkbox" name ={`tag`} id="tagId" onChange={handleTagChange} value={t.id}></input><label htmlFor="tagId">{t.label}</label></div>)}</div>
                <button className="save_postTag" onClick ={event => {
                    event.preventDefault()
                    saveTagPost()
                }}>Save Tags to Post</button>
            </section>
            <section className="relatedTags">
                <h2>Tags linked to {postById.title} </h2>
                {postById.postTags?.map((ptag, i) => <div key={i}>{ptag.tag.label} <button className="remove_tag" onClick={handleTagRemoval.bind(ptag.id, ptag.id)}>x</button>
                </div>)}</section>
        </>
    )
}
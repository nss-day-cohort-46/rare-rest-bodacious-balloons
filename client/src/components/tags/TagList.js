import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { TagContext } from './TagProvider'
import '../posts/PostCard.css'
export const TagList= () => {
    const {tags, getTags, tagDelete} = useContext(TagContext)

    useEffect(() => {
        getTags()      
    }, [])

    const history = useHistory()

    const deleteTag = (id) => {
        tagDelete(id)
    }
    return (
        <>
            <div className='tags'>
                <h2 className="tag_title">Tags</h2>
                <button className="add_tag" onClick={() => history.push("tags/create")}>Create Tag</button>
                <div>
                    <h3>Created Tags</h3>
                    <div className="tag_list">{tags.map(t =><div key={t.id}>{t.label} <button onClick={deleteTag.bind(t.id, t.id)}>x</button> <button onClick={() => history.push(`/tags/edit/${t.id}`)}>edit</button></div>)}</div>
                </div>
            </div>
        </>
    )
}
import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { CategoryContext } from "../categories/CategoryProvider";

import { PostContext } from "./PostProvider";
import './PostCard.css'
export const PostForm = () => {
    const { addPost, getPostById, updatePost, deletePost } = useContext(PostContext)
    const { categories, getCategories } = useContext(CategoryContext)

//create empty state var to hold form values
    const [post, setPost] = useState({
        userId: localStorage.getItem("rare_user_id"),
        title: "",
        content: "",
        imageUrl: "",
        categoryId: 0,
        publicationDate: ""
        // approved: ""
    })

    //create state var to stop quick clicks on edits
    const [isLoading, setIsLoading] = useState(true);

    const [validMsg, setValidMsg] = useState("");
    const { postId } = useParams();
    const history = useHistory();

    const handleCheckChange = (event) => {
        // event.preventDefault()

        const newPost = { ...post }

        if (post.available===true) {
        newPost[event.target.id] = false
        }else{
        newPost[event.target.id] = true
        }

        setPost(newPost)
    }

    //update state on every field change
    const handleControlledInputChange = (event) => {
        const newPost = { ...post }
        newPost[event.target.id] = event.target.value
        setPost(newPost)
    }

    const handleDeletePost = (event) => {
    if(window.confirm("Are you sure?")===true){
// debugger
        deletePost(event.target.id)
        .then(() => {
        history.push("/posts")
        })
    }
    }

    const handleSavePost = () => {
        let validForm=false
        let validMsgString=""

        if (post.title.length === 0) {
            validMsgString = "Title required."
        }else{
            if (post.content.length === 0) {
                validMsgString += "Content required."
            }
        else
            validForm=true
        }
        
    if (validForm===false) {
        window.alert(validMsgString)
    } else {
        //disable the button - no extra clicks
        setIsLoading(true);

        //if params has postId then UPDATE else ADD
        if (postId){
        // PUT - update
        updatePost({
            id: post.id,
            user_id: post.userId,
            title: post.title,
            content: post.content,
            image_url: post.imageUrl,
            category_id: post.categoryId
        })
        .then(() => history.push(`/posts/detail/${post.id}`))
        }else {
        //POST - add
        
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        let newdate = year + "/" + month + "/" + day;
        
        // debugger
        addPost({
            user_id: post.userId,
            title: post.title,
            content: post.content,
            image_url: post.imageUrl,
            category_id: post.categoryId,
            publication_date: newdate
            // approved: post.approved
        })
        .then(setPost({  //reset state obj as blank to zero out add form
            title: "",
            content: "",
            image_url: "",
            category_id: 0
            // available: true
        }))
        .then(setIsLoading(false))
        .then(() => history.push("/posts"))
        }
    }
    }

    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        if (postId) {
            getPostById(postId)
            .then(post => {
                setPost(post)
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
    },[postId])

    return (
    <div>
    <form className="postForm ">
        <h2 className="postForm__title">{postId ? "Edit Post" : "Add Post"}</h2>

        {validMsg.length > 0 ? "" : validMsg}

        <fieldset>
        <div className="form-group">
            <label htmlFor="Title">Title:</label>
            <input type="text" id="title" required autoFocus className="form-control"
            placeholder="Title"
            onChange={handleControlledInputChange}
            value={post.title}/>
        </div>
        </fieldset>

        <fieldset>
        <div className="form-group">
            <label htmlFor="content">Content: </label>
            <input type="text" id="content" required className="form-control"
            placeholder="Content"
            onChange={handleControlledInputChange}
            value={post.content}/>
        </div>
        </fieldset>

        <fieldset>
        <div className="form-group">
            <label htmlFor="image_url">Image: </label>
            <input type="text" id="imageUrl" required className="form-control"
            placeholder="Image URL"
            onChange={handleControlledInputChange}
            value={post.imageUrl}/>
        </div>
        </fieldset>

        <fieldset>
            <div className="form-group">
            <label htmlFor="categoryId">Category: </label>
            <select value={post.categoryId} id="categoryId" className="form-control" 
            onChange={handleControlledInputChange}>
                <option value="0">Select a Category</option>
                {categories.map(l => (
                <option key={l.id} value={l.id}>
                    {l.label}
                </option>
                ))}
            </select>
            </div>
        </fieldset>

        {/* <fieldset>
        <div className="form-group">
        
        <label htmlFor="approved">Approved:&nbsp;</label>

        <input 
            checked={post.approved}
            onChange={handleCheckChange}
            id="approved"
            type="checkbox"
        />
        
        </div>
        </fieldset> */}

        <button className=""
        type="submit"
        disabled={isLoading}
        onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleSavePost()
        }}>

        {/* show ADD or SAVE if adding or editing  */}
        {postId ? " Save Post " : " Add Post "}

        </button>
        <div className="divider"/>
        {/* only show delete button if editing */}
        {postId ?
        <button type="button" id={postId} className="" onClick={handleDeletePost}>
        Delete Post
        </button>
        :
        ""
        }
    </form>

</div>
)
}
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { PostTags } from '../tags/PostTags';
import { PostContext } from './PostProvider'
import { Link } from 'react-router-dom'
import { ReactionList } from '../reactions/ReactionList'
import { ReactionContext } from '../reactions/ReactionProvider';
import './PostDetail.css'

export const PostDetail = () => {
    const { getPostById, updatePost } = useContext(PostContext)
    const { reactions, getReactions, postReact, getPostReactions } = useContext(ReactionContext)
    const [thisPostsReactions, setThisPostsReactions] = useState([])
    const [postDetail, setPostDetail] = useState({})
    const userId = parseInt(localStorage.getItem(`rare_user_id`))
    const { postId } = useParams();
    const history = useHistory();

    useEffect(() => {
        getPostReactions()
        getReactions()
        getPostById(postId)
            .then((res) => {
                setPostDetail(res)
            })
    }, [postId])

    useEffect(() => {
        setThisPostsReactions(postReact.filter(pR => pR.postId === parseInt(postId)))
    }, [postReact])

    const [post, setPost] = useState({
        
    })

    const handleCheckChange = (event) => {
        // event.preventDefault()

        event.target.checked ?
        updatePost({
            id : parseInt(postId),
            user: postDetail.user.id,
            title: postDetail.title,
            content: postDetail.content,
            image_url: postDetail.image_url,
            category_id: postDetail.category.id,
            publication_date: postDetail.publication_date,
            approved: true
        }) : updatePost({
            id : parseInt(postId),
            user: postDetail.user.id,
            title: postDetail.title,
            content: postDetail.content,
            image_url: postDetail.image_url,
            category_id: postDetail.category.id,
            publication_date: postDetail.publication_date,
            approved: false})
    }


    return (
        <>
            
            <fieldset>
            {postDetail.approved ? <></> :
            <div className="form-group">
            
            <label htmlFor="approved">Approve this post: </label>

            <input 
                checked={post.approved}
                onChange={handleCheckChange}
                id="approved"
                type="checkbox"
            />
            
            </div>}
            </fieldset>
            <article className="post_detail">
                <h1 className="title">{postDetail.title}</h1>
                <Link to={`/posts/detail/edit/${postDetail.id}`}>EDIT</Link>
                <h2 className="author">By: {postDetail.user?.user.first_name} {postDetail.user?.user.last_name}</h2>
                <h2 className="date">{postDetail.publication_date}</h2>
                <img src={postDetail.image_url} alt="article_image" width="25%" />
                <section className="content">{postDetail.content}</section>
            </article>

            <div className="reactionCounts">
                {
                    reactions.map(react => {
                        const thisPostReaction = thisPostsReactions.filter(pr => react.id === pr.reactionId)
                        return <section className="reactionCounts">
                            <img src={react.imageUrl} />
                            <p>{thisPostReaction.length}</p>
                        </section>
                    })
                }
            </div>

            <div className="manage_tags">
                {userId === postDetail.user?.user.id ?
                    <section>
                        <div>Tags: {postDetail.tags.map(tag => tag.label).join(", ")}</div>
                        <button className="post_tags" onClick={() => history.push(`/posts/detail/${postId}/tags`)}>Manage Tags</button></section>
                    : <></>}
            </div>

            <div>
                <button className="reaction_btn" onClick={() => history.push(`/posts/details/${postId}/reactions`)}>Add your reaction</button>
            </div>

        </>
    )

}

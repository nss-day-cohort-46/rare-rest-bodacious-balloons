import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { CategoryContext } from '../categories/CategoryProvider'
import { SubscriptionContext } from '../subscriptions/SubscriptionProvider'
import { UserContext } from '../users/UserProvider'
import { PostCard } from './PostCard'
import { PostContext } from './PostProvider'
import './PostCard.css'

export const AdminPostList = props => {

    const { posts, getPosts, searchTerms } = useContext(PostContext)
    const { subscriptions, getSubscriptions } = useContext(SubscriptionContext)
    const [userPosts, setUserPosts] = useState([])
    const [subscribedPosts, setSubscribedPosts] = useState([])
    const [categoryIdValue, setCategoryIdValue] = useState(0)
    const [userIdValue, setUserIdValue] = useState(0)
    const userId = parseInt(localStorage.getItem(`rare_user_id`))
    const history = useHistory()
    const [filteredPosts, setFiltered] = useState([])
    const [isStaff, setIsStaff] =useState(false)

    //=========================to be replaced with category fetch======================//
    const { categories, getCategories } = useContext(CategoryContext)
    const { users, getAllUsers, userNow } = useContext(UserContext)
    //=================================================================================//

    useEffect(() => {
        getCategories()
        getSubscriptions()
            .then(getAllUsers())
            .then(getPosts())
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            const subset = posts.filter(post => post.title.toLowerCase().includes(searchTerms.toLowerCase()))
            setUserPosts(subset)
        } else {
            // If the search field is blank, display all animals
            setUserPosts(posts)
        }
    }, [searchTerms, posts])

    useEffect(() => {
        // sort posts by date
        const sortedPosts = posts.sort((a, b) => new Date(b.publication_date) - new Date(a.publication_date))

        // check and see if this is "my posts" or just all posts
        if (history.location.pathname.includes("/my")) {
            const thisUsersPosts = sortedPosts.filter(post => parseInt(post.user.user.id) === userId)
            setUserPosts(thisUsersPosts)
        } else {
            setUserPosts(sortedPosts)
        }
    }, [posts])

    // Filter posts to only show who the user has subscribed to
    useEffect(() => {
        const userSubscribedPosts = []
        const userSubscriptions = subscriptions.filter(sub => sub.follower.id === userId)
        const userAuthors = userSubscriptions.map(sub => sub.author.id)
        userAuthors.push(userId)
        userPosts.forEach(post => {
            if (userAuthors.includes(post.user.user.id)) userSubscribedPosts.push(post)
        })
        setSubscribedPosts(userSubscribedPosts)
    }, [userPosts, subscriptions])

    const handleControlledInputChange = (event) => {
        const sortedPostsCat = posts.sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate))
        let sortVar = parseInt(event.target.value)
        let sortVarId = event.target.id
        // console.log(sortVarId);

        if (sortVarId === "userId") {

            //reset cat dropdown, set user dropdown to selected value
            setCategoryIdValue(0)
            setUserIdValue(sortVar)

            if (sortVar === 0) {
                // console.log("Not sorted");
                setUserPosts(sortedPostsCat)
            } else {
                // console.log("Sorted");
                const thisUsersPosts = sortedPostsCat.filter(post => post.user.id === sortVar)
                setUserPosts(thisUsersPosts)
            }
        }

        if (sortVarId === "categoryId") {

            //reset user dropdown, set cat dropdown to selected value
            setUserIdValue(0)
            setCategoryIdValue(sortVar)

            if (sortVar === 0) {
                // console.log("Not sorted");
                setUserPosts(sortedPostsCat)
            } else {
                // console.log("Sorted");
                const thisUsersPosts = sortedPostsCat.filter(post => post.category.id === sortVar)
                setUserPosts(thisUsersPosts)
            }
        }
    }
    
    useEffect(() => {
        if(userNow.user){
          if(userNow.user.is_staff === true){
            setIsStaff(true)
        }   
        } 
         
    }, [userNow])

    return (
        <section className="posts">
            <h2>{history.location.pathname.includes("/my") ? "My Posts" : "My Feed"}</h2>

            {!history.location.pathname.includes("/my") && <section>
                <fieldset>
                    <div className="form-group">
                        {/* <label htmlFor="categoryId">Category: </label> */}
                        <select value={userIdValue} id="userId" className="form-control"
                            onChange={handleControlledInputChange}>
                            <option value="0">All Users</option>
                            {users.map(l => (
                                <option key={"user " + l.user.id} value={l.user.id}>
                                    {l.user.first_name} {l.user.last_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>

                <div>OR</div>
            </section>
            }

            <fieldset>
                <div className="form-group">
                    {/* <label htmlFor="categoryId">Category: </label> */}
                    <select value={categoryIdValue} id="categoryId" className="form-control"
                        onChange={handleControlledInputChange}>
                        <option value="0">All Categories</option>
                        {categories.map(l => (
                            <option key={"category" + l.id} value={l.id}>
                                {l.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>




            {
                isStaff ? 
                subscribedPosts.map(post => <PostCard
                    key={post.id}
                    post={post}
                    category={categories.find(cat => cat.id === post.category.id)}
                    user={users.find(user => user.user.id === post.user.user.id)}
                />) : <></>
            }

        </section>
    )
}
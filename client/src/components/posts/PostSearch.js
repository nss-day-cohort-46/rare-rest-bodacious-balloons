import React, { useContext } from "react"
import { PostContext } from "./PostProvider"
import "./PostCard.css"

export const PostSearch = () => {
    
const { setSearchTerms } = useContext(PostContext)

return (
    <>
    Post search:
    <input type="text"
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search for an post... " />
    </>
)
}
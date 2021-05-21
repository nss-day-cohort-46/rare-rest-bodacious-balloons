import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { UserContext } from './UserProvider'
import emptyAvatar from '../../images/emptyAvatar.png'
import './UserDetail.css'
import { SubscriptionContext } from '../subscriptions/SubscriptionProvider'

export const UserDetail = () => {
    const { userId } = useParams()
    const { subscriptions, getSubscriptions } = useContext(SubscriptionContext)
    const [selectedUser, setSelectedUser] = useState({})
    const { getUserById, uploadUserImage } = useContext(UserContext)
    const currentUserId = parseInt(localStorage.getItem('rare_user_id'))
    const isCurrentUser = currentUserId === parseInt(userId)
    const [currentSubCount, setCurrentSubCount] = useState(0)
    const [imageB64, setImageB64] = useState("")

    useEffect(() => {
        getSubscriptions()
        getUserById(userId).then(setSelectedUser)
    }, [])

    useEffect(() => {
        const userSubs = subscriptions.filter(sub => currentUserId === sub.author_id).length
        setCurrentSubCount(userSubs)
    }, [subscriptions])

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createImageString = e => {
        getBase64(e.target.files[0], (base64ImageString) => {
            setImageB64(base64ImageString);
        })
    }

    const handleUpload = e => {
        e.preventDefault()
        const image = {image: imageB64}
        uploadUserImage(image, userId)
            .then( () => getUserById(userId).then(setSelectedUser))
    }


    return (
        <section className="userDetail">
            <h1 className="userDetail--h1">{selectedUser.user?.username}</h1>
            <div className="userDetail__details">
                <img className="avatar" src={selectedUser.picture ? selectedUser.picture[0]?.image : emptyAvatar}></img>
                <div className="userDetail__details--right">
                    <p>{selectedUser.user?.first_name} {selectedUser.user?.last_name}</p>
                    <p>{selectedUser.user?.email}</p>
                    <p>joined on {selectedUser.created_on}</p>
                    {isCurrentUser && <>
                        <p>Total Subscribers: {currentSubCount}</p>
                        <div className="imageUpload">
                            <input type="file" id="user_image" onChange={createImageString} />
                            <input type="hidden" name="user_id" value={selectedUser.user?.id} />
                            <button onClick={handleUpload}>Upload</button>
                        </div>
                    </>
                    }

                </div>
            </div>
            <p className="userDetail--userType">{selectedUser.user?.is_staff ? "admin" : "regular user"}</p>
        </section>
    )
}
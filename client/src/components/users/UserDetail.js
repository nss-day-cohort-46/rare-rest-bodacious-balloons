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
    const { getUserById } = useContext(UserContext)
    const currentUserId = parseInt(localStorage.getItem('rare_user_id'))
    const isCurrentUser = currentUserId === parseInt(userId)
    const [currentSubCount, setCurrentSubCount] = useState(0)

    useEffect(() => {
        getSubscriptions()
        getUserById(userId).then(setSelectedUser)
    }, [])

    useEffect(() => {
        const userSubs = subscriptions.filter(sub => currentUserId === sub.author_id).length
        setCurrentSubCount(userSubs)
    }, [subscriptions])

    return (
        <section className="userDetail">
            <h1 className="userDetail--h1">{selectedUser.user?.username}</h1>
            <div className="userDetail__details">
                <img className="avatar" src={emptyAvatar}></img>
                <div className="userDetail__details--right">
                    <p>{selectedUser.user?.first_name} {selectedUser.user?.last_name}</p>
                    <p>{selectedUser.user?.email}</p>
                    <p>joined on {selectedUser.created_on}</p>
                    { isCurrentUser &&
                        <p>Total Subscribers: {currentSubCount}</p>
                    }

                </div>
            </div>
            <p className="userDetail--userType">{selectedUser.user?.is_staff ? "admin" : "regular user"}</p>
        </section>
    )
}
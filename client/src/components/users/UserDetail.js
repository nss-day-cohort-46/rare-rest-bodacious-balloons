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
        const userSubs = subscriptions.filter(sub => currentUserId === sub.authorId).length
        setCurrentSubCount(userSubs)
    }, [subscriptions])

    return (
        <section className="userDetail">
            <h1 className="userDetail--h1">{selectedUser.userName}</h1>
            <div className="userDetail__details">
                <img className="avatar" src={emptyAvatar}></img>
                <div className="userDetail__details--right">
                    <p>{selectedUser.firstName} {selectedUser.lastName}</p>
                    <p>{selectedUser.email}</p>
                    <p>joined on {selectedUser.createdOn}</p>
                    { isCurrentUser &&
                        <p>Total Subscribers: {currentSubCount}</p>
                    }

                </div>
            </div>
            <p className="userDetail--userType">{selectedUser.isStaff ? "admin" : "regular user"}</p>
        </section>
    )
}
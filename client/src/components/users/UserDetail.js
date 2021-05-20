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
    const { getUserById, getAllUsers, users, updateAdminStatus } = useContext(UserContext)
    const currentUserId = parseInt(localStorage.getItem('rare_user_id'))
    const isCurrentUser = currentUserId === parseInt(userId)
    const [currentSubCount, setCurrentSubCount] = useState(0)
    const [admin, setAdmin] = useState({})

    useEffect(() => {
        getSubscriptions()
        getAllUsers()
        getUserById(userId).then(setSelectedUser)
    }, [])

    useEffect(() => {
        const userSubs = subscriptions.filter(sub => currentUserId === sub.author_id).length
        setCurrentSubCount(userSubs)
    }, [subscriptions])

    // debugger
    const currentUser= users.find(user => user.user.id === parseInt(currentUserId))

    const handleAdmin = (event) => {
        if(event.target.checked){
            const admin = {
                id: selectedUser.user.id,
                is_staff: true
            }
            setAdmin(admin)
        }
        if(event.target.checked === false){
            const admin = {
                id: selectedUser.user.id,
                is_staff: false
            }
            setAdmin(admin)
            return event.target.checked ? event.target.unchecked : event.target.checked
        }
        
    }
    
    // console.log(selectedUser.user?.id)
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
            <div>{currentUser?.user.is_staff ? selectedUser.user?.is_staff ? <div></div>:
            <div><label htmlFor="admin">Admin Approve: </label><input type="checkbox" id="admin" onChange={handleAdmin}/></div> : 
            <div></div>}</div>
            <div>{currentUser?.user.is_staff ? selectedUser.user?.is_staff ?<div><label htmlFor="admin">Admin: </label><input type="checkbox" id="admin" checked onChange={handleAdmin}/></div> :
             <div></div>: 
            <div></div>}</div>
            <p className="userDetail--userType">{selectedUser.user?.is_staff ? "admin" : "regular user"}</p>
        </section>
    )
}
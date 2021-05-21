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
    const [admin, setAdmin] = useState(false)

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
    let adminArray = []
    const adminUsers = users.map(staff =>{ if(staff.user.is_staff === true){adminArray.push(staff.user.is_staff)}})
    
    const currentUser= users.find(user => user.id === parseInt(currentUserId))
    console.log(adminArray)
    const handleAdmin = (event) => {
        if(event.target.checked){
            const admin = {
                id: selectedUser.id,
                is_staff: true
            }
            updateAdminStatus(admin)
        }
        if(event.target.checked === false){
            const admin = {
                id: selectedUser.id,
                is_staff: false
            }
            updateAdminStatus(admin)
            return event.target.checked ? event.target.unchecked : event.target.checked
        }
        
    }
    const handleRemoveAdmin = (event) => {
        if(adminArray.length > 1){
        if(event.target.checked){
            const admin = {
                id: selectedUser.id,
                is_staff: false
            }
            updateAdminStatus(admin)
        }
        if(event.target.checked === false){
            const admin = {
                id: selectedUser.id,
                is_staff: true
            }
            updateAdminStatus(admin)
            return event.target.checked ? event.target.unchecked : event.target.checked
        }
    }else {
        window.alert("Must have at least one approved admin user")
        setAdmin(event.target.checked)
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
            <div><label htmlFor="admin">Approve user as admin: </label><input type="checkbox" id="admin" onChange={handleAdmin}/></div> : 
            <div></div>}</div>
            <div>{currentUser ? selectedUser.user?.is_staff ?<div><label htmlFor="admin">Unauthorize user as admin: </label><input type="checkbox" id="admin" onChange={handleRemoveAdmin}/></div> :
             <div></div>: 
            <div></div>}</div>
            <p className="userDetail--userType">{selectedUser.user?.is_staff ? "admin" : "regular user"}</p>
        </section>
    )
}
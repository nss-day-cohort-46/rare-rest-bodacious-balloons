import React, { useContext, useEffect, useState } from 'react'
import { SubscriptionContext } from '../subscriptions/SubscriptionProvider'
import { UserCard } from './UserCard'
import { UserContext } from './UserProvider'
import './UserCard.css'
export const UserList = () => {
    const { users, getAllUsers } = useContext(UserContext)
    const { subscriptions, getSubscriptions } = useContext(SubscriptionContext)
    const [sortedUsers, setSortedUsers] = useState([])
    const userId = parseInt(localStorage.getItem(`rare_user_id`))

    useEffect(() => {
        getSubscriptions()
        getAllUsers()
    }, [])

    useEffect(() => {
        // Using the array.sort method to put these in alphabetical order
        // if interested in how this works, check out https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
        setSortedUsers(
            users.sort( (a,b) => {
                if (a.user.username.toUpperCase() < b.user.username.toUpperCase()) return -1
                else if (a.user.username.toUpperCase() > b.user.username.toUpperCase()) return 1
                return 0
            })
        )
    }, [users])

    return (
        <section className="users">
            <h1> Look at <a href="https://www.youtube.com/watch?v=NsLKQTh-Bqo">allllll those</a> Users</h1>
            {
                sortedUsers.map(user => {
                    // make sure we can't subscribe to ourselves
                    let isSelf = (user.user.id === userId)

                    // Find the subscription between the user and the author, if there is one
                    const userSubs = subscriptions.filter(sub => sub.follower.id === userId)
                    let subscription = userSubs.find(sub => sub.author.id === user.user.id)

                    return <UserCard key={user.user.id} user={user} subscription={subscription} isSelf={isSelf}/>
                })
            }
        </section>
    )
    

}
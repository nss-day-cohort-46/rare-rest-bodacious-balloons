import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { SubscriptionContext } from '../subscriptions/SubscriptionProvider'
import './UserCard.css'

export const UserCard = ({ user, subscription, isSelf }) => {
    const history = useHistory()
    const { addSubscription, deleteSubscription } = useContext(SubscriptionContext)
    const [cardSubscription, setCardSubscription] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const userId = parseInt(localStorage.getItem(`userId`))

    const handleSubscribe = e => {
        setIsLoading(true)
        const authorId = parseInt(e.target.id.split("--")[1])
        addSubscription(authorId)
            .then(setCardSubscription)
    }

    const handleUnsubscribe = e => {
        setIsLoading(true)
        const authorId = parseInt(e.target.id.split("--")[1])
        deleteSubscription(authorId)
            .then(() => {
                setCardSubscription({})
            })
    }

    useEffect(() => {
        if (subscription) setCardSubscription(subscription)
    }, [])

    useEffect(() => {
        setIsLoading(false)
    }, [cardSubscription])



    return (
        <article className="userCard">
            <h2 className="userNameLink" onClick={() => history.push(`/users/${user.user.id}`)}>{user.user.username}</h2>
            <h3>{user.user.first_name} {user.user.last_name}</h3>
            {/* ternary - if the user card belongs to the current user, return "this is you", if not, show buttons */}
            {/* ternary - if not subscrubed, show subscribe button, else show unsub button */}
            {isSelf ?
                <p className="thisIsYou">it's you!</p>
                :
                Object.keys(cardSubscription).length ?
                    <button onClick={handleUnsubscribe} disabled={isLoading} className="unsubscribeButton" id={"unsubscribeButton--" + user.user.id}>Unsubscribe</button>
                    :
                    <button onClick={handleSubscribe} disabled={isLoading} className="subscribeButton" id={"subscribeButton--" + user.user.id}>Subscribe</button>
            }
        </article>
    )
}
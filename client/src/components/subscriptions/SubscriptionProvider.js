import React, { createContext, useState } from 'react'

export const SubscriptionContext = createContext();

export const SubscriptionProvider = props => {
    const [subscriptions, setSubscriptions] = useState([])

    const getSubscriptions = () => {
        return fetch(`http://localhost:8000/subscriptions`,{
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
            }
        })
            .then(res => res.json())
            .then(setSubscriptions)
    }

    const addSubscription = id => {
        return fetch(`http://localhost:8000/users/${id}/subscribe`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_token")}`,
                "Content-Type": "application/json"
            }
            
        })
            .then(res => res.json())
    }

    const deleteSubscription = id => {
        return fetch(`http://localhost:8000/users/${id}/subscribe`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
            }
        })
            .then(getSubscriptions)
    }

    return (
        <SubscriptionContext.Provider value={{
            subscriptions, getSubscriptions, addSubscription, deleteSubscription
        }}>
            {props.children}
        </SubscriptionContext.Provider>
    )
}
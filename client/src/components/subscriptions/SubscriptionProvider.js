import React, { createContext, useState } from 'react'

export const SubscriptionContext = createContext();

export const SubscriptionProvider = props => {
    const [subscriptions, setSubscriptions] = useState([])

    const getSubscriptions = () => {
        return fetch(`http://localhost:8088/subscriptions`)
            .then(res => res.json())
            .then(setSubscriptions)
    }

    const addSubscription = subscription => {
        return fetch(`http://localhost:8088/subscriptions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(subscription)
        })
            .then(res => res.json())
    }

    const deleteSubscription = id => {
        return fetch(`http://localhost:8088/subscriptions/${id}`, {
            method: "DELETE"
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
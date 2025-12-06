import React from 'react'
import { AuthContext } from './Auth.context'

export const NotificationContext = React.createContext()

export function NotificationContextProvider(props) {

    const [loading, setLoading] = React.useState(true)
    const [notifications, setNotifications] = React.useState([])

    return (
        <NotificationContext.Provider value={{}}>
            {props.children}
        </NotificationContext.Provider>
    )

}
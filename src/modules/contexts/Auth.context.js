import { createContext, useState } from 'react'

const AuthContext = createContext()

const AuthContextProvider = props => {

    const [authState, setAuthState] = useState({
        isAuthenticated: localStorage.getItem('remember')
            ? localStorage.getItem('authedUser')
                ? localStorage.getItem('authedUser')
                : false
            : false
        ,
        user: localStorage.getItem('authedUser')
    })
    
    const handleAuth = (isAuth, user = null, remember = false) => {
        let loggedOut = false
        if (isAuth) {
            if (remember)
                localStorage.setItem('remember', true)
            localStorage.setItem('authedUser', user)
        }
        else {
            loggedOut = true
            localStorage.removeItem('authedUser')
            localStorage.removeItem('remember')
        }
        setAuthState({
            ...authState,
            user: user,
            isAuthenticated: isAuth,
            loggedOut: loggedOut
        })
    }
    return <AuthContext.Provider value={{ ...authState, handleAuth }}>
        {props.children}
    </AuthContext.Provider>
}

export {
    AuthContext,
    AuthContextProvider
}
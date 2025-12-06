import React from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop(){
    const {pathname} = useLocation()
    React.useEffect(() => (
        window.scrollTo({left: 0, top: 0, behavior: 'smooth'})
    ), [pathname])
    return null
}
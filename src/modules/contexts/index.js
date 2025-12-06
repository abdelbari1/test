import { ThemeContext, ThemeContextProvider } from './Theme.context'
import { AlertProvider } from '../components'
import { AuthContext, AuthContextProvider } from './Auth.context'
import { CartContext, CartContextProvider } from './Card.context'
import { WishlistContext, WishlistContextProvider } from './Wishlist.context'

function ContextProvider(props) {
    return (
        <ThemeContextProvider>
            <AlertProvider>
                <AuthContextProvider>
                    <CartContextProvider>
                        <WishlistContextProvider>
                            {props.children}
                        </WishlistContextProvider>
                    </CartContextProvider>
                </AuthContextProvider>
            </AlertProvider>
        </ThemeContextProvider>
    )
}

export {
    ThemeContext,
    ThemeContextProvider,
    ContextProvider,
    AuthContext,
    AuthContextProvider,
    CartContext,
    CartContextProvider,
    WishlistContext,
    WishlistContextProvider
}

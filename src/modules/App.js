import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import {
  LandingPage,
  GenderItems,
  ItemDetails,
  Login,
  Register,
  AddItem,
  ShoppingBag,
  LandingAdminPage,
  ItemsView,
  EditItem,
  SearchView,
  RentalItemsView,
  Wishlist,
  AddRentalItem,
  ItemsRentedView,
  Help,
  SoldItems,
  BookedItems
} from './views'
import { AuthContext } from './contexts'



function App() {

  const authContext = React.useContext(AuthContext)

  const ProtectedUserRoute = props => {
    const role = JSON.parse(authContext.user)
    return authContext.isAuthenticated && role.user_role === 'Client' ? <Outlet /> : <Navigate to='/login' />
  }
  const AuthRoute = props => {
    const role = JSON.parse(authContext.user)
    return authContext.isAuthenticated && role.user_role === 'Admin' ? <Outlet /> : <Navigate to='/login' />
  }

  return (
    <Router>
      <Routes>

        {/* --------------------------- LOGIN PAGES --------------------------- */}

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* --------------------------- ALL PAGES --------------------------- */}

        <Route path='/' element={<LandingPage />} />
        <Route path='/gender/:type' element={<GenderItems />} />
        <Route path='/item-details/:iid' element={<ItemDetails />} />
        <Route path='/search' element={<SearchView />} />
        <Route path='/help' element={<Help />} />
        <Route path='/rent-items' element={<ItemsRentedView />} />
        <Route path='/rent-item-details/:riid/:iid' element={<ItemDetails rented />} />

        {/* --------------------------- USER PAGES --------------------------- */}

        <Route path='/' element={<ProtectedUserRoute />}>
          <Route path='shopping-bag' element={<ShoppingBag />} />
          <Route path='wishlists' element={<Wishlist />} />
        </Route>

        {/* --------------------------- ADMIN PAGES --------------------------- */}

        <Route element={<AuthRoute />}>
          <Route path='/admin' element={<LandingAdminPage />} />
          <Route path='/admin/items' element={<ItemsView />} />
          <Route path='/admin/rental-items' element={<RentalItemsView />} />
          <Route path='/admin/add-item' element={<AddItem />} />
          <Route path='/admin/edit-item/:iid' element={<EditItem />} />
          <Route path='/admin/item-details/:iid' element={<ItemDetails admin />} />
          <Route path='/admin/add-rental-item/:gender' element={<AddRentalItem />} />
          <Route path='/admin/sold-items' element={<SoldItems />} />
          <Route path='/admin/booked-items' element={<BookedItems />} />
        </Route>

        {/* --------------------------- ENDING ROUTES --------------------------- */}

      </Routes>
    </Router>
  );
}

export default App;

import React, {useEffect} from 'react';
import {Switch, Route} from 'react-router-dom'

import {ToastContainer} from 'react-toastify'

//import {createStore} from 'redux'
//import {provider} from 'react-redux'
//import {composeWithDevTools} from 'redux-devtools-extension'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/Home'
import Header from './components/nav/Header'
import RegisterComplete from './pages/auth/RegisterComplete'
import History from './pages/user/History'
import Password from './pages/user/Password'
import Wishlist from './pages/user/Wishlist'
import UserRoute from './components/routes/UserRoute'
import AdminRoute from './components/routes/AdminRoute'
import CategoryCreate from './pages/admin/category/CategoryCreate'
import CategoryUpdate from './pages/admin/category/CategoryUpdate'
import SubCreate from './pages/admin/sub/SubCreate'
//import CategoryUpdate from './pages/admin/category/CategoryUpdate'
import {auth} from './firebase'
import {useDispatch} from 'react-redux'
import ForgotPassword from "./pages/auth/ForgotPassword"
import {currentUser} from "./functions/auth"
import AdminDashboard from "./pages/admin/AdminDashboard"
import SubUpdate from './pages/admin/sub/SubUpdate';
import ProductCreate from './pages/admin/product/ProductCreate';
import ProductUpdate from './pages/admin/product/ProductUpdate';
import AllProducts from './pages/admin/product/AllProducts';
import Product from './pages/Product'
import CategoryHome from './pages/category/CategoryHome'
import SubHome from './pages/sub/SubHome'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import createCouponPage from './pages/admin/coupon/CreateCouponPage'
import SideDrawer from './components/cards/drawer/SideDrawer'
import Payment from './pages/Payment'
const App=()=> {

  const dispatch=useDispatch()

  // to check firabase auth state
  useEffect(()=>{
const unsubscribe= auth.onAuthStateChanged(async (user)=>{
  if(user){
    const idTokenResult= await user.getIdTokenResult()
    console.log('user', user);
    currentUser(idTokenResult.token)
    .then(res=> {
        dispatch({
            type: "LOGGED_IN_USER",
            payload: {
                name :res.data.name,
                email: res.data.email,
                token:idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
    
            },
        });
    })
    .catch(err=> console.log(err));
  }
});
// cleanup
return()=> unsubscribe();
  },[dispatch])
  return(
<>
    <Header />
    <SideDrawer />
    <ToastContainer />
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/register/complete" component={RegisterComplete} />
    <Route exact path="/" component={Home} />
    <Route exact path="/forgot/password" component={ForgotPassword} />
    <UserRoute exact path="/user/history" component={History} />
    <UserRoute exact path="/user/password" component={Password} />
    <UserRoute exact path="/user/wishlist" component={Wishlist} />
    <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
    <AdminRoute exact path="/admin/category" component={CategoryCreate} />
    <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
    <AdminRoute exact path="/admin/sub" component={SubCreate} />
    <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
    <AdminRoute exact path="/admin/product" component={ProductCreate} />
    <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate} />
    <AdminRoute exact path="/admin/products" component={AllProducts} />
    <AdminRoute exact path="/admin/coupon" component={createCouponPage} />

    <Route exact path="/product/:slug" component={Product} />
    <Route exact path="/category/:slug" component={CategoryHome} />
    <Route exact path="/sub/:slug" component={SubHome} />
    <Route exact path="/shop" component={Shop} />
    <Route exact path="/cart" component={Cart} />
    <Route exact path="/checkout" component={Checkout} />
    <UserRoute exact path='/payment' component={Payment} />
      </Switch>
  </>
  );
}

export default App;
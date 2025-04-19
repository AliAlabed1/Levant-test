import {  Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Admin/Login";
import AdList from "./components/Admin/Ads/AdList";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Toaster } from "sonner";
import Header from "./components/Header";
import Home from "./components/Home";
import AddToggeler from "./components/Admin/AddToggeler";
import AdForm from "./components/Admin/Ads/AdForm";
import ViewAd from "./components/ViewAd";
import Items from "./components/Items";
import { useEffect, useState } from "react";

const App = () => {
  const{login}= useAuth();
  const [token,setToken] = useState<string>()
  const  getCredintials = async()=>{
    const token  = await localStorage.getItem('token')
    const name = await localStorage.getItem('name')
    if(token && name){
      login(token,name)
      setToken(token)
    }
      
  }
  useEffect(()=>{
    getCredintials()
  },[])
  return (
    <div className="min-w-full">
      <Toaster />
      
      <AuthProvider>
      
        <Header />
        <Routes>
          <Route path = '/' element={
              <PrivateRoute>
                <Navigate to='/admin/dashboard'/>
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <div className="p-6 flex flex-col gap-2 items-start w-full">
                  <AddToggeler/>
                  <AdList userType="admin"/>
                </div>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/dashboard/add_ad"
            element={
              <PrivateRoute>
                <AdForm mode='add'/>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/dashboard/edit_ad/:id"
            element={
              <PrivateRoute>
                <AdForm mode='edit'/>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/dashboard/view_ad/:id"
            element={
              <PrivateRoute>
                <ViewAd userType='admin'/>
              </PrivateRoute>
            }
          />
          <Route path="/guest" element={<Home />} />
          <Route path='/guest/view_ad/:id' element={<ViewAd userType="guest" />}/>
          <Route path='/guest/cat_item/:id' element={<Items/>}/>
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;

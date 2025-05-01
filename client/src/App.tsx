import React, { useEffect } from 'react'
import MainRouter from './routers/index.router'
import { Toaster } from 'react-hot-toast'
import ButtonToTopComponent from './components/container/button-to-top-component'
import Header from './layouts/Header'
import Nav from './layouts/Nav'
import axiosInstance from './configs/axios.config'
import { useAuthStore } from './features/authentication/stores/auth.store'
import Footer from './layouts/Footer'
import { useLocation } from 'react-router-dom'

const App = () => {
  axiosInstance.defaults.params = {
    tracking_id: useAuthStore.getState()?.user?._id,
  }

  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])
  return (
    <>
      <div>
        <Header />
        <Nav />
        <div className="max-w-[1332px] w-full min-h-screen py-8 mx-auto">
          <MainRouter />
        </div>
        <Footer />
      </div>
      <Toaster />
      <ButtonToTopComponent />
    </>
  )
}

export default App

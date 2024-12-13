
import { useDispatch } from 'react-redux'
import './App.css'
import { useEffect, useState } from 'react'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice' 
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    })
    .finally(() => {
      setLoading(false);
    })
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-white pt-1 px-2'>

      <div className='w-full block'>

        <Header />
        <main>
          TODO:{/* <Outlet /> */}
        </main>
        <Footer />

      </div>

    </div>
  ) : null
}

export default App

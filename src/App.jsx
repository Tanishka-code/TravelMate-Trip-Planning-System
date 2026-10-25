import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './Context/AuthContext'
import Auth from './pages/Auth'
import Chat from './pages/Chat'
import Dashboard from './pages/Dashboard'
import Destinations from './pages/Destinations'
import MyTrips from './pages/MyTrips'
import Planner from './pages/Planner'

function App() {
  const { currentUser, loading } = useContext(AuthContext)
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const handleRouteChange = () => {
      setPath(window.location.pathname)
    }

    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [])

  const navigate = (nextPath) => {
    window.history.pushState({}, '', nextPath)
    setPath(window.location.pathname)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="rounded-lg border border-blue-100 bg-white px-6 py-4 text-sm font-medium text-blue-600 shadow-sm">
          Loading TravelMate...
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return <Auth onNavigate={navigate} />
  }

  if (path === '/' || path === '/dashboard') {
    return <Dashboard onNavigate={navigate} />
  }

  if (path === '/login' || path === '/register' || path === '/auth') {
    return <Dashboard onNavigate={navigate} />
  }

  if (path === '/destinations' || path.startsWith('/destinations/')) {
    return <Destinations onNavigate={navigate} />
  }

  if (path === '/planner') {
    return <Planner onNavigate={navigate} />
  }

  if (path === '/my-trips') {
    return <MyTrips onNavigate={navigate} />
  }

  if (path === '/chat' || path === '/community') {
    return <Chat onNavigate={navigate} />
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Page not found</h1>
        <p className="mt-3 text-gray-600">The page you are looking for does not exist.</p>
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="mt-6 rounded-md bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Back to dashboard
        </button>
      </div>
    </div>
  )
}

export default App
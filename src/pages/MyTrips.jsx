import { useContext, useEffect, useMemo, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { TripContext } from '../Context/TripContext'
import { API_BASE_URL } from '../api'

function MyTrips({ onNavigate }) {
  const { currentUser, token } = useContext(AuthContext)
  const {
    trips,
    fetchTrips,
    loading,
    errorMessage: tripsError,
    removeTrip
  } = useContext(TripContext)
  const [deletingId, setDeletingId] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (currentUser && token) {
      fetchTrips()
    }
  }, [currentUser, token, fetchTrips])

  const totalBudget = useMemo(
    () => trips.reduce((sum, trip) => sum + Number(trip.budget || 0), 0),
    [trips]
  )

  const handleDelete = async (tripId) => {
    const confirmed = window.confirm('Delete this trip? This action cannot be undone.')
    if (!confirmed) return

    setDeletingId(tripId)
    setErrorMessage('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/trips/${tripId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.message || 'Unable to delete trip')
      }

      removeTrip(tripId)
    } catch (error) {
      setErrorMessage(error.message || 'Unable to delete trip')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b border-blue-100 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <button type="button" onClick={() => onNavigate('/dashboard')} className="text-xl font-bold text-blue-600">TravelMate</button>
          <div className="flex flex-wrap items-center gap-2 text-sm md:gap-5">
            <button type="button" onClick={() => onNavigate('/dashboard')} className="rounded-md px-3 py-2 text-gray-600 hover:text-blue-600">Home</button>
            <button type="button" onClick={() => onNavigate('/destinations')} className="rounded-md px-3 py-2 text-gray-600 hover:text-blue-600">Explore Destinations</button>
            <button type="button" onClick={() => onNavigate('/planner')} className="rounded-md px-3 py-2 text-gray-600 hover:text-blue-600">Plan a Trip</button>
            <button type="button" onClick={() => onNavigate('/chat')} className="rounded-md px-3 py-2 text-gray-600 hover:text-blue-600">Community</button>
            <button type="button" onClick={() => onNavigate('/auth')} className="rounded-md px-3 py-2 text-gray-600 hover:text-blue-600">Logout</button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-blue-600">My Trips</p>
            <h1 className="mt-1 text-3xl font-bold text-gray-800">Your travel plans</h1>
          </div>
          <button type="button" onClick={() => onNavigate('/planner')} className="rounded-md bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700">Create a New Trip</button>
        </div>

        {errorMessage && (
          <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</div>
        )}

        {tripsError && (
          <div role="alert" className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{tripsError}</div>
        )}

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-white p-5 shadow-sm"><p className="text-sm text-gray-500">Trips planned</p><p className="mt-2 text-3xl font-bold text-blue-600">{trips.length}</p></div>
          <div className="rounded-lg bg-white p-5 shadow-sm"><p className="text-sm text-gray-500">Total budget</p><p className="mt-2 text-3xl font-bold text-blue-600">₹{totalBudget.toLocaleString()}</p></div>
          <div className="rounded-lg bg-white p-5 shadow-sm"><p className="text-sm text-gray-500">Traveler</p><p className="mt-2 text-xl font-bold text-blue-600">{currentUser?.name || 'Traveler'}</p></div>
        </div>

        {loading ? (
          <div className="rounded-lg border border-blue-100 bg-white p-6 text-center text-gray-600">Loading trips...</div>
        ) : trips.length === 0 && tripsError ? null : trips.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
            <p className="text-xl font-semibold text-gray-800">No trips planned yet</p>
            <p className="mt-2 text-gray-600">Start by planning your next unforgettable journey.</p>
            <button type="button" onClick={() => onNavigate('/planner')} className="mt-5 rounded-md bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700">Plan Your Trip</button>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {trips.map((trip) => (
              <div key={trip._id || trip.id} className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-gray-100">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">{trip.destination}</p>
                    <h2 className="mt-1 text-xl font-bold text-gray-800">{trip.destination}</h2>
                  </div>
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">{trip.travellers} travellers</span>
                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium text-gray-700">Dates:</span> {trip.startDate} - {trip.endDate}</p>
                  <p><span className="font-medium text-gray-700">Budget:</span> ₹{Number(trip.budget || 0).toLocaleString()}</p>
                  {trip.description && <p><span className="font-medium text-gray-700">Notes:</span> {trip.description}</p>}
                </div>

                <div className="mt-5 flex gap-3">
                  <button type="button" onClick={() => onNavigate(`/destinations/${String(trip.destination).toLowerCase()}`)} className="flex-1 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100">View Details</button>
                  <button type="button" disabled={deletingId === (trip._id || trip.id)} onClick={() => handleDelete(trip._id || trip.id)} className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-60">{deletingId === (trip._id || trip.id) ? 'Deleting...' : 'Delete'}</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default MyTrips

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { API_BASE_URL } from '../api'

export const TripContext = createContext()

function TripProvider({ children }) {
  const { currentUser, token } = useContext(AuthContext)
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const fetchTrips = useCallback(async () => {
    if (!currentUser || !token) {
      setTrips([])
      setErrorMessage('')
      return
    }

    setLoading(true)
    setErrorMessage('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/trips`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.message || `Unable to fetch trips (HTTP ${response.status})`)
      }

      const data = await response.json()
      setTrips(Array.isArray(data) ? data : [])
    } catch (error) {
      setErrorMessage(error.message || 'Unable to fetch trips')
    } finally {
      setLoading(false)
    }
  }, [currentUser, token])

  useEffect(() => {
    fetchTrips()
  }, [fetchTrips])

  const addTrip = (trip) => {
    setTrips((currentTrips) => [trip, ...currentTrips])
  }

  const upsertTrip = (trip) => {
    setTrips((currentTrips) => {
      const existingIndex = currentTrips.findIndex((item) => item._id === trip._id)

      if (existingIndex >= 0) {
        const nextTrips = [...currentTrips]
        nextTrips[existingIndex] = trip
        return nextTrips
      }

      return [trip, ...currentTrips]
    })
  }

  const removeTrip = (id) => {
    setTrips((currentTrips) =>
      currentTrips.filter((trip) => trip._id !== id && trip.id !== id)
    )
  }

  return (
    <TripContext.Provider
      value={{
        trips,
        loading,
        errorMessage,
        fetchTrips,
        addTrip,
        upsertTrip,
        removeTrip
      }}
    >
      {children}
    </TripContext.Provider>
  )
}

export default TripProvider
import { createContext, useEffect, useState } from 'react'

export const TripContext = createContext()

function TripProvider({ children }) {
  const [trips, setTrips] = useState(() => {
    const savedTrips = localStorage.getItem('travelmate_trips')
    return savedTrips ? JSON.parse(savedTrips) : []
  })

  useEffect(() => {
    localStorage.setItem('travelmate_trips', JSON.stringify(trips))
  }, [trips])

  const addTrip = (trip) => {
    setTrips((currentTrips) => [...currentTrips, trip])
  }

  const removeTrip = (id) => {
    setTrips((currentTrips) =>
      currentTrips.filter((trip) => trip.id !== id)
    )
  }

  return (
    <TripContext.Provider
      value={{
        trips,
        addTrip,
        removeTrip
      }}
    >
      {children}
    </TripContext.Provider>
  )
}

export default TripProvider
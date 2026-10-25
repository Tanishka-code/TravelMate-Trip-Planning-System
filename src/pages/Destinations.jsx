import { useEffect, useMemo, useState } from 'react'
import destinationsData from '../data/destinations'

function Destinations({ onNavigate }) {
  const [destinations, setDestinations] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('All Locations')

  useEffect(() => {
    setDestinations(destinationsData)
  }, [])

  const filteredDestinations = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return destinations.filter((destination) => {
      const matchesSearch =
        !normalizedSearch ||
        destination.name.toLowerCase().includes(normalizedSearch) ||
        destination.location.toLowerCase().includes(normalizedSearch) ||
        destination.description.toLowerCase().includes(normalizedSearch)

      const matchesLocation =
        locationFilter === 'All Locations' ||
        destination.location === locationFilter

      return matchesSearch && matchesLocation
    })
  }, [destinations, searchTerm, locationFilter])

  const locations = ['All Locations', ...new Set(destinations.map((destination) => destination.location))]

  const handleDestinationClick = (destination) => {
    const slug = destination.slug || destination.name.toLowerCase().replace(/\s+/g, '-')
    onNavigate?.(`/destinations/${slug}`)
  }

  const handlePlanTripClick = (destination) => {
    const destinationName = destination?.name || destination
    const query = destinationName ? `?destination=${encodeURIComponent(destinationName)}` : ''
    onNavigate?.(`/planner${query}`)
  }

  const destinationDetail = (destination) => {
    if (!destination) return null

    return (
      <div className="mx-auto max-w-6xl px-6 pb-10">
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Destination highlights
              </p>
              <h2 className="mt-2 text-3xl font-bold text-gray-800">{destination.name}</h2>
              <p className="mt-2 text-gray-600">📍 {destination.location}</p>
            </div>
            <button
              type="button"
              onClick={() => handlePlanTripClick(destination)}
              className="rounded-md bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              Plan a trip
            </button>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="flex min-h-44 items-center justify-center rounded-lg bg-blue-50 text-6xl">
              🌍
            </div>
            <div className="space-y-4 text-gray-600">
              <p>{destination.description}</p>
              <p>
                Perfect for travelers looking for a balanced mix of culture, scenery, and memorable local experiences.
              </p>
              <div className="flex flex-wrap gap-2 text-sm">
                {['Beach', 'Culture', 'Food', 'Adventure'].map((tag) => (
                  <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const path = typeof window !== 'undefined' ? window.location.pathname : ''
  const isDetailView = path.startsWith('/destinations/') && path !== '/destinations'
  const selectedDestination = isDetailView
    ? destinations.find((item) => {
        const slug = item.slug || item.name.toLowerCase().replace(/\s+/g, '-')
        return slug === path.split('/destinations/')[1]
      })
    : null

  if (isDetailView && !selectedDestination) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="max-w-md rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">Destination not found</h1>
          <p className="mt-3 text-gray-600">The destination you are looking for does not exist.</p>
          <button
            type="button"
            onClick={() => onNavigate?.('/destinations')}
            className="mt-6 rounded-md bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Back to destinations
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <button type="button" onClick={() => onNavigate?.('/dashboard')} className="text-xl font-bold text-blue-600">TravelMate</button>

          <div className="flex gap-5 text-sm">
            <button type="button" onClick={() => onNavigate?.('/dashboard')} className="text-gray-600 hover:text-blue-600">Home</button>
            <button type="button" onClick={() => onNavigate?.('/destinations')} className="font-medium text-blue-600">Destinations</button>
            <button type="button" onClick={() => onNavigate?.('/planner')} className="text-gray-600 hover:text-blue-600">Plan Trip</button>
            <button type="button" onClick={() => onNavigate?.('/chat')} className="text-gray-600 hover:text-blue-600">Community</button>
          </div>
        </div>
      </nav>

      {isDetailView && selectedDestination ? (
        <>
          {destinationDetail(selectedDestination)}
          <div className="mx-auto max-w-6xl px-6 pb-12">
            <button
              type="button"
              onClick={() => onNavigate?.('/destinations')}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600"
            >
              ← Back to all destinations
            </button>
          </div>
        </>
      ) : (
        <>
          <section className="px-6 py-10 text-center">
            <h1 className="text-3xl font-bold text-gray-800">Explore Destinations</h1>
            <p className="mx-auto mt-3 max-w-xl text-gray-600">Explore different destinations and find a place for your next trip.</p>
          </section>

          <section className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 outline-none focus:border-blue-500"
              />

              <select
                value={locationFilter}
                onChange={(event) => setLocationFilter(event.target.value)}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 outline-none focus:border-blue-500"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-6 py-10">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDestinations.map((destination) => (
                <div key={destination.id} className="rounded-lg bg-white p-5 shadow-sm transition hover:shadow-md">
                  <div className="flex h-32 items-center justify-center rounded-md bg-blue-50 text-4xl">🌍</div>
                  <h2 className="mt-4 text-xl font-semibold text-gray-800">{destination.name}</h2>
                  <p className="mt-1 text-sm text-blue-600">📍 {destination.location}</p>
                  <p className="mt-3 text-sm leading-6 text-gray-600">{destination.description}</p>
                  <button
                    type="button"
                    onClick={() => handleDestinationClick(destination)}
                    className="mt-4 text-sm font-medium text-blue-600 hover:underline"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>

            {filteredDestinations.length === 0 && (
              <div className="mt-8 rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-gray-600">
                No destinations match your search.
              </div>
            )}
          </section>

          <div className="pb-10 text-center">
            <p className="mb-3 text-gray-600">Found a destination you like?</p>
            <button
              type="button"
              onClick={() => onNavigate?.('/planner')}
              className="inline-block rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Plan Your Trip
            </button>
          </div>
        </>
      )}

      <footer className="bg-gray-800 px-6 py-6 text-center text-sm text-gray-300">
        <p>© 2026 TravelMate. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Destinations
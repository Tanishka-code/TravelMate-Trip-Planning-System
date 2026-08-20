import { useEffect, useState } from 'react'
import destinationsData from '../data/destinations'

function Destinations() {
  const [destinations, setDestinations] = useState([])
  useEffect(() => {
  setDestinations(destinationsData)
}, [])
  
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          <a
            href="/"
            className="text-xl font-bold text-blue-600"
          >
            TravelMate
          </a>

          <div className="flex gap-5 text-sm">

            <a
              href="/"
              className="text-gray-600 hover:text-blue-600"
            >
              Home
            </a>

            <a
              href="/destinations"
              className="font-medium text-blue-600"
            >
              Destinations
            </a>

            <a
              href="/auth"
              className="text-gray-600 hover:text-blue-600"
            >
              Login
            </a>

          </div>

        </div>
      </nav>


      {/* Page Heading */}
      <section className="px-6 py-10 text-center">

        <h1 className="text-3xl font-bold text-gray-800">
          Explore Destinations
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-gray-600">
          Explore different destinations and find a place for your next trip.
        </p>

      </section>


      {/* Search and Filter */}
      <section className="mx-auto max-w-6xl px-6">

        <div className="flex flex-col gap-3 sm:flex-row">

          <input
            type="text"
            placeholder="Search destinations..."
            className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 outline-none focus:border-blue-500"
          />

          <select
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 outline-none focus:border-blue-500"
          >
            <option>All Locations</option>
            <option>India</option>
            <option>Himachal Pradesh</option>
            <option>Rajasthan</option>
            <option>Maharashtra</option>
          </select>

        </div>

      </section>


      {/* Destination Cards */}
      <section className="mx-auto max-w-6xl px-6 py-10">

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {destinations.map((destination) => (

            <div
              key={destination.name}
              className="rounded-lg bg-white p-5 shadow-sm transition hover:shadow-md"
            >

              <div className="flex h-32 items-center justify-center rounded-md bg-blue-50 text-4xl">
                🌍
              </div>

              <h2 className="mt-4 text-xl font-semibold text-gray-800">
                {destination.name}
              </h2>

              <p className="mt-1 text-sm text-blue-600">
                📍 {destination.location}
              </p>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {destination.description}
              </p>

              <button className="mt-4 text-sm font-medium text-blue-600 hover:underline">
                View Details
              </button>

            </div>

          ))}

        </div>

      </section>


      {/* Footer */}
      <footer className="bg-gray-800 px-6 py-6 text-center text-sm text-gray-300">

        <p>
          © 2026 TravelMate. All rights reserved.
        </p>

      </footer>
<div className="pb-10 text-center">

  <p className="mb-3 text-gray-600">
    Found a destination you like?
  </p>

  <a
    href="/planner"
    className="inline-block rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
  >
    Plan Your Trip
  </a>

</div>
    </div>
  )
}

export default Destinations
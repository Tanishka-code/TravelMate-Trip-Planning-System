
import { useState } from 'react'
function Planner() {
  const [destination, setDestination] = useState('')
const [startDate, setStartDate] = useState('')
const [endDate, setEndDate] = useState('')
const [travellers, setTravellers] = useState('')
const [budget, setBudget] = useState('')
const handleSubmit = (e) => {
  e.preventDefault()

  console.log({
    destination,
    startDate,
    endDate,
    travellers,
    budget
  })
}
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
              className="text-gray-600 hover:text-blue-600"
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
          Plan Your Trip
        </h1>

        <p className="mt-3 text-gray-600">
          Enter your trip details and create your travel plan.
        </p>

      </section>


      {/* Trip Form */}
      <section className="mx-auto max-w-3xl px-6 pb-12">

        <form
  onSubmit={handleSubmit}
  className="rounded-lg bg-white p-6 shadow-sm"
>

          {/* Destination */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Destination
            </label>

            <select
  value={destination}
  onChange={(e) => setDestination(e.target.value)}
  className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
>
              <option>Select destination</option>
              <option>Goa</option>
              <option>Manali</option>
              <option>Jaipur</option>
              <option>Kerala</option>
              <option>Mumbai</option>
              <option>Udaipur</option>
            </select>
          </div>


          {/* Dates */}
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Start Date
              </label>

              <input
  type="date"
  value={startDate}
  onChange={(e) => setStartDate(e.target.value)}
  className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
/>
            </div>


            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                End Date
              </label>

              <input
  type="date"
  value={endDate}
  onChange={(e) => setEndDate(e.target.value)}
  className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
/>

            </div>

          </div>


          {/* Travellers and Budget */}
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Number of Travellers
              </label>

              <select
  value={travellers}
  onChange={(e) => setTravellers(e.target.value)}
  className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
>
                <option>1 Traveller</option>
                <option>2 Travellers</option>
                <option>3 Travellers</option>
                <option>4 Travellers</option>
                <option>5+ Travellers</option>
              </select>

            </div>


            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Budget
              </label>

              <select
  value={budget}
  onChange={(e) => setBudget(e.target.value)}
  className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
>
                <option>Select budget</option>
                <option>Budget</option>
                <option>Moderate</option>
                <option>Luxury</option>
              </select>

            </div>

          </div>


          {/* Travel Preferences */}
          <div className="mt-6">

            <label className="mb-3 block text-sm font-medium text-gray-700">
              Travel Preferences
            </label>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

              <button className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:border-blue-500 hover:text-blue-600">
                Adventure
              </button>

              <button className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:border-blue-500 hover:text-blue-600">
                Nature
              </button>

              <button className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:border-blue-500 hover:text-blue-600">
                Food
              </button>

              <button className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:border-blue-500 hover:text-blue-600">
                Culture
              </button>

              <button className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:border-blue-500 hover:text-blue-600">
                Shopping
              </button>

              <button className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:border-blue-500 hover:text-blue-600">
                Relaxation
              </button>

            </div>

          </div>


          {/* Create Trip Button */}
          <button className="mt-7 w-full rounded-md bg-blue-600 py-2.5 font-medium text-white hover:bg-blue-700">
            Create My Trip
          </button>

       </form>

      </section>


      {/* Footer */}
      <footer className="bg-gray-800 px-6 py-6 text-center text-sm text-gray-300">

        <p>
          © 2026 TravelMate. All rights reserved.
        </p>

      </footer>

    </div>
  )
}

export default Planner
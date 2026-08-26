import Auth from './pages/Auth'
import Destinations from './pages/Destinations'
import Planner from './pages/Planner'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  const path = window.location.pathname

if (path === '/auth') {
  return <Auth />
}
if (path === '/destinations') {
  return <Destinations />
}
if (path === '/planner') {
  return <Planner />
}
if (path === '/dashboard') {
  return <Dashboard />
}
if (path === '/admin') {
  return <AdminDashboard />
}
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          <h1 className="text-xl font-bold text-blue-600">
            TravelMate
          </h1>

          <div className="flex gap-6 text-sm">
            <a href="#" className="text-blue-600">
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


      {/* Introduction */}
      <section className="bg-blue-600 px-6 py-16 text-center text-white">

  <h2 className="text-3xl font-bold md:text-4xl">
    Travel & Trip Planning System
  </h2>

  <p className="mx-auto mt-4 max-w-2xl text-blue-100">
    Plan your trips easily, explore new destinations,
    and organize your travel journey in one place.
  </p>

  <a
    href="/planner"
    className="mt-6 inline-block rounded-md bg-white px-6 py-2.5 font-medium text-blue-600 hover:bg-gray-100"
  >
    Plan Your Trip
  </a>

</section>

      {/* Search */}
      <section className="mx-auto -mt-6 max-w-4xl px-6">

        <div className="rounded-lg bg-white p-5 shadow-md">

          <label className="mb-2 block text-sm font-medium text-gray-700">
            Search Destination
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">

            <input
              type="text"
              placeholder="Enter a destination..."
              className="flex-1 rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />

            <button className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
              Search
            </button>

          </div>

        </div>

      </section>

      {/* Popular Destinations */}
      <section className="mx-auto max-w-6xl px-6 py-12">

        <h2 className="text-2xl font-bold text-gray-800">
          Popular Destinations
        </h2>

        <p className="mt-2 text-gray-600">
          Explore some popular travel destinations.
        </p>


        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">

          {/* Goa */}
          <div className="rounded-lg bg-white p-5 shadow-sm">

            <h3 className="text-xl font-semibold text-gray-800">
              Goa
            </h3>

            <p className="mt-2 text-gray-600">
              Beaches, nightlife and relaxing vacations.
            </p>

            <button className="mt-4 text-sm font-medium text-blue-600 hover:underline">
              View Details
            </button>

          </div>


          {/* Manali */}
          <div className="rounded-lg bg-white p-5 shadow-sm">

            <h3 className="text-xl font-semibold text-gray-800">
              Manali
            </h3>

            <p className="mt-2 text-gray-600">
              Mountains, nature and adventure activities.
            </p>

            <button className="mt-4 text-sm font-medium text-blue-600 hover:underline">
              View Details
            </button>

          </div>


          {/* Jaipur */}
          <div className="rounded-lg bg-white p-5 shadow-sm">

            <h3 className="text-xl font-semibold text-gray-800">
              Jaipur
            </h3>

            <p className="mt-2 text-gray-600">
              Explore history, culture and heritage.
            </p>

            <button className="mt-4 text-sm font-medium text-blue-600 hover:underline">
              View Details
            </button>

          </div>

        </div>

      </section>


      {/* Why TravelMate */}
      <section className="bg-white px-6 py-12">

        <div className="mx-auto max-w-6xl">

          <h2 className="text-2xl font-bold text-gray-800">
            Why TravelMate?
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">

            <div className="rounded-lg border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-800">
                Easy Trip Planning
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Plan your trip and organize your travel details easily.
              </p>
            </div>


            <div className="rounded-lg border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-800">
                Explore Destinations
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Find and explore different destinations for your next trip.
              </p>
            </div>


            <div className="rounded-lg border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-800">
                Manage Your Trips
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Keep your planned trips and travel information organized.
              </p>
            </div>

          </div>

        </div>

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

export default App
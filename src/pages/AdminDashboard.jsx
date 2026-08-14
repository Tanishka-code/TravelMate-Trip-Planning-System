function AdminDashboard() {
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
              href="/dashboard"
              className="text-gray-600 hover:text-blue-600"
            >
              User Dashboard
            </a>

            <a
              href="/auth"
              className="text-gray-600 hover:text-blue-600"
            >
              Logout
            </a>

          </div>

        </div>
      </nav>


      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-10">

        {/* Heading */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Manage users, trips and travel information.
          </p>
        </div>


        {/* Statistics */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">

          <div className="rounded-lg bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Users
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              120
            </p>
          </div>


          <div className="rounded-lg bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Trips
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              85
            </p>
          </div>


          <div className="rounded-lg bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Destinations
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              25
            </p>
          </div>

        </div>


        {/* Recent Trips */}
        <section className="mt-10">

          <h2 className="text-xl font-bold text-gray-800">
            Recent Trips
          </h2>

          <div className="mt-4 overflow-x-auto rounded-lg bg-white shadow-sm">

            <table className="w-full min-w-[600px] text-left text-sm">

              <thead className="border-b bg-gray-50">

                <tr>
                  <th className="px-5 py-4 font-medium text-gray-600">
                    User
                  </th>

                  <th className="px-5 py-4 font-medium text-gray-600">
                    Destination
                  </th>

                  <th className="px-5 py-4 font-medium text-gray-600">
                    Date
                  </th>

                  <th className="px-5 py-4 font-medium text-gray-600">
                    Status
                  </th>
                </tr>

              </thead>

              <tbody>

                <tr className="border-b">

                  <td className="px-5 py-4 text-gray-800">
                    Rahul
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    Goa
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    15 Sep 2026
                  </td>

                  <td className="px-5 py-4 text-green-600">
                    Confirmed
                  </td>

                </tr>


                <tr className="border-b">

                  <td className="px-5 py-4 text-gray-800">
                    Priya
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    Manali
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    20 Sep 2026
                  </td>

                  <td className="px-5 py-4 text-yellow-600">
                    Pending
                  </td>

                </tr>


                <tr>

                  <td className="px-5 py-4 text-gray-800">
                    Ananya
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    Jaipur
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    25 Sep 2026
                  </td>

                  <td className="px-5 py-4 text-green-600">
                    Confirmed
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </section>


        {/* Management */}
        <section className="mt-10">

          <h2 className="text-xl font-bold text-gray-800">
            Management
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">

            <button className="rounded-md border border-gray-300 bg-white p-4 text-left hover:border-blue-500">

              <h3 className="font-semibold text-gray-800">
                Manage Users
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                View and manage registered users.
              </p>

            </button>


            <button className="rounded-md border border-gray-300 bg-white p-4 text-left hover:border-blue-500">

              <h3 className="font-semibold text-gray-800">
                Manage Trips
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                View and manage planned trips.
              </p>

            </button>


            <button className="rounded-md border border-gray-300 bg-white p-4 text-left hover:border-blue-500">

              <h3 className="font-semibold text-gray-800">
                Manage Destinations
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                Add and manage travel destinations.
              </p>

            </button>

          </div>

        </section>

      </main>


      {/* Footer */}
      <footer className="bg-gray-800 px-6 py-6 text-center text-sm text-gray-300">

        <p>
          © 2026 TravelMate. All rights reserved.
        </p>

      </footer>

    </div>
  )
}

export default AdminDashboard
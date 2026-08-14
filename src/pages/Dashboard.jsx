function Dashboard() {
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
              href="/planner"
              className="text-gray-600 hover:text-blue-600"
            >
              Plan Trip
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


      {/* Dashboard Content */}
      <main className="mx-auto max-w-6xl px-6 py-10">

        {/* Welcome */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back!
          </h1>

          <p className="mt-2 text-gray-600">
            Manage your trips and view your travel information.
          </p>
        </div>


        {/* Summary Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">

          <div className="rounded-lg bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              My Trips
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              2
            </p>
          </div>


          <div className="rounded-lg bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Upcoming Trips
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              1
            </p>
          </div>


          <div className="rounded-lg bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Completed Trips
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              1
            </p>
          </div>

        </div>


        {/* Upcoming Trip */}
        <section className="mt-10">

          <h2 className="text-xl font-bold text-gray-800">
            Upcoming Trip
          </h2>

          <div className="mt-4 rounded-lg bg-white p-6 shadow-sm">

            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

              <div>

                <h3 className="text-xl font-semibold text-gray-800">
                  Goa
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  📅 15 Sep 2026 - 19 Sep 2026
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  👥 2 Travellers
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  💰 Moderate Budget
                </p>

              </div>

              <button className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700">
                View Trip
              </button>

            </div>

          </div>

        </section>


        {/* Recent Trips */}
        <section className="mt-10">

          <h2 className="text-xl font-bold text-gray-800">
            My Recent Trips
          </h2>

          <div className="mt-4 overflow-x-auto rounded-lg bg-white shadow-sm">

            <table className="w-full min-w-[500px] text-left text-sm">

              <thead className="border-b bg-gray-50">

                <tr>
                  <th className="px-5 py-4 font-medium text-gray-600">
                    Destination
                  </th>

                  <th className="px-5 py-4 font-medium text-gray-600">
                    Dates
                  </th>

                  <th className="px-5 py-4 font-medium text-gray-600">
                    Travellers
                  </th>

                  <th className="px-5 py-4 font-medium text-gray-600">
                    Status
                  </th>
                </tr>

              </thead>


              <tbody>

                <tr className="border-b">

                  <td className="px-5 py-4 font-medium text-gray-800">
                    Goa
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    10 Jun - 14 Jun
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    2
                  </td>

                  <td className="px-5 py-4 text-green-600">
                    Completed
                  </td>

                </tr>


                <tr>

                  <td className="px-5 py-4 font-medium text-gray-800">
                    Manali
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    20 Apr - 24 Apr
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    3
                  </td>

                  <td className="px-5 py-4 text-green-600">
                    Completed
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </section>


        {/* Quick Actions */}
        <section className="mt-10">

          <h2 className="text-xl font-bold text-gray-800">
            Quick Actions
          </h2>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">

            <a
              href="/planner"
              className="rounded-md bg-blue-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
            >
              Plan New Trip
            </a>

            <a
              href="/destinations"
              className="rounded-md border border-gray-300 bg-white px-5 py-2 text-center text-sm font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600"
            >
              Explore Destinations
            </a>

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

export default Dashboard
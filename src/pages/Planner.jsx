import { useContext, useEffect, useMemo, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { TripContext } from '../Context/TripContext'
import { API_BASE_URL } from '../api'

function Planner({ onNavigate }) {
  const { currentUser, token } = useContext(AuthContext)
  const { fetchTrips, upsertTrip } = useContext(TripContext)

  const [destination, setDestination] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [travellers, setTravellers] = useState('')
  const [budget, setBudget] = useState('')
  const [preferenceTags, setPreferenceTags] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const destinationFromQuery = params.get('destination')
    if (destinationFromQuery) {
      setDestination(destinationFromQuery)
    }
  }, [])

  const availablePreferences = useMemo(
    () => ['Adventure', 'Nature', 'Food', 'Culture', 'Shopping', 'Relaxation'],
    []
  )

  const togglePreference = (preference) => {
    setPreferenceTags((current) =>
      current.includes(preference)
        ? current.filter((item) => item !== preference)
        : [...current, preference]
    )
  }

  const validateTrip = () => {
    if (!destination.trim()) return 'Destination is required.'
    if (!startDate || !endDate) return 'Trip dates are required.'
    if (new Date(startDate) > new Date(endDate)) return 'Start date cannot be later than end date.'
    if (!travellers || Number(travellers) < 1) return 'Traveller count must be at least 1.'
    if (!budget || Number(budget) < 0) return 'Budget must be zero or a positive number.'

    return ''
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!currentUser || !token) {
      setErrorMessage('Please log in to plan a trip.')
      return
    }

    const validationError = validateTrip()
    if (validationError) {
      setErrorMessage(validationError)
      setSuccessMessage('')
      return
    }

    setIsSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    const payload = {
      destination: destination.trim(),
      startDate,
      endDate,
      travellers: Number(travellers),
      budget: Number(budget),
      preferences: preferenceTags.join(', '),
      description: preferenceTags.length ? `Preferred: ${preferenceTags.join(', ')}` : ''
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/trips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.message || 'Unable to create trip')
      }

      upsertTrip(data)
      await fetchTrips()
      setSuccessMessage('Trip created successfully!')
      setDestination('')
      setStartDate('')
      setEndDate('')
      setTravellers('')
      setBudget('')
      setPreferenceTags([])
    } catch (error) {
      setErrorMessage(error.message || 'Unable to create your trip.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <button type="button" onClick={() => onNavigate?.('/dashboard')} className="text-xl font-bold text-blue-600">TravelMate</button>

          <div className="flex gap-5 text-sm">
            <button type="button" onClick={() => onNavigate?.('/dashboard')} className="text-gray-600 hover:text-blue-600">Home</button>
            <button type="button" onClick={() => onNavigate?.('/destinations')} className="text-gray-600 hover:text-blue-600">Destinations</button>
            <button type="button" onClick={() => onNavigate?.('/my-trips')} className="text-gray-600 hover:text-blue-600">My Trips</button>
            <button type="button" onClick={() => onNavigate?.('/chat')} className="text-gray-600 hover:text-blue-600">Community</button>
          </div>
        </div>
      </nav>

      <section className="px-6 py-10 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Plan Your Trip</h1>
        <p className="mt-3 text-gray-600">Enter your trip details and create your travel plan.</p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-12">
        <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow-sm">
          {errorMessage && (
            <p role="alert" className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p role="status" className="mb-4 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {successMessage}
            </p>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Destination</label>
            <select
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            >
              <option value="">Select destination</option>
              <option value="Goa">Goa</option>
              <option value="Manali">Manali</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Kerala">Kerala</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Udaipur">Udaipur</option>
            </select>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Number of Travellers</label>
              <input
                type="number"
                min="1"
                value={travellers}
                onChange={(event) => setTravellers(event.target.value)}
                placeholder="2"
                className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Budget (₹)</label>
              <input
                type="number"
                min="0"
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                placeholder="15000"
                className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-3 block text-sm font-medium text-gray-700">Travel Preferences</label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {availablePreferences.map((preference) => {
                const selected = preferenceTags.includes(preference)
                return (
                  <button
                    key={preference}
                    type="button"
                    onClick={() => togglePreference(preference)}
                    className={`rounded-md border px-3 py-2 text-sm ${
                      selected
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                    }`}
                  >
                    {preference}
                  </button>
                )
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-7 w-full rounded-md bg-blue-600 py-2.5 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Creating trip...' : 'Create My Trip'}
          </button>
        </form>
      </section>

      <footer className="bg-gray-800 px-6 py-6 text-center text-sm text-gray-300">
        <p>© 2026 TravelMate. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Planner
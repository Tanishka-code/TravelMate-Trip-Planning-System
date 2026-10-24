import { useContext, useState } from 'react'
import useForm from '../hooks/useForm'
import { AuthContext } from '../Context/AuthContext'

// Use the deployed backend URL when configured in Vercel.
// Otherwise, use the local backend during development.
const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:5000'
).replace(/\/$/, '')

function Auth() {
  const [isRegister, setIsRegister] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { login } = useContext(AuthContext)

  const {
    formData,
    handleChange,
    resetForm
  } = useForm({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    setErrorMessage('')
    setSuccessMessage('')

    if (isSubmitting) return

    if (
      isRegister &&
      formData.password !== formData.confirmPassword
    ) {
      setErrorMessage('Passwords do not match')
      return
    }

    setIsSubmitting(true)

    const endpoint = isRegister ? 'register' : 'login'

    const payload = isRegister
      ? {
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password
        }
      : {
          email: formData.email.trim(),
          password: formData.password
        }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/users/${endpoint}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      )

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        const message =
          data.errors?.map((item) => item.msg).join(', ') ||
          data.message ||
          'Request failed'

        throw new Error(message)
      }

      if (isRegister) {
        setSuccessMessage(
          'Registration successful! Please log in.'
        )
        setIsRegister(false)
        resetForm()
      } else {
        if (!data.user || !data.token) {
          throw new Error(
            'Login response is missing user or token'
          )
        }

        login(data.user, data.token)
        setSuccessMessage('Login successful!')
        resetForm()
      }
    } catch (error) {
      setErrorMessage(
        error.message === 'Failed to fetch'
          ? 'Unable to connect to the server. Please try again.'
          : error.message || 'Something went wrong'
      )
    } finally {
      setIsSubmitting(false)
    }
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

          <a
            href="/"
            className="text-sm text-gray-600 hover:text-blue-600"
          >
            Back to Home
          </a>

        </div>
      </nav>

      {/* Authentication Form */}
      <div className="flex justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">

          {/* Tabs */}
          <div className="mb-6 flex border-b">

            <button
              type="button"
              onClick={() => {
                setIsRegister(false)
                setErrorMessage('')
                setSuccessMessage('')
              }}
              className={`w-1/2 pb-3 text-sm font-medium ${
                !isRegister
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500'
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => {
                setIsRegister(true)
                setErrorMessage('')
                setSuccessMessage('')
              }}
              className={`w-1/2 pb-3 text-sm font-medium ${
                isRegister
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500'
              }`}
            >
              Register
            </button>

          </div>

          {/* Error Message */}
          {errorMessage && (
            <p
              className="mb-4 text-sm text-red-600"
              role="alert"
            >
              {errorMessage}
            </p>
          )}

          {/* Success Message */}
          {successMessage && (
            <p
              className="mb-4 text-sm text-green-600"
              role="status"
            >
              {successMessage}
            </p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>

            <h2 className="text-2xl font-bold text-gray-800">
              {isRegister
                ? 'Create an Account'
                : 'Welcome Back'}
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              {isRegister
                ? 'Create an account to start planning your trips.'
                : 'Login to manage your trips and bookings.'}
            </p>

            {/* Registration Name */}
            {isRegister && (
              <div className="mt-5">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
                />
              </div>
            )}

            {/* Email */}
            <div className="mt-5">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>

            {/* Password */}
            <div className="mt-5">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>

            {/* Confirm Password */}
            {isRegister && (
              <div className="mt-5">
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
                />
              </div>
            )}

            {/* Forgot Password */}
            {!isRegister && (
              <div className="mt-3 text-right">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full rounded-md bg-blue-600 py-2.5 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? 'Please wait...'
                : isRegister
                  ? 'Create Account'
                  : 'Login'}
            </button>

          </form>

          {/* Switch Between Login and Register */}
          <p className="mt-5 text-center text-sm text-gray-600">
            {isRegister
              ? 'Already have an account?'
              : "Don't have an account?"}

            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister)
                setErrorMessage('')
                setSuccessMessage('')
              }}
              className="ml-1 font-medium text-blue-600 hover:underline"
            >
              {isRegister ? 'Login' : 'Register'}
            </button>
          </p>

        </div>
      </div>

    </div>
  )
}

export default Auth
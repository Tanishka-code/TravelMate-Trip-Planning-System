import { useContext, useState } from 'react'
import useForm from '../hooks/useForm'
import { AuthContext } from '../context/AuthContext'

function Auth() {
  const [isRegister, setIsRegister] = useState(false)

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

 const handleSubmit = (e) => {
  e.preventDefault()

  console.log('Form Data:', formData)

  login({
    name: formData.name || 'TravelMate User',
    email: formData.email
  })

  resetForm()
}

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          <a href="/" className="text-xl font-bold text-blue-600">
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
              onClick={() => setIsRegister(false)}
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
              onClick={() => setIsRegister(true)}
              className={`w-1/2 pb-3 text-sm font-medium ${
                isRegister
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500'
              }`}
            >
              Register
            </button>

          </div>


          {/* Form */}
          <form onSubmit={handleSubmit}>

            <h2 className="text-2xl font-bold text-gray-800">
              {isRegister ? 'Create an Account' : 'Welcome Back'}
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              {isRegister
                ? 'Create an account to start planning your trips.'
                : 'Login to manage your trips and bookings.'}
            </p>


            {/* Registration Name */}
            {isRegister && (
              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
                />
              </div>
            )}


            {/* Email */}
            <div className="mt-5">

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              />

            </div>


            {/* Password */}
            <div className="mt-5">

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              />

            </div>


            {/* Confirm Password */}
            {isRegister && (
              <div className="mt-5">

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
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


            {/* Submit */}
            <button
              type="submit"
              className="mt-6 w-full rounded-md bg-blue-600 py-2.5 font-medium text-white hover:bg-blue-700"
            >
              {isRegister ? 'Create Account' : 'Login'}
            </button>

          </form>


          {/* Switch */}
          <p className="mt-5 text-center text-sm text-gray-600">

            {isRegister
              ? 'Already have an account?'
              : "Don't have an account?"}

            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
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
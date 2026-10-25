const configuredApiUrl = import.meta.env.VITE_API_URL?.trim()
const defaultApiUrl = import.meta.env.DEV
  ? 'http://localhost:5000'
  : window.location.origin

export const API_BASE_URL = (
  configuredApiUrl || defaultApiUrl
).replace(/\/+$/, '')

export const SOCKET_URL = (
  import.meta.env.VITE_SOCKET_URL?.trim() ||
  configuredApiUrl ||
  defaultApiUrl
).replace(/\/+$/, '')

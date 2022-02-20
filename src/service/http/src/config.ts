let baseURL = ''
const timeout = 10000

if (import.meta.env.MODE === 'development') {
  baseURL = '/api'
} else if (import.meta.env.MODE === 'production') {
  baseURL = '/'
}

export { baseURL, timeout }

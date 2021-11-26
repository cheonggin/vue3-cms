class LocalCache {
  setCache(key, val) {
    window.localStorage.setItem(key, JSON.stringify(val))
  }

  getCache(key) {
    const val = window.localStorage.getItem(key)
    if (val) {
      return JSON.parse(val)
    }
  }

  deleteCache(key) {
    window.localStorage.removeItem(key)
  }

  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()

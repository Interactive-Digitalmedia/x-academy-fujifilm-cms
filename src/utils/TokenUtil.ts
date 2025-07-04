export function getTokenFromLocalStorage(): string | null {
    try {
      const state = localStorage.getItem('global-store')
      if (!state) return null
  
      const stateObject = JSON.parse(state)
      return stateObject?.state?.user?.token ?? null
    } catch (error) {
      console.error('Error parsing state from localStorage:', error)
      return null
    }
  }
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type State = {
  user: any | null
  signedIn: boolean
  triggerRender: boolean
  showLoginModal: boolean // ✅ NEW
}

type Actions = {
  setUser: (x: any | null) => void
  setSignedIn: (x: boolean) => void
  toggleTriggerRender: (x: boolean) => void
  setShowLoginModal: (x: boolean) => void // ✅ NEW
}

type T = State & Actions

const useGlobalStore = create<T>()(
  persist(
    (set) => ({
      user: null,
      signedIn: false,
      triggerRender: false,
      showLoginModal: false, // ✅ initialize as false

      setUser: (x) => set({ user: x }),
      setSignedIn: (x) => set({ signedIn: x }),
      toggleTriggerRender: (x) => set({ triggerRender: x }),
      setShowLoginModal: (x) => set({ showLoginModal: x }) // ✅ setter
    }),
    {
      name: 'global-store',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export default useGlobalStore

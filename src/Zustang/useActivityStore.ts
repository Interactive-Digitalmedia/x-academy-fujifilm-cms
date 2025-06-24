import { create } from 'zustand'
import toast from 'react-hot-toast'
import { getActivities, getActivitiesById } from "@/api/activity"
import { Activity } from '@/types'

interface ActivityFilters {
  query?: string
  types?: string
  timeline?: string
  price?: number
  ambassadorId?: string[]
}
interface Pagination {
  total: number
  limit: number
  page: number
  pages: number
}

interface ActivityStore {
  activities: Activity[]
  selectedActivity: Activity | null
  pagination: Pagination
  loading: boolean
  fetchActivities: (filters?: ActivityFilters) => Promise<void>
  fetchActivitiesById: (id: string) =>  Promise<Activity | undefined>
}

export const useActivityStore = create<ActivityStore>((set) => ({
  activities: [],
  loading: false,
  selectedActivity: null,
  pagination: {
    total: 0,
    limit: 10,
    page: 1,
    pages: 1,
  },

  fetchActivities: async () => {
    set({ loading: true })
    try {
      const res = await getActivities()
      set({ activities: res.data || [],
        pagination: res.pagination,
       })
    } catch (err) {
      console.error('Failed to fetch activities:', err)
      toast.error('Failed to load activities')
    } finally {
      set({ loading: false })
    }
  },
  fetchActivitiesById: async (id: string): Promise<Activity | undefined> => {
    set({ loading: true });
    try {
      const res = await getActivitiesById(id);       // ← your API
      set({ selectedActivity: res.data || null });
      return res.data;                               // ←  RETURN it
    } catch (err) {
      console.error('Failed to fetch activity:', err);
      toast.error('Failed to load activity');
    } finally {
      set({ loading: false });
    }
  }
}))
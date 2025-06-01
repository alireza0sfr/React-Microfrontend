import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import type { CustomerState } from "~/application/interfaces/stores/customer-store"

export const useCustomerStore = create<CustomerState>()(
  persist(
    (set, get) => ({
      customers: [],
      /**
   * Adds a customer to the store.
   * @param customer - The customer to add.
   */
      addCustomer: (customer) =>
        set((state) => ({ customers: [...state.customers, customer] })),
      /**
       * Updates a customer in the store.
       * @param customer - The customer to update.
       */
      updateCustomer: (customer) =>
        set((state) => ({ customers: state.customers.map(c => c.id === customer.id ? customer : c) })),
      /**
       * Deletes a customer from the store.
       * @param id - The id of the customer to delete.
       */
      deleteCustomer: (id) =>
        set((state) => ({ customers: state.customers.filter(c => c.id !== id) })),
      /**
       * Gets a customer from the store by id.
       * @param id - The id of the customer to get.
       * @returns The customer or undefined if not found.
       */
      getCustomerById: (id) => {
        const { customers } = get()
        return customers.find(c => c.id === id)
      },
      /**
      * Clears store states.
      */
      flush: () => set({ customers: [] })
    }),
    {
      name: "customer-store",
      storage: createJSONStorage(() => localStorage)
    }
  )
)

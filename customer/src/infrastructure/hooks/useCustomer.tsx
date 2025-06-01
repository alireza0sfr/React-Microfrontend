import type { Customer } from '~/domain/customer'
import { useCustomerStore } from '~/infrastructure/stores/customer-store'

export const useCustomer = () => {
  const addCustomer = useCustomerStore((state) => state.addCustomer)
  const updateCustomer = useCustomerStore((state) => state.updateCustomer)
  const deleteCustomer = useCustomerStore((state) => state.deleteCustomer)
  const validator = useCustomerStore((state) => state.validate)

  const handleAddCustomer = (customer: Customer) => {
    const validateResponse = validator(customer)

    if (validateResponse.success)
      addCustomer(customer)

    return validateResponse
  }

  const handleUpdateCustomer = (customer: Customer) => {
    const validateResponse = validator(customer)

    if (validateResponse.success)
      updateCustomer(customer)

    return validateResponse
  }

  const handleDeleteCustomer = (id: string) => {
    deleteCustomer(id)

    return {
      success: true,
      errors: []
    }
  }

  return {
    addCustomer: handleAddCustomer,
    updateCustomer: handleUpdateCustomer,
    deleteCustomer: handleDeleteCustomer
  }

}
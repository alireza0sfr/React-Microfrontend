import { expect, describe, it } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useCustomer } from "~/infrastructure/hooks/useCustomer"
import { customer } from '../../mock'

describe('useCustomer', () => {
  it('should be defined', () => {
    expect(useCustomer).toBeDefined()
  })

  it('should save a valid customer', () => {
    const { result } = renderHook(() => useCustomer())

    const response = result.current.saveCustomer(customer, 0)
    expect(response.success).toBe(true)
    expect(response.errors).toEqual([])
  })

  it('should not save an invalid customer', () => {
    const { result } = renderHook(() => useCustomer())

    const response = result.current.saveCustomer({ ...customer, email: '' }, 0)
    expect(response.success).toBe(false)
  })

  it('should save a customer', () => {
    const { result } = renderHook(() => useCustomer())

    const response = result.current.saveCustomer(customer, 0)
    expect(response.success).toBe(true)
  })

  it('should not update a customer with an invalid id', () => {
    const { result } = renderHook(() => useCustomer())

    const response = result.current.saveCustomer({ ...customer, id: '' }, 0)
    expect(response.success).toBe(false)
  })

  it('should delete a customer', () => {
    const { result } = renderHook(() => useCustomer())

    const response = result.current.deleteCustomer(customer.id)
    expect(response.success).toBe(true)
  })

})
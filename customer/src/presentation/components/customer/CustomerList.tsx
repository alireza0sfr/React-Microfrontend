import React, { useEffect, useState } from 'react';
import CustomerCard from './CustomerCard';
import { useCustomer } from '~/infrastructure/hooks/useCustomer'
import { Plus, Trash2 } from 'lucide-react'

const CustomersList: React.FC = () => {
  
  const { addCustomer, formErrors, customers, deleteAllCustomers, isEditing } = useCustomer()

  return (
    <div className="p-6 bg-slate-950 min-h-screen w-screen">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-3xl font-bold mb-8 text-slate-100">Customers List</h3>
        
        {formErrors && (
          <div className="whitespace-pre bg-red-950/50 text-red-400 px-4 py-3 rounded-lg mb-6 border border-red-900/50" data-test="formErrors">
            {formErrors}
          </div>
        )}

        <div className="space-y-8">
          <div className="flex gap-4">
            <button 
              onClick={addCustomer} 
              data-test="addBtn" 
              disabled={isEditing}
              className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Customer
            </button>
            <button 
              onClick={deleteAllCustomers}
              disabled={customers.length === 0}
              data-test="deleteAllBtn"
              className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-600 text-white hover:bg-red-700 h-10 px-4 py-2 gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete All
            </button>
          </div>

          <div className={`flex flex-col overflow-y-auto ${formErrors ? 'max-h-[calc(100vh-450px)]' : 'max-h-[calc(100vh-200px)]'} gap-6`}>
            {customers.map((customer, index) => (
              <CustomerCard
                key={index}
                customer={customer}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersList;
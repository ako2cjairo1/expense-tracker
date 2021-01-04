import React, { useReducer, createContext } from "react"
import contextReducer from "./contextReducer"

const initialState = JSON.parse(localStorage.getItem("Expense_Tracker_Transaction")) || []

export const ExpenseTrackerContext = createContext(initialState)

export const Provider = ({ children }) => {
    const [transactions, dispatch] = useReducer(contextReducer, initialState)

    // Action Creators
    const deleteTransaction = (id) => dispatch({ type: "DELETE_TRANSACTION", payload: id })
    const addTransaction = (transaction) => dispatch({ type: "ADD_TRANSACTION", payload: transaction })
    const balance = transactions.reduce((currentValue, newValue) => newValue.type === "Expense" ? currentValue - newValue.amount : currentValue + newValue.amount, 0)

    return (
        <ExpenseTrackerContext.Provider value={{ 
            transactions,
            deleteTransaction,
            addTransaction,
            balance
         }}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}
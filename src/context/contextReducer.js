// Reducer : a function that takes in the old state, and an action => new state
const contextReducer = (state, action) => {
    let transactions

    switch (action.type) {
        case "DELETE_TRANSACTION":
            transactions = state.filter(transaction => transaction.id !== action.payload)
            break
        case "ADD_TRANSACTION":
            transactions = [action.payload, ...state]
            break
        default:
            transactions = state
            break
    }
    
    localStorage.setItem("Expense_Tracker_Transaction", JSON.stringify(transactions))
    return transactions
}

export default contextReducer
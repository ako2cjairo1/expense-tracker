import React from 'react'

export default function InfoCard() {
    const isIncome = Math.round(Math.random())
    return (
        <div style={{ textAlign: "center", padding: "0 10%" }}>
            Try saying: <br /> 
            Add {isIncome ? "Income " : "Expense "} 
            for {isIncome ? "P1000 " : "P250 "} 
            in Category {isIncome ? "Salary " : "Food "} 
            for {isIncome ? "Monday " : "Tuesday "}
        </div>
    )
}

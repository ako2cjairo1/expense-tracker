import React, { useContext, useState, useEffect, useRef } from 'react'
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core"
import { v4 as uid } from "uuid"
import { useSpeechContext } from "@speechly/react-client"

import useStyles from "./styles"
import { ExpenseTrackerContext } from "../../../context/context"
import { incomeCategories, expenseCategories } from "../../../constants/categories"
import formatDate from '../../../utils/formatDate'
import CustomSnackbar from '../../Snackbar/CustomSnackbar'

const initialState = {
    amount: "",
    category: "",
    type: "",
    date: formatDate(new Date())
}

export default function Form() {
    const classes = useStyles()
    const [formData, setFormData] = useState(initialState)
    const { addTransaction } = useContext(ExpenseTrackerContext)
    const { segment } = useSpeechContext()
    const [open, setOpen] = useState(false)
    const handleSpeechly = useRef(() => {})

    const selectedCategories = formData.type === "Income" ? incomeCategories : expenseCategories

    const handleAddTransaction = () => {
        if(!formData.amount 
            || !formData.category 
            || !formData.type 
            || Number.isNaN(Number(formData.amount)) 
            || !formData.date.includes("-")) return

        const newTransaction = { 
            ...formData, 
            id: uid(),
            date: formatDate(formData.date),
            amount: Number(formData.amount)
        }

        setOpen(true)
        addTransaction(newTransaction)
        setFormData(initialState)
    }

    handleSpeechly.current = () => {
        if(segment) {
            if(segment.intent.intent === "add_expense") {
                setFormData({ ...formData, type: "Expense"})
            } else if(segment.intent.intent === "add_income") {
                setFormData({ ...formData, type: "Income" })
            } else if(segment.isFinal && segment.intent.intent === "create_transaction") {
                return handleAddTransaction()
            } else if(segment.isFinal && segment.intent.intent === "cancel_transaction") {
                return setFormData(initialState)
            }
            segment.entities.forEach(e => {
                const category = `${e.value.charAt(0)}${e.value.slice(1).toLocaleLowerCase()}`
                switch (e.type) {
                    case "amount":
                        setFormData({ ...formData, amount: e.value })
                        break;
                    case "category":
                        if(incomeCategories.map(ic => ic.type).includes(category)) {
                            setFormData({ ...formData, type: "Income", category })
                        } else if(expenseCategories.map(ec => ec.type).includes(category)) {
                            setFormData({ ...formData, type: "Expense", category })
                        }
                        setFormData({ ...formData, category: category })
                        break;
                    case "date":
                        setFormData({ ...formData, date: e.value })
                        break;    
                    default:
                        break;
                }
            })

            if(segment.isFinal && formData.amout && formData.category && formData.type && formData.date) {
                handleAddTransaction()
            }
        }
    }

    useEffect(() => {
        handleSpeechly.current()
    }, [segment])

    return (
        <Grid container spacing={2}>
            <CustomSnackbar open={open} setOpen={setOpen} />
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                    {segment && `"${segment.words.map(w => w.value).join(" ")}"`}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select 
                        value={formData.type} 
                        onChange={(e)=>setFormData({ ...formData, type: e.target.value })}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select 
                        value={formData.category} 
                        onChange={(e)=>setFormData({ ...formData, category: e.target.value })}>
                        {selectedCategories.map(({ type }) => (<MenuItem key={type} value={type}>{type}</MenuItem>))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    type="number" 
                    label="Amount" 
                    value={formData.amount} 
                    onChange={(e)=>setFormData({ ...formData, amount: e.target.value })} 
                    fullWidth />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    type="date" 
                    label="Date" 
                    value={formData.date} 
                    onChange={(e)=>setFormData({ ...formData, date: e.target.value })} 
                    fullWidth />
            </Grid>
            <Button 
                className={classes.button} 
                variant="outlined"
                color="primary"
                onClick={handleAddTransaction} 
                fullWidth>
                    Create
            </Button>
        </Grid>
    )
}

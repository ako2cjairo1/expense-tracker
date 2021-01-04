import React, { useContext } from 'react'
import { List as MUIList, ListItem, ListItemAvatar, ListItemText, Avatar, ListItemSecondaryAction, IconButton, Slide, Typography } from "@material-ui/core"
import { Delete, MoneyOff } from "@material-ui/icons"

import { ExpenseTrackerContext } from "../../../context/context"
import useStyles from "./styles"
import formatAmount from "../../../utils/formatAmount"

export default function List() {
    const classes =  useStyles()
    const { transactions, deleteTransaction } = useContext(ExpenseTrackerContext)
    
    const itemDetails = (type, amount, date) => {
        const formattedAmount = formatAmount(type === "Income" ? amount : amount * -1)
        return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>P{formattedAmount}</div>
                <div>{date}</div>
            </div>
        )
    }

    if(transactions && transactions.length <= 0) {
        return (
            <Typography variant="subtitle1" align="center" style={{ lineHeight: "1.5em", marginTop: "20px" }}>
               - No Transactions -
            </Typography>
        )
    }

    return (
        <MUIList dense={false} className={classes.list}>
            {transactions.map(({ id, type, category, amount, date }) => (
                <Slide direction="down" in mountOnEnter unmountOnExit key={id}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={type === "Income" ? classes.avatarIncome : classes.avatarExpense }>
                                <MoneyOff />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={category} secondary={itemDetails(type, amount, date)} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => deleteTransaction(id)}>
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </Slide>
            ))}
        </MUIList>
    )
}

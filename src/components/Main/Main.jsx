import React, { useContext } from 'react'
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from "@material-ui/core"
import useStyles from "./styles"
import Form from './Form/Form';
import List from './List/List';
import { ExpenseTrackerContext } from "../../context/context"
import InfoCard from '../InfoCard';
import formatAmount from "../../utils/formatAmount"

export default function Main() {
    const classes = useStyles()
    const { balance } = useContext(ExpenseTrackerContext)

    return (
        <Card className={classes.root}>
            <CardHeader title="Expense Tracker" subheader="Powered by Speechly" />
            <CardContent>
                <Typography align="center" variant="h5">Total Balance:</Typography>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Typography align="left" variant="h5">PHP</Typography>
                    <Typography align="center" variant="h3"><span style={{ fontWeight: "bolder" }}>{formatAmount(balance)}</span></Typography>
                </div>
                <Typography variant="subtitle1" style={{ lineHeight: "1.5em", marginTop: "20px" }}>
                    <InfoCard />
                </Typography>
                <Divider className={classes.divider} />
                <Form />
            </CardContent>
            <CardContent className={classes.cardContent}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <List />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

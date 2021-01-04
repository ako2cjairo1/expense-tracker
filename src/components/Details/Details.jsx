import React from 'react'
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core"
import { Doughnut } from 'react-chartjs-2'

import useStyles from "./styles"
import useTransactions from "../../useTransactions"
import formatAmount from "../../utils/formatAmount"


export default function Details({ title }) {
    const classes = useStyles()
    const { total, chartData } = useTransactions(title)
    const formattedTotal = formatAmount(title === "Income" ? total : total * -1)

    return (
        <Card className={title === "Income" ? classes.income : classes.expense}>
            <CardHeader title={ title } />
            <CardContent>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Typography align="left" variant="h6">PHP</Typography>
                    <Typography align="center" variant="h4">{formattedTotal}</Typography>
                </div>
                <Doughnut data={chartData} />
            </CardContent> 
        </Card>
    )
}

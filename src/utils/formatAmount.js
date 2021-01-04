export default function formatAmount(amount) {
    console.log(amount)
    const formattedAmount = amount.toString().replace("-","").replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return amount > 0 ? formattedAmount : `(${formattedAmount})`
}
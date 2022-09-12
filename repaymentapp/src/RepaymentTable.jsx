
function RepaymentTable({installments}) {

    const resultPerInstallment = (installment) => {
        
        return (
            <tr>
                <th scope="row">{installment.idx}</th>
                <td>{installment.amount}</td>
                <td>{installment.original}</td>
                <td>{installment.remainingOriginal}</td>
                <td>{installment.profitAmount}</td>
                <td>{installment.kkdf}</td>
                <td>{installment.bsmv}</td>
            </tr>
        )
    }

    return(
        <div className="container">
                <div className="row">
                    <h2>Items</h2>
                </div>
                <div className="row">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Installment Number</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Original</th>
                                <th scope="col">Remaining Original</th>
                                <th scope="col">Profit Amount</th>
                                <th scope="col">KKDF</th>
                                <th scope="col">BSMV</th>
                            </tr>
                        </thead>
                        <tbody>
                            {installments.map(resultPerInstallment)}
                        </tbody>
                    </table>
                </div>
            </div>
    )
}

export default RepaymentTable;
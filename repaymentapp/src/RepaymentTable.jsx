import './RepaymentTable.css';

function RepaymentTable(props) {

    const resultPerInstallment = (installment) => {
        if(!installment.idx) return;
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
        (props.trigger) && (
        <div className="popup">
            <div className="popup-inner">
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
                                {props.installments.map(resultPerInstallment)}
                            </tbody>
                        </table>
                    </div>
                    <button className='close-btn' onClick={() => props.setTrigger(false)}>Close Table</button>
                    
                </div>

        </div>
        )
    ) 
}

export default RepaymentTable;
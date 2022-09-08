
function Result(props) {
    
    
    return (
        <div>
            <div className="result-container">
                <p>Total Repay: {props.totalRepay}</p> 
                <p>Installment Amount: {props.installmentPerInterval}</p> 
                <p>Total BSMV Tax: {props.totalBSMV}</p> 
                <p>Total KKDF Tax: {props.totalKKDF}</p> 
            </div>
            <button className="open-table-btn" onClick={() => console.log("repayment table is opening")}>Show Repayment Table</button>
        </div>
    )
}

export default Result;
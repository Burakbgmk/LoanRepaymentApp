
function Result(props) {
    
    const showResult = (totalRepay,installmentPerInterval,totalBSMV,totalKKDF) => {
        return(
            <div>
                <div className="result-container">
                    <p>Total Repay: {totalRepay}</p> 
                    <p>Installment Amount: {installmentPerInterval}</p> 
                    <p>Total BSMV Tax: {totalBSMV}</p> 
                    <p>Total KKDF Tax: {totalKKDF}</p> 
                </div>
            </div>
        )
    }


    return (
        (props.trigger) ? showResult(props.totalRepay,props.installmentPerInterval,props.totalBSMV,props.totalKKDF) : showResult("","","","")
    )
}

export default Result;
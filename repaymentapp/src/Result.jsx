
function Result(props) {
    
    const showResult = (results) => {
        return(
            <div>
                <div className="result-container">
                    <p>Total Repay: {results.totalRepay}</p> 
                    <p>Installment Amount: {results.installmentPerInterval}</p> 
                    <p>Total BSMV Tax: {results.totalBSMV}</p> 
                    <p>Total KKDF Tax: {results.totalKKDF}</p> 
                </div>
            </div>
        )
    }


    return (
        (props.trigger) ? showResult(props.results) : showResult("","","","")
    )
}

export default Result;
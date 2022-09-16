import {ThemeContext} from "../context/ThemeContext";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";

function Result(props) {
    const theme = useContext(ThemeContext);
    const data = useContext(DataContext);
    const showResult = (results) => {
        return(
                <div className="result-show">
                    <p>Total Repay: {results.totalRepay}</p> 
                    <p>Installment Amount: {results.installmentPerInterval}</p> 
                    <p>Total BSMV Tax: {results.totalBSMV}</p> 
                    <p>Total KKDF Tax: {results.totalKKDF}</p> 
                </div>
        )
    }


    return (
        <div style={theme}>
            {(props.trigger) ? showResult(data) : showResult("","","","")}
        </div>
    )
}

export default Result;
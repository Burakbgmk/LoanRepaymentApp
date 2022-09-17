import {ThemeContext} from "../context/ThemeContext";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";

function Result(props) {
    const theme = useContext(ThemeContext);
    const data = useContext(DataContext);
    const showResult = (results) => {
        return(
                <div className="result-show">
                    <table className="results-table">
                        <tbody>
                            <tr>
                                <td>Total Repay:</td>
                                <td>{results.totalRepay}</td>
                            </tr>
                            <tr>
                                <td>Installment Amount:</td>
                                <td>{results.installmentPerInterval}</td>
                            </tr>
                            <tr>
                                <td>Total BSMV Tax:</td>
                                <td>{results.totalBSMV}</td>
                            </tr>
                            <tr>
                                <td>Total KKDF Tax:</td>
                                <td>{results.totalKKDF}</td>
                            </tr>
                        </tbody>
                    </table>
                    {/* <p>Total Repay: {results.totalRepay}</p> 
                    <p>Installment Amount: {results.installmentPerInterval}</p> 
                    <p>Total BSMV Tax: {results.totalBSMV}</p> 
                    <p>Total KKDF Tax: {results.totalKKDF}</p>  */}
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
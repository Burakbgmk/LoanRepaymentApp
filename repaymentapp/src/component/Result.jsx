import {ThemeContext} from "../context/ThemeContext";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";
import {numberWithCommas} from '../common/Formatting';

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
                                <td>{numberWithCommas(results.totalRepay)}</td>
                            </tr>
                            <tr>
                                <td>Installment Amount:</td>
                                <td>{numberWithCommas(results.installmentPerInterval)}</td>
                            </tr>
                            <tr>
                                <td>Total BSMV Tax:</td>
                                <td>{numberWithCommas(results.totalBSMV)}</td>
                            </tr>
                            <tr>
                                <td>Total KKDF Tax:</td>
                                <td>{numberWithCommas(results.totalKKDF)}</td>
                            </tr>
                        </tbody>
                    </table>
                    
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
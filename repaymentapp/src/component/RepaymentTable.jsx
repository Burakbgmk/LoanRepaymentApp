import '../styling/RepaymentTable.css';
import {ThemeContext} from "../context/ThemeContext";
import { DataContext } from '../context/DataContext';
import {useContext} from 'react';
import {exportPDF} from '../common/PdfExport';
import "jspdf-autotable";
import {numberWithCommas} from '../common/Formatting';

function RepaymentTable(props) {
    const theme = useContext(ThemeContext);
    const data = useContext(DataContext);
    const resultPerInstallment = (installment) => {
        if(!installment.idx) return;
        let key = installment.idx+1;
        return (
            <tr key={key} style={theme} className='trBody'>
                <th>{numberWithCommas(installment.idx)}</th>
                <td>{numberWithCommas(installment.amount)}</td>
                <td>{numberWithCommas(installment.original)}</td>
                <td>{numberWithCommas(installment.remainingOriginal)}</td>
                <td>{numberWithCommas(installment.profitAmount)}</td>
                <td>{numberWithCommas(installment.kkdf)}</td>
                <td>{numberWithCommas(installment.bsmv)}</td>
            </tr>
        )
    }


    

    
    return(
        (props.trigger) && (
        <div  className="popup" >
            <div className="popup-inner" style={theme}>
                <div className="pop-up-header">
                    <h2>Loan Payment Schedule</h2>
                </div>
                <div className='pop-up-body'>
                    <table className="table">
                        <thead className='thead'>
                            <tr className='trHead'>
                                <th scope="th">Installment Number</th>
                                <th scope="th">Amount</th>
                                <th scope="th">Original</th>
                                <th scope="th">Remaining Original</th>
                                <th scope="th">Profit Amount</th>
                                <th scope="th">KKDF</th>
                                <th scope="th">BSMV</th>
                            </tr>
                        </thead>
                        <tbody className='tbody'>
                            {data.map(resultPerInstallment)}
                        </tbody>
                    </table>
                </div>
                <button className='close-btn' onClick={() => props.setTrigger(false)}>Close Table</button>
                <button className='pdf-btn' onClick={() => exportPDF(data)}>Download <i className="fa fa-file-pdf-o"></i></button>
            </div>
        </div>
        )
    ) 
}

export default RepaymentTable;
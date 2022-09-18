import { useImperativeHandle } from "react";
import { useState, useRef, forwardRef, useContext } from "react";
import {ThemeContext} from "../context/ThemeContext";
import "../styling/UserInput.css";

function UserInput(props, ref) {
    const [loanAmount,setLoanAmount] = useState(0);
    const [numberOfInstallments,setNumberOfInstallments] = useState(0);
    const [interval, setInterval] = useState(0);
    const [profitRate,setProfitRate] = useState(0);
    const [profitRateInterval, setProfitRateInterval] = useState(0);
    const [bsmvTaxRate,setBsmvTaxRate] = useState(0);
    const [kkdfTaxRate,setKkdfTaxRate] = useState(0);
    const [calculationType, setCalculationType] = useState(0);

    const loanField = useRef();
    const installmentNumberField = useRef();
    const profitRateField = useRef();
    const bsmvField = useRef();
    const kkdfField = useRef();
    const typeField = useRef();
    const intervalField = useRef();
    const rateIntervalField = useRef();

    const theme = useContext(ThemeContext);

    useImperativeHandle(ref, () => ({
        callInputs: () => {
            calculateButtonPressed();
        },
        warnInput: (empthyInputs) => {
            if(empthyInputs.some(x => x === "loanAmount")) loanField.current.placeholder = "Compulsory Area";
            else loanField.current.placeholder = "";
            if(empthyInputs.some(x => x === "numberOfInstallments")) installmentNumberField.current.placeholder = "Compulsory Area";
            else installmentNumberField.current.placeholder = "";
            if(empthyInputs.some(x => x === "profitRate")) profitRateField.current.placeholder = "Compulsory Area";
            else profitRateField.current.placeholder = "";
            if(empthyInputs.some(x => x === "bsmvTaxRate")) bsmvField.current.placeholder = "Compulsory Area";
            else bsmvField.current.placeholder = "";
            if(empthyInputs.some(x => x === "kkdfTaxRate")) kkdfField.current.placeholder = "Compulsory Area";
            else kkdfField.current.placeholder = "";
            if(empthyInputs.some(x => x === "calculationType")) typeField.current.innerText = "Please select..";
            else typeField.current.innerText = "";
            if(empthyInputs.some(x => x === "interval")) intervalField.current.innerText = "Please select..";
            else intervalField.current.innerText = "";
            if(empthyInputs.some(x => x === "profitRateInterval")) rateIntervalField.current.innerText = "Please select..";
            else rateIntervalField.current.innerText = "";
        }
    }));


    const calculateButtonPressed = () => {
        props.updateInputParams({
            loanAmount : loanAmount,
            numberOfInstallments : numberOfInstallments,
            interval : interval,
            profitRate : profitRate,
            profitRateInterval : profitRateInterval,
            bsmvTaxRate : bsmvTaxRate,
            kkdfTaxRate : kkdfTaxRate,
            calculationType : calculationType,
        });
    }

    return (
        <div style={theme}>
            <div className="input-container">
                <div className="input-row">
                    <div className="label-col">
                        <label htmlFor="loan-field">Loan Amount</label>
                    </div>
                    <div className="input-col">
                        <input 
                        id="loan-field"
                        type="number"
                        onChange={(e) => setLoanAmount(e.target.value)}
                        ref={loanField} />
                    </div>
                </div>
                <div className="input-row">
                    <label htmlFor="ins-number-field">Number of installments</label>
                    <input 
                    id="ins-number-field"
                    type="number"
                    onChange={(e) => setNumberOfInstallments(e.target.value)}
                    ref={installmentNumberField}
                     />
                </div>
                <div className="input-row">
                    <label htmlFor="profit-rate-field">Profit Rate</label>
                    <input 
                    id="profit-rate-field"
                    type="number"
                    onChange={(e) => setProfitRate(e.target.value)}
                    ref={profitRateField} />
                    <select onChange={(e) => setProfitRateInterval(e.target.value)}>
                        <option ref={rateIntervalField} value={0}></option>
                        <option value={52}>Per Week</option>
                        <option value={12}>Per Month</option>
                        <option value={1}>Per Year</option>
                    </select>

                </div>
                <div className="input-row">
                    <label htmlFor="bsmv">BSMV</label>
                    <input id="bsmv" type="number" name ="tax1" ref={bsmvField} onChange={(e) => {setBsmvTaxRate(e.target.value)}}/>
                </div>
                <div className="input-row">    
                    <label htmlFor="kkdf">KKDF</label>
                    <input id="kkdf" type="number" name ="tax2" ref={kkdfField} onChange={(e) => {setKkdfTaxRate(e.target.value)}}/>
                </div>
                <div className="input-row">
                    <label htmlFor="repayment-interval">Repayment Interval</label>
                    <select id="repayment-interval" onChange={(e) => setInterval(e.target.value)}>
                        <option ref={intervalField} value={0}></option>
                        <option value={52}>Weekly</option>
                        <option value={12}>Monthly</option>
                        <option value={1}>Annual</option>
                    </select>
                </div>
                <div className="input-row">
                    <label htmlFor="interest-type">Interest Type</label>
                    <select id="interest-type" onChange={(e) => setCalculationType(e.target.value)}>
                        <option ref={typeField} value={0}></option>
                        <option value={1}>Simple</option>
                        <option value={2}>Compound</option>
                    </select>
                </div>
            </div>
            
        </div>
    );
}

export default forwardRef(UserInput);
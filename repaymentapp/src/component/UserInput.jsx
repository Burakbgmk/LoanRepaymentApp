import { useImperativeHandle } from "react";
import { useState, useRef, forwardRef, useContext } from "react";
import {ThemeContext} from "../context/ThemeContext";

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

    const theme = useContext(ThemeContext);

    useImperativeHandle(ref, () => ({
        callInputs: () => {
            calculateButtonPressed();
        },
        shakeInput: (isEmpthy) => {
            //inputRef.current.focus();
            if(isEmpthy){
                loanField.current.placeholder = "Compulsory Area";
                installmentNumberField.current.placeholder = "Compulsory Area";
                profitRateField.current.placeholder = "Compulsory Area";
                bsmvField.current.placeholder = "Compulsory Area";
                kkdfField.current.placeholder = "Compulsory Area";
            } 
            
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
                <div className="row">
                    <div className="col">
                        <label htmlFor="loan-field">Loan Amount</label>
                        <input 
                        id="loan-field"
                        type="number"
                        onChange={(e) => setLoanAmount(e.target.value)}
                        ref={loanField} />
                    </div>
                    <div className="col">
                        <label htmlFor="ins-number-field">Number of installments</label>
                        <input 
                        id="ins-number-field"
                        type="number"
                        onChange={(e) => setNumberOfInstallments(e.target.value)}
                        ref={installmentNumberField} />
                    </div>
                    <div className="col">
                        <label htmlFor="profit-rate-field">Profit Rate</label>
                        <input 
                        id="profit-rate-field"
                        type="number"
                        onChange={(e) => setProfitRate(e.target.value)}
                        ref={profitRateField} />
                        <label htmlFor="per-week">Per Week</label>
                        <input id="per-week" type="radio" name="per-interval" onClick={() => {setProfitRateInterval(52)}}/>
                        <label htmlFor="per-month">Per Month</label>
                        <input id="per-month" type="radio" name="per-interval" onClick={() => {setProfitRateInterval(12)}} />
                        <label htmlFor="per-year">Per Year</label>
                        <input id="per-year" type="radio" name="per-interval" onClick={() => {setProfitRateInterval(1)}}/>

                    </div>
                    <div className="col">
                        <label htmlFor="weekly">Weekly</label>
                        <input id="weekly" type="radio" name ="interval" onClick={() => {setInterval(52)}}/> <br />
                        <label htmlFor="monthly">Monthly</label>
                        <input id="monthly" type="radio" name ="interval" onClick={() => {setInterval(12)}}/> <br />
                        <label htmlFor="annual">Annual</label>
                        <input id="annual" type="radio" name ="interval" onClick={() => {setInterval(1)}}/>
                    </div>
                    <div className="col">
                        <label htmlFor="bsmv">BSMV</label>
                        <input id="bsmv" type="number" name ="tax1" ref={bsmvField} onChange={(e) => {setBsmvTaxRate(e.target.value)}}/> <br />
                        <label htmlFor="kkdf">KKDF</label>
                        <input id="kkdf" type="number" name ="tax2" ref={kkdfField} onChange={(e) => {setKkdfTaxRate(e.target.value)}}/>
                    </div>
                    <div className="col">
                        <label htmlFor="simple">Simple Interest</label>
                        <input id="simple" type="radio" name ="calc-type" onClick={() => {setCalculationType(1)}}/> <br />
                        <label htmlFor="compound">Compound Interest</label>
                        <input id="compound" type="radio" name ="calc-type" onClick={() => {setCalculationType(2)}}/>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default forwardRef(UserInput);
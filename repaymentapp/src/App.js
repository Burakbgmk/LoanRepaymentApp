import { useEffect, useRef, useState } from 'react';
import './App.css';
import Result from './Result';
import UserInput from './UserInput';
import RepaymentTable from './RepaymentTable';
import {calculateResult, calculateInstallments} from './Calculations.js';


function App() {
  const [inputs, setInputs] = useState([]);
  const [totalRepay, setTotalRepay] = useState(0);
  const [installmentPerInterval, setInstallmentPerInterval] = useState(0);
  const [totalBSMV, setTotalBSMV] = useState(0);
  const [totalKKDF, setTotalKKDF] = useState(0);
  const [installments, setInstallments] = useState([]);
  const [displayTable, setDisplayTable] = useState(false);
  const [displayResult, setDisplayResult] = useState(false);

  const inputButton = useRef(null);

  useEffect(() => {
    if(inputs.length === 0) return;

    const inputValidator = () => {
      if(inputs.loanAmount === 0 || inputs.loanAmount === "" || inputs.loanAmount === "0"){
        alert("loan amount cannot be zero!");
        setDisplayResult(false);
        return;
      }
      else if(inputs.numberOfInstallments === 0 || inputs.numberOfInstallments === "" || inputs.numberOfInstallments === "0"){
        alert("installment number cannot be zero!");
        setDisplayResult(false);
        return;
      }
      else if(inputs.interval === 0 || inputs.interval === "" || inputs.interval === "0"){
        alert("interval should be checked!");
        setDisplayResult(false);
        return;
      }
      else if(inputs.profitRateInterval === 0){
        alert("profit interval should be checked!");
        setDisplayResult(false);
        return;
      }
      else if(inputs.calculationType === 0){
        alert("calculation type should be checked!");
        setDisplayResult(false);
        return;
      }
      else setDisplayResult(true);
    }
    inputValidator();

    let results = calculateResult(
      inputs.calculationType,
      inputs.profitRate,
      inputs.profitRateInterval,
      inputs.interval,
      inputs.loanAmount,
      inputs.numberOfInstallments,
      inputs.bsmvTaxRate,
      inputs.kkdfTaxRate
      )

    setTotalRepay(results.totalRepay);
    setInstallmentPerInterval(results.installmentPerInterval);
    setTotalBSMV(results.totalBSMV);
    setTotalKKDF(results.totalKKDF);

    let installments = calculateInstallments(
      inputs.calculationType,
      inputs.profitRate,
      inputs.profitRateInterval,
      inputs.interval,
      inputs.numberOfInstallments,
      inputs.loanAmount,
      inputs.kkdfTaxRate,
      inputs.bsmvTaxRate
      )
    setInstallments(installments);

  },[inputs])

  const updateInputs = (inputParams) => {
     if(!(Object.keys(inputs).every(
          key => inputParams.hasOwnProperty(key)
              && inputParams[key] === inputs[key]))) setDisplayTable(false);
    setInputs(inputParams);
  }

  const calculateButtonClicked = () => {
    inputButton.current.callInputs();
    inputButton.current.shakeInput();
  }

  return (
    <main>
      <div>
        <div className='static-container'>
          <div className='input-container'>
            <UserInput 
            updateInputParams={updateInputs}
            ref={inputButton}
            /> 
          </div>
          <div className='calculatebtn-container'>
            <button onClick={calculateButtonClicked}>Calculate</button>
          </div>
          <div className='result-container'>
          <Result 
          totalRepay = {totalRepay}
          installmentPerInterval = {installmentPerInterval}
          totalBSMV = {totalBSMV}
          totalKKDF = {totalKKDF}
          trigger = {displayResult}
          />
          {
          (displayResult) && (<button 
          className="open-table-btn" 
          onClick={() => {setDisplayTable(true)}}>Show Repayment Table</button>)
          }
          </div>
        </div>
        <div className='pop-up-container'>
          {
            <RepaymentTable
              installments = {installments}
              trigger = {displayTable}
              setTrigger = {setDisplayTable}
            />
          }
        </div>
      </div>
      
      
    </main>
    
  );
}

export default App;

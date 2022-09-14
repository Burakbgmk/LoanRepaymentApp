import { useEffect, useRef, useState } from 'react';
import './App.css';
import Result from './Result';
import UserInput from './UserInput';
import RepaymentTable from './RepaymentTable';


function App() {
  const [inputs, setInputs] = useState([]);
  const [totalRepay, setTotalRepay] = useState(0);
  const [installmentPerInterval, setInstallmentPerInterval] = useState(0);
  const [totalBSMV, setTotalBSMV] = useState(0);
  const [totalKKDF, setTotalKKDF] = useState(0);
  const prevRemainingOriginal = useRef();
  const [installments, setInstallments] = useState([]);
  const [displayTable, setDisplayTable] = useState(false);
  const [displayResult, setDisplayResult] = useState(false);

  const inputButton = useRef(null);

  const Round = (n) => {
    return (Math.round((n + Number.EPSILON) * 100) / 100)+"";
  }

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
    



    const interestRate = () => {
      if(inputs.calculationType === 1)
      {
        let annualRate = Number(inputs.profitRate) * Number(inputs.profitRateInterval);
        return annualRate/Number(inputs.interval);
      }
      else
      {
        return ((1+Number(inputs.profitRate))**(Number(inputs.profitRateInterval)/Number(inputs.interval)))-1
      }
    }
    let i = interestRate() + Number(inputs.bsmvTaxRate) + Number(inputs.kkdfTaxRate);
    let P = Number(inputs.loanAmount);
    let n = Number(inputs.numberOfInstallments);
    let bsmv = Number(inputs.bsmvTaxRate);
    let kkdf = Number(inputs.kkdfTaxRate);
    var installmentAmount = P*((i*(i+1)**n)/(((i+1)**n)-1));
    let totalPayment = installmentAmount*12;
    setInstallmentPerInterval(Round(installmentAmount));
    setTotalRepay(Round(totalPayment));
    setTotalBSMV(Round((totalPayment-P)*bsmv/i));
    setTotalKKDF(Round((totalPayment-P)*kkdf/i));

    const calculateInstallments = (count) => {
      var installmentsArray = new Array(count);
      for(let i=0; i<count; i++)
      {
        let prevRemaining = inputs.loanAmount;
        if(i>0) prevRemaining = prevRemainingOriginal.current;
        let idx = i+1;
        let amount = Round(installmentAmount);
        let profitAmount =  Round(prevRemaining * interestRate());
        let kkdf = Round(prevRemaining * Number(inputs.kkdfTaxRate));
        let bsmv = Round(prevRemaining * Number(inputs.bsmvTaxRate));
        let original = Round(amount - profitAmount - kkdf - bsmv);
        let remainingOriginal = Round(prevRemaining-original);
        prevRemainingOriginal.current =remainingOriginal;
        let installment = {idx, amount ,original, remainingOriginal, profitAmount, kkdf, bsmv};
        installmentsArray.push(installment);
        
      }
      setInstallments(installmentsArray);
    }

    calculateInstallments(inputs.numberOfInstallments);

  },[inputs])

  const updateInputs = (inputParams) => {
     if(!(Object.keys(inputs).every(
          key => inputParams.hasOwnProperty(key)
              && inputParams[key] === inputs[key]))) setDisplayTable(false);
    setInputs(inputParams);
  }

  

  return (
    <main>
      <div>
        <div className='static-container'>
          <div className='input-container'>
            <UserInput 
            updateInputParams={updateInputs}

            /> 
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

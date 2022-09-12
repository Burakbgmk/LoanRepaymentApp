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

  

  useEffect(() => {
    if(inputs.length === 0) return;
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
    setInstallmentPerInterval(installmentAmount);
    setTotalRepay(totalPayment);
    setTotalBSMV((totalPayment-P)*bsmv/i);
    setTotalKKDF((totalPayment-P)*kkdf/i);

    const calculateInstallments = (count) => {
      var installmentsArray = new Array(count);
      for(let i=0; i<count; i++)
      {
        let prevRemaining = inputs.loanAmount;
        if(i>0) prevRemaining = prevRemainingOriginal.current;
        let idx = i+1;
        let amount = installmentAmount;
        let profitAmount =  prevRemaining * interestRate();
        let kkdf = prevRemaining * Number(inputs.kkdfTaxRate);
        let bsmv = prevRemaining * Number(inputs.bsmvTaxRate);
        let original = amount - profitAmount - kkdf - bsmv;
        let remainingOriginal = prevRemaining-original
        prevRemainingOriginal.current =remainingOriginal;
        let installment = {idx, amount ,original, remainingOriginal, profitAmount, kkdf, bsmv};
        installmentsArray.push(installment);
        
      }
      setInstallments(installmentsArray);
    }

    calculateInstallments(inputs.numberOfInstallments);

  },[inputs])

  const updateInputs = (inputParams) => {
    if(inputs.values !== inputParams.values) setDisplayTable(false);
    setInputs(inputParams);
  }

  

  return (
    <main>
      <div>
        <UserInput updateInputParams={updateInputs}/>
        {
          (inputs.length !== 0) && (<div>
          <Result 
          totalRepay = {totalRepay}
          installmentPerInterval = {installmentPerInterval}
          totalBSMV = {totalBSMV}
          totalKKDF = {totalKKDF}
          />
          <button className="open-table-btn" onClick={() => {setDisplayTable(true)}}>Show Repayment Table</button>
          </div>)
        }
        {
          (displayTable) && (<RepaymentTable
            installments = {installments}
          />)
        }
        
      </div>
      
      
    </main>
    
  );
}

export default App;

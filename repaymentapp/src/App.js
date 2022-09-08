import { useEffect, useState } from 'react';
import './App.css';
import Result from './Result';
import UserInput from './UserInput';


function App() {
  const [inputs, setInputs] = useState([]);
  const [totalRepay, setTotalRepay] = useState(0);
  const [installmentPerInterval, setInstallmentPerInterval] = useState(0);
  const [totalBSMV, setTotalBSMV] = useState(0);
  const [totalKKDF, setTotalKKDF] = useState(0);

  

  useEffect(() => {
    const calculateResult = () => {
      
      var interestRate;
      if(inputs.calculationType === 1)
      {
        let annualRate = Number(inputs.profitRate) * Number(inputs.profitRateInterval);
        interestRate = annualRate/Number(inputs.interval);
      }
      else
      {
        interestRate = ((1+Number(inputs.profitRate))**(Number(inputs.profitRateInterval)/Number(inputs.interval)))-1
      }
      let i = interestRate + Number(inputs.bsmvTaxRate) + Number(inputs.kkdfTaxRate);
      let P = Number(inputs.loanAmount);
      let n = Number(inputs.numberOfInstallments);
      let bsmv = Number(inputs.bsmvTaxRate);
      let kkdf = Number(inputs.kkdfTaxRate);
      let installmentAmount = P*((i*(i+1)**n)/(((i+1)**n)-1));
      let totalPayment = installmentAmount*12;
      setInstallmentPerInterval(installmentAmount);
      setTotalRepay(totalPayment);
      setTotalBSMV((totalPayment-P)*bsmv/i);
      setTotalKKDF((totalPayment-P)*kkdf/i);
    }
    calculateResult();
  },[inputs])

  const updateInputs = (inputParams) => {
    setInputs(inputParams);
  }

  return (
    <main>
      <div>
        <UserInput updateInputParams={updateInputs}/>
        {
          (inputs.length !== 0) && (<Result 
          totalRepay = {totalRepay}
          installmentPerInterval = {installmentPerInterval}
          totalBSMV = {totalBSMV}
          totalKKDF = {totalKKDF}
          />)
        }
        
      </div>
      
      
    </main>
    
  );
}

export default App;

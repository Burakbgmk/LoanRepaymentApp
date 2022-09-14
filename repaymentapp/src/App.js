import { useEffect, useRef, useState } from 'react';
import './App.css';
import Result from './Result';
import UserInput from './UserInput';
import RepaymentTable from './RepaymentTable';
import {calculateResult, calculateInstallments} from './Calculations.js';
import {validateNumber} from './Validator.js';


function App() {
  const [inputs, setInputs] = useState([]);
  const [installments, setInstallments] = useState([]);
  const [results, setResults] = useState([]);
  const [displayTable, setDisplayTable] = useState(false);
  const [displayResult, setDisplayResult] = useState(false);
  const inputButton = useRef(null);

  useEffect(() => {
    if(inputs.length === 0) return;

    Object.values(inputs).forEach(x=> {
      if(validateNumber(x) === false)
      {
        setDisplayResult(false);
        return;
      }
      else setDisplayResult(true);
    })
    

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

    setResults(results);

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
          results = {results}
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

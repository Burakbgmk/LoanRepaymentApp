import { useEffect, useRef, useState } from 'react';
import './styling/App.css';
import Result from './component/Result';
import UserInput from './component/UserInput';
import RepaymentTable from './component/RepaymentTable';
import {calculateResult, calculateInstallments} from './common/Calculations.js';
import {validateInputs} from './common/Validator.js';
import {ThemeContext, themes} from './context/ThemeContext';
import {DataContext} from './context/DataContext';
import CustomHeader from './component/CustomHeader';

function App() {
  const [inputs, setInputs] = useState([]);
  const [results, setResults] = useState([]);
  const [installments, setInstallments] = useState([]);
  const [displayResult, setDisplayResult] = useState(false);
  const [displayTable, setDisplayTable] = useState(false);
  const [theme, setTheme] = useState(themes.light);
  const inputButton = useRef(null);

  useEffect(() => {
    if(inputs.length === 0) return;

    if(validateInputs(inputs)) setDisplayResult(true);
    else setDisplayResult(false);
    
    let results = calculateResult({...inputs});
    setResults(results);

    let installments = calculateInstallments({...inputs});
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
    inputButton.current.shakeInput(!displayResult);
    
  }

  const toggleTheme = () => {
    if(theme === themes.dark){
      setTheme(themes.light);
    }
    else{
      setTheme(themes.dark);
    }
  }

  return (
    <main>
      <ThemeContext.Provider value={theme}>
        <header>
          <CustomHeader 
          toggleTheme={toggleTheme} 
          />
        </header>
        <body style={theme}>
          <DataContext.Provider value={results}>
            <div className='static-container'>
              <div className='input-container'>
                <UserInput 
                updateInputParams={updateInputs}
                ref={inputButton}
                /> 
                <button onClick={calculateButtonClicked}>Calculate</button>
              </div>
              <div className='result-container'>
                <Result 
                trigger = {displayResult}
                />
                {
                (displayResult) && (<button 
                className="open-table-btn" 
                onClick={() => {setDisplayTable(true)}}>Show Repayment Table</button>)
                }
              </div>
            </div>
          </DataContext.Provider>
          <DataContext.Provider value={installments}>
            <div className='pop-up-container'>
              {
                <RepaymentTable
                  trigger = {displayTable}
                  setTrigger = {setDisplayTable}
                />
              }
            </div>
          </DataContext.Provider>
        </body>
      </ThemeContext.Provider>
    </main>
    
  );
}

export default App;

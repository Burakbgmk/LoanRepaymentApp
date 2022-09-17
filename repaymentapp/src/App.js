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

    if(validateInputs(inputs).isValid){
      setDisplayResult(true);
      inputButton.current.warnInput(validateInputs(inputs).arr);
    } 
    else {
      setDisplayResult(false);
      inputButton.current.warnInput(validateInputs(inputs).arr);
    }
    
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
        <div className='inner-main' style={theme}>
          <header>
            <CustomHeader 
            toggleTheme={toggleTheme} 
            />
          </header>
          <div className='body-container'>
            <DataContext.Provider value={results}>
              <div className='static-container'>
                <div className='input-container'>
                  <div className='input-inner'>
                    <UserInput 
                    updateInputParams={updateInputs}
                    ref={inputButton}
                    /> 
                    <div className='calculate-btn-container'>
                      <button className='calculate-btn' onClick={calculateButtonClicked}>Calculate</button>
                    </div>
                  </div>
                </div>
                <div className='result-container'>
                  <div className='result-inner'>
                    <Result 
                    trigger = {displayResult}
                    />
                    <div className='popup-btn-container'>
                      {
                      (displayResult) && (<button 
                      className="open-table-btn" 
                      onClick={() => {setDisplayTable(true)}}>Show Repayment Table</button>)
                      }
                    </div>
                  </div>
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
          </div>

        </div>
      </ThemeContext.Provider>
    </main>
    
  );
}

export default App;

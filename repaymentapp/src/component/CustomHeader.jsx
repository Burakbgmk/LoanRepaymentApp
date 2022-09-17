import { useContext } from "react";
import {ThemeContext, themes} from "../context/ThemeContext";


function CustomHeader(props) {

    const theme = useContext(ThemeContext);

    return(
        <div className='header-container' style={theme}>
            <div className='themebtn-container'>
                <button onClick={props.toggleTheme}>
                {theme === themes.dark ? "Dark Theme" : "Light Theme"}
                </button>
            </div>
            
            <div className='headertext-container'>
                <div className="headertext-inner">
                    <h1>Loan Repayment Calculator</h1>  
                </div>
            </div>
        </div>
    )
}

export default CustomHeader;
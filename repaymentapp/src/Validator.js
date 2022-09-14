


export function validateNumber(value) {
    if(value === 0 || value === "" || value === "0"){
            alert("Value cannot be zero or empthy!");
            return false;
    }
    
}
export function validateRadioButton(value) {
    if(value === 0){
        alert("Radio button should be checked!");
        return false;
    }
}
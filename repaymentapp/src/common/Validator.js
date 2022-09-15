


export function validate(value) {
    if(value === 0 || value === "" || value === "0"){
            //alert("Compulsory area!");
            return false;
    }
}

export function validateInputs(inputs) {
    return !(Object.values(inputs).some(value => (value === 0 || value === "" || value === "0")))
}

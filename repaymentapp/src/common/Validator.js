
export function validateInputs(inputs) {
    const validationFunction = (value) => (value === 0 || value === "" || value === "0");
    let isValid = !(Object.values(inputs).some(validationFunction));
    let arr = new Array(0);
    Object.entries(inputs).forEach(x => {
        if(x[1] === 0 || x[1] === "" || x[1] === "0"){
            arr.push(x[0]);
        }
    })
    console.log(arr);
    return {isValid,arr};
}


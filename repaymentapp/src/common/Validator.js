



export function validateInputs(inputs) {
    return !(Object.values(inputs).some(value => (value === 0 || value === "" || value === "0")))
}

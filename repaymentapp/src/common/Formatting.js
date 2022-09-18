
export function numberWithCommas(x) {
    if(x === 0 || x === "" || x === "0" || x === undefined || x === null){
        return x;
    }
    else{
        var parts = x.toString().split(".");
        parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
        return parts.join(",");
    } 
}
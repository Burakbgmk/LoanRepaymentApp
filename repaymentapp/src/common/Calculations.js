

const customRound = (n) => {
    return (Math.round((n + Number.EPSILON) * 100) / 100 +"");
    }

const interestRate = (type, profitRate, profitRateInterval, interval) => {
        if(Number(type) === 1)
        {
            return (Number(profitRate) * Number(profitRateInterval))/Number(interval);
        }
        else if(Number(type) === 2)
        {
            return ((1+Number(profitRate))**(Number(profitRateInterval)/Number(interval)))-1;
        }
    }

export function calculateResult ({calculationType, profitRate, profitRateInterval, interval, loanAmount, numberOfInstallments, bsmvTaxRate, kkdfTaxRate}) {
        let i = interestRate(calculationType ,profitRate, profitRateInterval, interval) + Number(bsmvTaxRate) + Number(kkdfTaxRate);
        let P = Number(loanAmount);
        let n = Number(numberOfInstallments);
        let installmentPerInterval = customRound(P*((i*(i+1)**n)/(((i+1)**n)-1)));
        let totalPayment = (P*((i*(i+1)**n)/(((i+1)**n)-1)))*12;
        let totalRepay = customRound(totalPayment);
        let totalBSMV = customRound((totalPayment-P)*Number(bsmvTaxRate)/i);
        let totalKKDF =  customRound((totalPayment-P)*Number(kkdfTaxRate)/i);
        return {totalRepay, installmentPerInterval, totalBSMV, totalKKDF};
    }

export function calculateInstallments ({calculationType ,profitRate, profitRateInterval, interval, numberOfInstallments, loanAmount, kkdfTaxRate, bsmvTaxRate}) {
        let i = interestRate(calculationType ,profitRate, profitRateInterval, interval) + Number(bsmvTaxRate) + Number(kkdfTaxRate);
        let P = Number(loanAmount);
        let n = Number(numberOfInstallments);
        let installmentAmount = P*((i*(i+1)**n)/(((i+1)**n)-1));
        var installmentsArray = new Array(n);
        var prevRemaining = P;
        for(let i=0; i<n; i++)
        {
            let idx = i+1;
            let amount = installmentAmount;
            let profitAmount =  prevRemaining * interestRate(calculationType ,profitRate, profitRateInterval, interval);
            let kkdf = prevRemaining * Number(kkdfTaxRate);
            let bsmv = prevRemaining * Number(bsmvTaxRate);
            let original = amount - profitAmount - kkdf - bsmv;
            let remainingOriginalCurrent = prevRemaining-original;
            idx = customRound(idx);
            amount = customRound(amount);
            original = customRound(original);
            let remainingOriginal = customRound(remainingOriginalCurrent);
            profitAmount = customRound(profitAmount);
            kkdf = customRound(kkdf);
            bsmv = customRound(bsmv);
            let installment = {idx, amount ,original, remainingOriginal, profitAmount, kkdf, bsmv};
            installmentsArray.push(installment);
            prevRemaining = remainingOriginalCurrent;
            
            
        }
        return installmentsArray;
    }   







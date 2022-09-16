import jsPDF from "jspdf";
import "jspdf-autotable";


export const exportPDF = (data) => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait"; 

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Loan Repayment Report";
    const headers = [["INSTALLMENT NUMBER", "AMOUNT","ORIGINAL","REMAINING ORIGINAL","PROFIT AMOUNT","KKDF","BSMV"]];

    const pdfData = Object.values(data).map(ins=> [ins.idx, 
        ins.amount ,ins.original, ins.remainingOriginal, ins.profitAmount, ins.kkdf, ins.bsmv]);

    let content = {
      startY: 50,
      head: headers,
      body: pdfData
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
  }
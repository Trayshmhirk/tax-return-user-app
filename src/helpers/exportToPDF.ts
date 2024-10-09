import { TransactionPropTypes } from "@/types/AllTypes";
import jsPDF from "jspdf";

export const exportToPDF = (transaction: TransactionPropTypes) => {
   const doc = new jsPDF();

   const pageWidth = doc.internal.pageSize.getWidth();

   // Add the smaller logo, centered
   const logoUrl =
      "https://img.icons8.com/external-flatarticons-blue-flatarticons/65/external-tax-taxes-flatarticons-blue-flatarticons.png";
   doc.addImage(
      logoUrl,
      "PNG",
      doc.internal.pageSize.getWidth() / 2 - 7.5, // Adjust to center the smaller image
      10,
      15, // Smaller width
      15 // Smaller height
   );

   // Add the title below the image
   doc.setFontSize(16);
   doc.setFont("helvetica", "bold");
   doc.text("Transaction Receipt", pageWidth / 2, 35, {
      align: "center",
   });

   doc.setFontSize(10);
   doc.setFont("helvetica", "normal");
   doc.setTextColor(115, 115, 115);
   doc.text("CHECK DEPOSIT", 20, 50);
   doc.text(`ID: ${transaction.id}`, 20, 60);
   doc.text(`Date: ${transaction.date}`, 20, 70);

   // Add Status, Description, Amount, justified between
   doc.setFontSize(12);
   doc.setFont("helvetica", "normal");
   doc.setTextColor(0, 0, 0);
   doc.text("Status:", 20, 90);
   doc.text(
      transaction.status.toUpperCase(),
      pageWidth - 20 - doc.getTextWidth(transaction.status.toUpperCase()),
      90
   ); // Justify to the right

   doc.setDrawColor(192, 192, 192);
   doc.line(20, 95, pageWidth - 20, 95); // Line after Status

   doc.text("Description:", 20, 105);
   doc.text(
      transaction.description,
      pageWidth - 20 - doc.getTextWidth(transaction.description),
      105
   ); // Justify to the right

   doc.line(20, 110, pageWidth - 20, 110); // Line after Description

   doc.text("Amount:", 20, 120);
   doc.setFont("helvetica", "bold");
   doc.setTextColor(41, 206, 156);
   doc.text(
      `${transaction.currency} ${transaction.amount}`,
      pageWidth -
         20 -
         doc.getTextWidth(`${transaction.currency} ${transaction.amount}`),
      120
   ); // Justify to the right

   // Add footer
   doc.setFontSize(10);
   doc.setFont("helvetica", "normal");
   doc.setTextColor(115, 115, 115);
   doc.text("Support", pageWidth / 2, 150, {
      align: "center",
   });
   doc.setTextColor(0, 162, 201);
   doc.text("harlex.mikkey@gmail.com", pageWidth / 2, 157, {
      align: "center",
   });

   // Save the PDF
   doc.save(`transaction_${transaction.id}.pdf`);
};

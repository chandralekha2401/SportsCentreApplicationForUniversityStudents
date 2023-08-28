import React from 'react';
import jsPDF from 'jspdf';

const generatePdfWithTable = (title, tableData, columnWidths) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  // Setting the font size and style for the title
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');

  // Defining the position to start drawing the title at the top center
  const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const pageWidth = doc.internal.pageSize.getWidth();
  const titleX = (pageWidth - titleWidth) / 2;
  const titleY = 50;

  // Drawing the title
  doc.text(title, titleX, titleY);

  // Setting the font size and style for the table
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');

  // Calculating the total width of the table based on the columnWidths array
  const totalWidth = columnWidths.reduce((acc, width) => acc + width, 0);

  // Defining the position to start drawing the table below the title
  let x = (pageWidth - totalWidth) / 2;
  let y = titleY + 30;

  // Drawing the table header with borders
  for (let i = 0; i < tableData[0].length; i++) {
    doc.rect(x, y, columnWidths[i], 20); // Header cell border
    doc.text(tableData[0][i], x + 5, y + 15); // Header cell text

    // Moving to the next column
    x += columnWidths[i];
  }

  // Moving to the next row
  y += 20;

  // Drawing the table content with borders
  for (let i = 1; i < tableData.length; i++) {
    x = (pageWidth - totalWidth) / 2; // Reset x to the starting position for each row

    for (let j = 0; j < tableData[i].length; j++) {
      doc.rect(x, y, columnWidths[j], 20); // Cell border
      doc.text(tableData[i][j], x + 5, y + 15); // Cell text

      // Move to the next column
      x += columnWidths[j];
    }

    // Move to the next row
    y += 20;
  }

  // Saving the PDF
  doc.save('document.pdf');
};

export default generatePdfWithTable;

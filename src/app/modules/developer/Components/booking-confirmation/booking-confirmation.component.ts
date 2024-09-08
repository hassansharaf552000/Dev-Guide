import { Component, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';  // Correct import for jsPDF
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.css']
})
export class BookingConfirmationComponent {
  @ViewChild('contentToConvert') contentToConvert!: ElementRef;

  constructor() {}

  downloadAsPDF() {
    const content = this.contentToConvert.nativeElement;

    // Use html2canvas to capture the content
    html2canvas(content, {
      backgroundColor: null, 
      scale: 2, 
      logging: true,
      useCORS: true 
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');  

      const imgWidth = 210; 
      const pageHeight = 295; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      pdf.save('booking-confirmation.pdf');
    });
  }
}

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    standalone: true,
    name: 'formatinvoicedate'
})

export class FormatInvoiceDatePipe implements PipeTransform {
  transform(timestamp: string): string {
    const date = new Date(timestamp);
    const formattedDate = date.getFullYear() + '-' +
  String(date.getMonth() + 1).padStart(2, '0') + '-' + 
  String(date.getDate()).padStart(2, '0');
    return formattedDate;
  }
}
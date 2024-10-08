import { Component, Output, EventEmitter } from '@angular/core';
import { Invoice } from '../invoices.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-new-invoice',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-invoice.component.html',
  styleUrl: './new-invoice.component.css'
})
export class NewInvoiceComponent {
  @Output() add = new EventEmitter<Invoice>();
  @Output() discard = new EventEmitter<boolean>;

  id:string = '';
  createdAt:string = '';
  paymentDue:string = '';
  description:string = '';
  paymentTerms:number = 0;
  clientName:string = '';
  clientEmail:string = '';
  status:string = '';
  itemTotal:any = '0.00';
  createDate:any = ''

  senderAddress = [
    {
      street: '',
      city: '',
      postCode: '',
      country: ''
    }
  ];

  clientAddress = [
    {
      street: '',
      city: '',
      postCode: '',
      country: ''
    }
  ];

  items: { name: string; quantity: number; price: number; total: number }[] = [];

  total:number = 0;


    // Method to add a new item
    addItem() {
      this.items = [...this.items, { name: '', quantity: 1, price: 0, total: 0 }];
    }

    removeItem(index: number) {
      this.items.splice(index, 1);
    }

    calculateTotal(item: any) {
      item.total = item.quantity * item.price;
    }

    randomNumber(length: number) {
      var text = "";
      var possible = "123456789ABCDEFGHIJKLMNOP";
      for (var i = 0; i < length; i++) {
        var sup = Math.floor(Math.random() * possible.length);
        text += i > 0 && sup == i ? "0" : possible.charAt(sup);
      }
      return text;
    }

  handleSubmit() {
    this.itemTotal = this.items.reduce((sum:number, item) => sum + item.total, 0).toFixed(2)
    this.createDate = new Date().getTime(); 
    const date = new Date(this.createDate);
    const formattedDate = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');


    this.add.emit({
      id: this.randomNumber(6),
      createdAt: formattedDate,
      paymentDue: this.paymentDue,
      description: this.description,
      paymentTerms: this.paymentTerms,
      clientName: this.clientName,
      clientEmail: this.clientEmail,
      status: (this.status == '') ? 'draft' : this.status,
      senderAddress: this.senderAddress[0], 
      clientAddress: this.clientAddress[0], 
      items: this.items,
      total: this.itemTotal
    });

  }

  handleDiscard() { 
    this.discard.emit(false)
  }

}

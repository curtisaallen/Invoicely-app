import { Component, Output, Input, EventEmitter, OnInit} from '@angular/core';
import { Invoice } from '../invoices.model';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-edit-invoice',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-invoice.component.html',
  styleUrl: './edit-invoice.component.css'
})
export class EditInvoiceComponent implements OnInit {
  @Output() editInvoice = new EventEmitter<Invoice>();
  @Output() discard = new EventEmitter<boolean>;
  @Input({required: true}) id!: string;
  @Input({required: true}) data!: any;
  createdAt: string = '';
  paymentDue: string = '';
  description: string = '';
  paymentTerms: number = 0;
  clientName: string = '';
  clientEmail: string = '';
  status: string = '';
  senderAddress = [{ street: '', city: '', postCode: '', country: '' }];
  clientAddress = [{ street: '', city: '', postCode: '', country: '' }];
  items: { name: string; quantity: number; price: number; total: number }[] = [];
  total: number = 0;


  ngOnInit(): void  {
    if (this.data) {
      this.id = this.data[0].id;
      this.createdAt = this.data[0].createdAt;
      this.paymentDue = this.data[0].paymentDue;
      this.description = this.data[0].description;
      this.paymentTerms = this.data[0].paymentTerms;
      this.clientName = this.data[0].clientName;
      this.clientEmail = this.data[0].clientEmail;
      this.status = this.data[0].status;
      this.senderAddress = [{...this.data[0].senderAddress}];
      this.clientAddress = [{...this.data[0].clientAddress}];
      this.items = this.data[0].items;
      this.total = this.data[0].total;
    }
  }

  addItem() {
    this.items.push({ name: '', quantity: 0, price: 0, total: 0 });
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  calculateTotal(item: any) {
    item.total = item.quantity * item.price;
  }


  handleSubmit() {
    const invoice = {
      id: this.id,
      createdAt: this.createdAt,
      paymentDue: this.paymentDue,
      description: this.description,
      paymentTerms: this.paymentTerms,
      clientName: this.clientName,
      clientEmail: this.clientEmail,
      status: this.status,
      senderAddress: this.senderAddress[0],
      clientAddress: this.clientAddress[0],
      items: this.items,
      total: this.total
    };

    this.editInvoice.emit(invoice); 
 
  }

  handleDiscard() { 
    this.discard.emit(false)
  }

}

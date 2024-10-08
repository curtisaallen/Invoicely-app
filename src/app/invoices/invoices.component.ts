import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dummyInvoices } from '../dummy-invoice';
import { Invoice } from './invoices.model';
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { InvoiceService } from './invoices.service';
import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [NewInvoiceComponent, InvoiceDetailsComponent, EditInvoiceComponent, CommonModule, SideNavComponent],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css'
})
export class InvoicesComponent implements OnInit {
  invoices: Invoice[] = [];
  statuses: any[] = [
    {title: 'draft', status: false},
    {title: 'pending', status: false},
    {title: 'paid', status: false}
   ];
  filteredInvoicesList: Invoice[] = [];
  isAddingInvoice:boolean = false;
  showDetails:boolean = false
  userId: string = '';
  user: any = [];
  showEditForm:boolean = false;
  selectedStatus: string = '';
  invoicesCount: number = 0;
  setThemeMode:boolean = false;

  constructor(private invoiceService:  InvoiceService) {}

  ngOnInit(): void {
    this.invoices = this.invoiceService.getInvoices(); 
    this.filteredInvoicesList = this.invoiceService.getInvoices();
    this.invoicesCount = this.invoiceService.getInvoicesCount()
  }

  onStatusSelect(event: Event): void {

    const target = event.target as HTMLInputElement;
    const selectedStatus = target.value.toLocaleLowerCase();
    const checkedStatus = (event.target as HTMLInputElement).checked;

    this.statuses.forEach(status => status.status = false);

    const targetIndex = this.statuses.findIndex(status => status.title === selectedStatus); 
    this.statuses[targetIndex].status = !this.statuses[targetIndex].status;

    if (checkedStatus === false) {
      this.filteredInvoicesList = this.invoiceService.getInvoices();
    } else {
      this.filteredInvoicesList = this.invoiceService.getInvoices().filter(invoice => invoice.status === selectedStatus);
    }

  }

  onAddNewInvoice() {
    this.isAddingInvoice = true;
  }

  onAddInvoice(invoiceData: Invoice) {
    console.log(invoiceData)
    this.invoiceService.addInvoice(invoiceData);
    this.isAddingInvoice = false;
    this.invoicesCount = this.invoiceService.getInvoicesCount()
  }

  onEditInvoice(invoiceData: Invoice) {
    console.log(invoiceData)
    this.invoiceService.onEditInvoice(invoiceData);
    this.toggleEditForm(false)
  }

  onShowDetailInvoice(invoiceID: any) {
    this.showDetails = true;
    this.user = this.invoices.filter(invoice => invoice.id === invoiceID);
  }

  closeDetailsOrEditForm(close: boolean) {
    this.showDetails = close;
    this.showEditForm = close;
  }

  onRemoveInvoice(id: string) {
     this.filteredInvoicesList = this.invoiceService.onRemoveInvoice(id);
     this.invoicesCount = this.invoiceService.getInvoicesCount()
  }

  toggleEditForm(edit: boolean) {
    this.showEditForm = edit;
  }

  markInvoiceAsPaid(id: string) {
    this.invoiceService.markInvoiceAsPaid(id);
    this.invoicesCount = this.invoiceService.getInvoicesCount()
  }

  discard(discard:boolean) {
    this.isAddingInvoice = discard;
  }

  toggleThemeMode(isDarkMode: boolean) {
    this.setThemeMode = isDarkMode;
    console.log(isDarkMode);
    document.body.classList.toggle("light-mode");
  }

}

import { Component, Output, Input, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.css'
})
export class InvoiceDetailsComponent {
  @Output() back = new EventEmitter<boolean>();
  @Output() remove = new EventEmitter<string>();
  @Output() paid = new EventEmitter<string>();
  @Output() edit = new EventEmitter<boolean>();
  @Input({required: true}) data!: any;
  popover:boolean = false


  closeDetailsOrEditForm() {
    this.back.emit(false);
  }
  handleRemove(id: string) {
     this.remove.emit(id);
     this.back.emit(false);
  }

  markInvoiceAsPaid(id: string) {
    this.paid.emit(id);
    this.back.emit(false);
  }

  handleEdit() {
    this.edit.emit(true);
  }

  totalAmount(data:any) {
    console.log(data[0])
    return data.reduce((sum: number, item: any) => sum + item.total, 0);
  }

  handleShowPopover() {
      this.popover = !this.popover;
  }

}

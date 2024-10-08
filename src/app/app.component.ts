import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {InvoicesComponent} from './invoices/invoices.component'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InvoicesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'invoice-app';
}

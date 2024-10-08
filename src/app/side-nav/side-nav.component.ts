import {  Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  @Output() toggleThemeMode = new EventEmitter<boolean>;
  imgUrl: string = '/icon-sun.svg';
  switch:boolean = false;
  toggleStyle() {
    this.switch = !this.switch
    this.imgUrl = this.switch ? '/icon-moon.svg' : '/icon-sun.svg';
    this.toggleThemeMode.emit(this.switch)
  }
}

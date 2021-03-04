import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isChecked = false;

  changeTheme(): void {
    if (this.isChecked) {
      document.querySelector('body').classList.remove('light-theme');
    } else {
      document.querySelector('body').classList.add('light-theme');
    }
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <div class="app">
      <div class="app_header">
        <img src="../../../assets/logo.svg" alt="logo" class="app_logo" />
      </div>
      <div class="app_content">
        <div class="app_nav">
          <a routerLink="products" routerLinkActive="active"> Products </a>
        </div>
        <div class="app_container">
          <router-outlet></router-outlet>
        </div>
        <div class="app_footer">
          <p>&copy; Pizza App Inc.</p>
        </div>
      </div>
    </div>
  `,
})
export class AppComponent {
  title = 'pizza-app';
}

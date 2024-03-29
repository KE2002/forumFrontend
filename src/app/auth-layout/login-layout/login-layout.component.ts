import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.scss'],
})
export class LoginLayoutComponent {
  @Input() isLogin: boolean = true;
  public loginData($event: boolean): void {
    this.isLogin = $event;
  }
}

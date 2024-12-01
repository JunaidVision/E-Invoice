import { Component, HostListener } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { Service } from './service/service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(public service: Service,
    private router: Router) {

    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.url != "/login" && !(this.service.IsLogin || (localStorage.getItem('isLogin') && localStorage.getItem('isLogin') == "true") && localStorage.getItem('Token'))) {
          this.logout();
        }
      }
    })
  }
  title = 'E-Invoice';

  logout() {
    localStorage.clear();
    this.service.IsLogin = false;
    this.router.navigate(['login']);
  }
  @HostListener('document:click') checkApp() {
    if ((this.router.url != '/login') && !(localStorage.getItem('isLogin') && localStorage.getItem('isLogin') == "true") && !(localStorage.getItem('Token'))) {
      this.logout();
    }
  }
}

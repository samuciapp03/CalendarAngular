import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {
  title = '404 Page Not Found'
  router: Router
  route: ActivatedRoute


  constructor(route: ActivatedRoute, router: Router) {
    this.route = route
    this.router = router
  }

  onHome(): void {
    this.router.navigateByUrl('/home')
  }
}

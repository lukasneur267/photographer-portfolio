import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isScrolled = false;

  constructor(private router: Router) {}

  get useSolidNavbar(): boolean {
    return this.isScrolled || this.router.url.startsWith('/details'); // portfolio details page doesnt have a hero img so a transparent navbar needs to behave differently on that page
  }

  get isPortfolioSection(): boolean {
    return this.router.url.startsWith('/portfolio') || this.router.url.startsWith('/details');
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 24;
  }
}
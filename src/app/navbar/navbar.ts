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
    return this.isScrolled || this.router.url.startsWith('/details');
  }

  get isPortfolioSection(): boolean {
    return this.router.url.startsWith('/portfolio') || this.router.url.startsWith('/details');
  }

  reloadIfCurrentPage(event: Event, targetPath: string): void {
    const currentPath = this.router.url.split('?')[0].split('#')[0] || '/';

    if (currentPath !== targetPath) {
      return;
    }

    event.preventDefault();
    window.location.reload();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 24;
  }
}
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer { // edit to change scroll to top functionality
  handleSocialClick(event: Event): void {
    event.preventDefault();
  }

  scrollToTop(event: Event): void {
    event.preventDefault();
    const topElement = document.getElementById('top');

    if (topElement) {
      topElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Image } from '../image.interface';
import { IMAGES } from '../images';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {
  selectedCategory = 'all';

  images: Image[] = IMAGES;

  get categories(): string[] {
    const cats = this.images.map((img) => img.category);
    return ['all', ...Array.from(new Set(cats))];
  }

  get filteredImages(): Image[] {
    if (this.selectedCategory === 'all') {
      return this.images;
    }
    return this.images.filter((img) => img.category === this.selectedCategory);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }
}

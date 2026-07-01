import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Image } from '../image.interface';
import { RouterLink } from '@angular/router';
import { GalleryService } from '../services/gallery';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, RouterLink],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {
  constructor(private galleryService: GalleryService) {}

  selectedCategory = 'all';
  selectedImage: Image | null = null;

  get categories(): string[] {
    return this.galleryService.getCategories();
  }

  get filteredImages(): Image[] {
    return this.galleryService.getImagesByCategory(this.selectedCategory);
  }

  get selectedImageIndex(): number {
    if (!this.selectedImage) {
      return -1;
    }

    return this.filteredImages.findIndex((image) => image.id === this.selectedImage?.id);
  }

  get previousImage(): Image | null {
    if (!this.selectedImage || this.filteredImages.length < 2) {
      return null;
    }

    const index = this.selectedImageIndex;
    return this.filteredImages[(index - 1 + this.filteredImages.length) % this.filteredImages.length];
  }

  get nextImage(): Image | null {
    if (!this.selectedImage || this.filteredImages.length < 2) {
      return null;
    }

    const index = this.selectedImageIndex;
    return this.filteredImages[(index + 1) % this.filteredImages.length];
  }

  get previewImages(): Image[] {
    if (!this.selectedImage || this.filteredImages.length < 2) {
      return [];
    }

    const index = this.selectedImageIndex;
    const offsets = this.filteredImages.length > 2 ? [-1, 0, 1] : [0, 1];

    return offsets.map(
      (offset) => this.filteredImages[(index + offset + this.filteredImages.length) % this.filteredImages.length],
    );
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.closeLightbox();
  }

  openLightbox(image: Image): void {
    this.selectedImage = image;
  }

  closeLightbox(): void {
    this.selectedImage = null;
  }

  showPrevious(event?: Event): void {
    event?.stopPropagation();

    if (this.previousImage) {
      this.selectedImage = this.previousImage;
    }
  }

  showNext(event?: Event): void {
    event?.stopPropagation();

    if (this.nextImage) {
      this.selectedImage = this.nextImage;
    }
  }
}
import { Injectable } from '@angular/core';
import { Image } from '../image.interface';
import { IMAGES } from '../images';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private readonly images = IMAGES;

  getImages(): Image[] {
    return [...this.images];
  }

  getImageById(id: number): Image | undefined {
    return this.images.find((image) => image.id === id);
  }

  getFeaturedImages(limit = 6): Image[] {
    return this.images.slice(0, limit);
  }

  getCategories(): string[] {
    const categories = this.images.map((image) => image.category);
    return ['all', ...Array.from(new Set(categories))];
  }

  getImagesByCategory(category: string): Image[] {
    if (category === 'all') {
      return this.getImages();
    }

    return this.images.filter((image) => image.category === category);
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Image } from '../image.interface';
import { IMAGES } from '../images';

// interface Image {
//   id: number;
//   title: string;
//   category: string;
//   imageUrl: string;
// }

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {
  selectedCategory = 'all';

  images: Image[] = IMAGES;
  //   // Landscape
  //   {
  //     id: 1,
  //     title: 'Mountain Vista',
  //     category: 'landscape',
  //     imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
  //   },
  //   {
  //     id: 2,
  //     title: 'Ocean Sunset',
  //     category: 'landscape',
  //     imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=400&fit=crop',
  //   },
  //   {
  //     id: 3,
  //     title: 'Forest Path',
  //     category: 'landscape',
  //     imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=400&fit=crop',
  //   },

  //   // Portrait
  //   {
  //     id: 4,
  //     title: 'Model Portrait',
  //     category: 'portrait',
  //     imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop',
  //   },
  //   {
  //     id: 5,
  //     title: 'Studio Shot',
  //     category: 'portrait',
  //     imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=400&fit=crop',
  //   },
  //   {
  //     id: 6,
  //     title: 'Professional Headshot',
  //     category: 'portrait',
  //     imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=400&fit=crop',
  //   },

  //   // Event
  //   {
  //     id: 7,
  //     title: 'Wedding Ceremony',
  //     category: 'event',
  //     imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=400&fit=crop',
  //   },
  //   {
  //     id: 8,
  //     title: 'Corporate Event',
  //     category: 'event',
  //     imageUrl: 'https://images.unsplash.com/photo-1514604612983-8eed11badb86?w=500&h=400&fit=crop',
  //   },
  //   {
  //     id: 9,
  //     title: 'Birthday Party',
  //     category: 'event',
  //     imageUrl: 'https://images.unsplash.com/photo-1540575467063-178f50002c4b?w=500&h=400&fit=crop',
  //   },

  //   // Architecture
  //   {
  //     id: 10,
  //     title: 'Modern Building',
  //     category: 'architecture',
  //     imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=400&fit=crop',
  //   },
  //   {
  //     id: 11,
  //     title: 'Historic Structure',
  //     category: 'architecture',
  //     imageUrl: 'https://images.unsplash.com/photo-1512207736139-c1c8f87f1490?w=500&h=400&fit=crop',
  //   },
  //   {
  //     id: 12,
  //     title: 'Urban Design',
  //     category: 'architecture',
  //     imageUrl: 'https://images.unsplash.com/photo-1486152873922-25802d72033f?w=500&h=400&fit=crop',
  //   },
  // ];

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

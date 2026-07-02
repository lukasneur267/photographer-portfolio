import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Image } from '../image.interface';
import { GalleryService } from '../services/gallery';

type Counter = {
  label: string;
  target: number;
  value: number;
};

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit, OnDestroy {
  @ViewChild('counterSection') counterSection?: ElementRef<HTMLElement>;

  constructor(private galleryService: GalleryService) {
    this.featuredImages = this.galleryService.getFeaturedImages(8); // ideally there would be more images to cycle through as this carousel is somewhat redundant rn
  }

  featuredImages: Image[] = [];

  readonly counterTargets: Counter[] = [
    { label: 'Clients', target: 86, value: 0 },
    { label: 'Prints', target: 14, value: 0 },
    { label: 'Editorials', target: 32, value: 0 },
  ];

  counters = signal<Counter[]>(this.counterTargets.map((counter) => ({ ...counter }))); // tweaked bootsnipp code snippet for animated counter. my brain is not huge enough to figure this out from scratch

  private counterObserver?: IntersectionObserver;
  private counterAnimationId?: number;

  get featuredSlides(): Image[][] {
    if (this.featuredImages.length === 0) {
      return [];
    }

    const imagesPerSlide = 4;
    const slides: Image[][] = [];

    for (let index = 0; index < this.featuredImages.length; index += imagesPerSlide) {
      const slide = this.featuredImages.slice(index, index + imagesPerSlide);

      if (slide.length === imagesPerSlide) {
        slides.push(slide);
      }
    }

    return slides.length > 0 ? slides : [this.featuredImages];
  }

  ngAfterViewInit(): void {
    if (!this.counterSection) {
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      this.animateCounters();
      return;
    }

    this.counterObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          this.animateCounters();
        }
      },
      { threshold: 0.35 },
    );

    this.counterObserver.observe(this.counterSection.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.counterAnimationId !== undefined) {
      window.cancelAnimationFrame(this.counterAnimationId);
    }

    this.counterObserver?.disconnect();
  }

  private animateCounters(): void {
    if (this.counterAnimationId !== undefined) {
      window.cancelAnimationFrame(this.counterAnimationId);
    }

    const duration = 1200;
    const startTime = performance.now();
    this.counters.set(this.counterTargets.map((counter) => ({ ...counter, value: 0 })));

    const tick = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      this.counters.set(
        this.counterTargets.map((counter) => ({
          ...counter,
          value: Math.round(counter.target * easedProgress),
        })),
      );

      if (progress < 1) {
        this.counterAnimationId = window.requestAnimationFrame(tick);
        return;
      }

      this.counterAnimationId = undefined;
    };

    this.counterAnimationId = window.requestAnimationFrame(tick);
  }
}
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Image } from '../image.interface';
import { GalleryService } from '../services/gallery';

@Component({
  selector: 'app-details',
  imports: [RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit {
  image: Image | undefined;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private galleryService: GalleryService,
  ) {}

  ngOnInit(): void {
    const imageId = Number(this.route.snapshot.params['id']);
    this.image = this.galleryService.getImageById(imageId);
  }

  goBack(): void {
    this.location.back();
  }
}
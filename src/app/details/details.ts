import { Component, OnInit } from '@angular/core';
import { Image } from '../image.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IMAGES } from '../images';

@Component({
  selector: 'app-details',
  imports: [RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit {
  image: Image | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    let imageId: Number = Number(this.route.snapshot.params['id']);
    this.image = IMAGES.find((img) => img.id === imageId);
  }
}

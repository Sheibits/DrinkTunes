import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf
import { RestaurantListComponent } from './listarrestaurants/listarrestaurants.component';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RestaurantListComponent], // Incluye CommonModule y el componente necesario
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css'],
})
export class RestaurantsComponent {
  constructor(public route: ActivatedRoute) {}
}

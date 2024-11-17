import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf
import { ListarNotificationsComponent } from './listarnotifications/listarnotifications.component';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ListarNotificationsComponent], // Incluye CommonModule y el componente necesario
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent {
  constructor(public route: ActivatedRoute) {}
}

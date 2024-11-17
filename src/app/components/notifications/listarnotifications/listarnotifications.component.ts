// src/app/components/notifications/listarnotifications/listarnotifications.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Notification } from '../../../models/Notifications';
import { NotificationsService } from '../../../services/notifications.service';

@Component({
  selector: 'app-listarnotifications',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
  ],
  templateUrl: './listarnotifications.component.html',
  styleUrls: ['./listarnotifications.component.css'],
})
export class ListarNotificationsComponent implements OnInit {
  notificationsDataSource: MatTableDataSource<Notification> = new MatTableDataSource();
  notificationsDisplayedColumns: string[] = [
    'notificationId',
    'notificationText',
    'isRead',
    'notifiedAt',
    'userId',
    'restaurantAdsId',
    'actionDelete',
    'actionUpdate',
  ];

  @ViewChild(MatPaginator) notificationsPaginator!: MatPaginator;
  @ViewChild(MatSort) notificationsSort!: MatSort;

  constructor(private notificationsService: NotificationsService) {}

  ngOnInit(): void {
    // Llamada al método 'list' del servicio para obtener la lista de notificaciones
    this.notificationsService.list().subscribe((data) => {
      this.notificationsDataSource = new MatTableDataSource(data);
      this.notificationsDataSource.paginator = this.notificationsPaginator;
      this.notificationsDataSource.sort = this.notificationsSort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.notificationsDataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteNotification(notificationId: number) {
    this.notificationsService.delete(notificationId).subscribe(() => {
      this.notificationsService.list().subscribe((data) => {
        this.notificationsDataSource.data = data;
      });
    });
  }
}

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
import { Restaurant } from '../../../models/Restaurants';
import { RestaurantService } from '../../../services/restaurants.service';

@Component({
  selector: 'app-listarrestaurants',
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
  templateUrl: './listarrestaurants.component.html',
  styleUrls: ['./listarrestaurants.component.css'],
})
export class RestaurantListComponent implements OnInit {
  restaurantDataSource: MatTableDataSource<Restaurant> = new MatTableDataSource();
  restaurantDisplayedColumns: string[] = [
    'restaurantId',
    'restaurantName',
    'location',
    'genre',
    'userId', // Actualizado para usar userId directamente
    'actionDelete',
    'actionUpdate',
  ];

  @ViewChild(MatPaginator) restaurantPaginator!: MatPaginator;
  @ViewChild(MatSort) restaurantSort!: MatSort;

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    // Llamada al método 'list' del servicio para obtener la lista de restaurantes
    this.restaurantService.list().subscribe((data) => {
      this.restaurantDataSource = new MatTableDataSource(data);
      this.restaurantDataSource.paginator = this.restaurantPaginator;
      this.restaurantDataSource.sort = this.restaurantSort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.restaurantDataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteRestaurant(restaurantId: number) {
    // Llamada al método 'delete' del servicio para eliminar un restaurante
    this.restaurantService.delete(restaurantId).subscribe(() => {
      this.restaurantService.list().subscribe((data) => {
        this.restaurantDataSource.data = data;
      });
    });
  }
}

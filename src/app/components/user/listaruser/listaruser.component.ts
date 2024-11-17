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
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-listaruser',
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
  templateUrl: './listaruser.component.html',
  styleUrls: ['./listaruser.component.css'],
})
export class UserListComponent implements OnInit {
  userDataSource: MatTableDataSource<User> = new MatTableDataSource();
  userDisplayedColumns: string[] = [
    'userId',
    'username',
    'email',
    'enabled',
    'actionDelete',
    'actionUpdate',
  ];

  @ViewChild(MatPaginator) userPaginator!: MatPaginator;
  @ViewChild(MatSort) userSort!: MatSort;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Llamada al método 'list' del servicio para obtener la lista de usuarios
    this.userService.list().subscribe((data) => {
      this.userDataSource = new MatTableDataSource(data);
      this.userDataSource.paginator = this.userPaginator;
      this.userDataSource.sort = this.userSort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userDataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteUser(userId: number) {
    // Llamada al método 'delete' del servicio para eliminar un usuario
    this.userService.delete(userId).subscribe(() => {
      this.userService.list().subscribe((data) => {
        this.userDataSource.data = data;
      });
    });
  }
}

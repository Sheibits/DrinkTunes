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
import { Role } from '../../../models/Role';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-listarrole',
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
  templateUrl: './listarrole.component.html',
  styleUrls: ['./listarrole.component.css'],
})
export class ListarRoleComponent implements OnInit {
  roleDataSource: MatTableDataSource<Role> = new MatTableDataSource();
  roleDisplayedColumns: string[] = [
    'roleId',
    'roleName',
    'userId',
    'actionUpdate',
  ];

  @ViewChild(MatPaginator) rolePaginator!: MatPaginator;
  @ViewChild(MatSort) roleSort!: MatSort;

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.roleService.list().subscribe((data) => {
      this.roleDataSource = new MatTableDataSource(data);
      this.roleDataSource.paginator = this.rolePaginator;
      this.roleDataSource.sort = this.roleSort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.roleDataSource.filter = filterValue.trim().toLowerCase();
  }
}

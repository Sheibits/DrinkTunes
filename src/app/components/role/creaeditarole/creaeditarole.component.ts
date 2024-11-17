import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../../models/Role';
import { RoleService } from '../../../services/role.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../models/User';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-creaeditarole',
  standalone: true,
  templateUrl: './creaeditarole.component.html',
  styleUrls: ['./creaeditarole.component.css'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule
  ],
})
export class CreaEditaRoleComponent implements OnInit {
  roleForm!: FormGroup;
  isEditMode: boolean = false;
  roleId!: number;
  users: User[] = []; // Lista de usuarios para el comboBox
  roleOptions = ['ADMIN', 'RESTAURANTE', 'ARTISTA']; // Opciones para el rol

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.roleId = params['id'];
      this.isEditMode = !!this.roleId;
      this.initForm();
      this.loadUsers();

      if (this.isEditMode) {
        this.roleService.getRoleById(this.roleId).subscribe((data) => {
          this.roleForm.patchValue({
            roleId: data.roleId,
            roleName: data.roleName,
            user: data.user?.userId // Solo asignamos el userId para selección automática
          });
          this.roleForm.get('roleId')?.disable(); // Deshabilitar roleId en edición
        });
      }
    });
  }

  private initForm() {
    this.roleForm = this.formBuilder.group({
      roleId: [{ value: '', disabled: true }],
      roleName: ['', Validators.required], // Campo para seleccionar el nombre del rol
      user: [null, Validators.required] // Campo para seleccionar el usuario
    });
  }

  private loadUsers() {
    this.userService.list().subscribe((data) => {
      this.users = data;
    });
  }

  saveRole(): void {
    if (this.roleForm.valid) {
      const roleToSave: Role = this.roleForm.getRawValue();

      // Obtener el usuario seleccionado a partir del userId
      const selectedUser = this.users.find(user => user.userId === this.roleForm.value.user);

      if (selectedUser) {
        roleToSave.user = selectedUser; // Asignamos el objeto completo del usuario para guardarlo
      }

      if (this.isEditMode) {
        roleToSave.roleId = this.roleId;
        this.roleService.update(roleToSave).subscribe(() => {
          this.snackBar.open('Rol actualizado exitosamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/roles']);
        });
      } else {
        this.roleService.create(roleToSave).subscribe(() => {
          this.snackBar.open('Rol registrado exitosamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/roles']);
        });
      }
    } else {
      this.roleForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.router.navigate(['/roles']);
  }
}

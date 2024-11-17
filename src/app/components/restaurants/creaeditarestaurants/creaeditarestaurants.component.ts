import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Restaurant } from '../../../models/Restaurants';
import { RestaurantService } from '../../../services/restaurants.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { User } from '../../../models/User';

@Component({
  selector: 'app-creaeditarestaurants',
  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    MatCheckboxModule,
  ],
  templateUrl: './creaeditarestaurants.component.html',
  styleUrls: ['./creaeditarestaurants.component.css'],
})
export class CreaEditaRestaurantComponent implements OnInit {
  restaurantForm!: FormGroup;
  isEditMode: boolean = false;
  restaurantId!: number;
  users: User[] = []; // Lista de usuarios para el combo box

  constructor(
    private formBuilder: FormBuilder,
    private restaurantService: RestaurantService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.restaurantId = params['id'];
      this.isEditMode = !!this.restaurantId;
      this.initForm();
      this.loadUsers();

      if (this.isEditMode) {
        this.restaurantService.getRestaurantById(this.restaurantId).subscribe((data) => {
          this.restaurantForm.patchValue({
            restaurantId: data.restaurantId,
            restaurantName: data.restaurantName,
            location: data.location,
            genre: data.genre,
            userId: data.userId, // Asignar el userId del usuario asociado
          });
          this.restaurantForm.get('restaurantId')?.disable(); // Deshabilitar el ID solo en modo edición
        });
      }
    });
  }

  private initForm() {
    this.restaurantForm = this.formBuilder.group({
      restaurantId: [{ value: '', disabled: this.isEditMode }], // Aplicar disable desde TypeScript
      restaurantName: ['', [Validators.required, Validators.minLength(3)]],
      location: ['', Validators.required],
      genre: ['', Validators.required],
      userId: [null, Validators.required] // Cambiar a userId para coincidir con el DTO
    });
  }

  private loadUsers() {
    this.userService.list().subscribe((data) => {
      this.users = data;
    });
  }

  saveRestaurant(): void {
    if (this.restaurantForm.valid) {
      const restaurantToSave: Restaurant = this.restaurantForm.getRawValue();
      restaurantToSave.userId = this.restaurantForm.get('userId')?.value;

      if (this.isEditMode) {
        restaurantToSave.restaurantId = this.restaurantId;
        this.restaurantService.update(restaurantToSave).subscribe(() => {
          this.snackBar.open('Restaurante actualizado exitosamente', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/restaurants']);
        });
      } else {
        this.restaurantService.create(restaurantToSave).subscribe(() => {
          this.snackBar.open('Restaurante registrado exitosamente', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/restaurants']);
        });
      }
    } else {
      this.restaurantForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.router.navigate(['/restaurants']);
  }
}

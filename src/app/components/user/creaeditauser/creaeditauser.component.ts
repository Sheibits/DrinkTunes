import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-creaeditauser',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatButtonModule,
    CommonModule,
    MatCheckboxModule,
  ],
  templateUrl: './creaeditauser.component.html',
  styleUrls: ['./creaeditauser.component.css'],
})
export class CreaEditaUserComponent implements OnInit {
  userForm!: FormGroup;
  isEditMode: boolean = false;
  userId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.isEditMode = !!this.userId;
      this.initForm();

      if (this.isEditMode) {
        this.userService.getUserById(this.userId).subscribe((data) => {
          this.userForm.patchValue(data);
          this.userForm.get('userId')?.disable();
        });
      }
    });
  }

  private initForm() {
    this.userForm = this.formBuilder.group({
      userId: [''],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', this.isEditMode ? [] : [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      enabled: [true]
    });
  }

  saveUser(): void {
    if (this.userForm.valid) {
      const userToSave: User = this.userForm.getRawValue();

      if (this.isEditMode) {
        userToSave.userId = this.userId;
        this.userService.update(userToSave).subscribe(() => {
          this.refreshUserList();
          this.snackBar.open('Usuario actualizado exitosamente', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/users']);
        });
      } else {
        this.userService.create(userToSave).subscribe(() => {
          this.refreshUserList();
          this.snackBar.open('Usuario registrado exitosamente', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/users']);
        });
      }
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  private refreshUserList(): void {
    this.userService.list().subscribe((data) => {
      this.userService.setUserList(data);
    });
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }
}

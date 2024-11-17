import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NotificationsService } from '../../../services/notifications.service';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { User } from '../../../models/User';
import { Notification } from '../../../models/Notifications';
import { RestaurantAds } from '../../../models/RestaurantAds';
import { RestaurantAdsService } from '../../../services/restaurantsads.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-creaeditanotifications',
  templateUrl: './creaeditanotifications.component.html',
  styleUrls: ['./creaeditanotifications.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class CreaEditaNotificationComponent implements OnInit {
  notificationForm!: FormGroup;
  isEditMode: boolean = false;
  notificationId!: number;
  users: User[] = [];
  restaurantAds: RestaurantAds[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private notificationsService: NotificationsService,
    private userService: UserService,
    private restaurantAdsService: RestaurantAdsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.notificationId = params['id'];
      this.isEditMode = !!this.notificationId;
      this.initForm();
      this.loadUsers();
      this.loadRestaurantAds();

      if (this.isEditMode) {
        this.notificationsService.getNotificationById(this.notificationId).subscribe((data) => {
          this.notificationForm.patchValue(data);
          this.notificationForm.controls['notificationId'].disable(); // Desactivar el ID en modo edición
        });
      }
    });
  }

  private initForm() {
    this.notificationForm = this.formBuilder.group({
      notificationId: [{ value: '', disabled: this.isEditMode }],
      notificationText: ['', [Validators.required]],
      isRead: [false],
      notifiedAt: ['', [Validators.required]],
      userId: [null, [Validators.required]],
      restaurantAdsId: [null, [Validators.required]],
    });
  }

  private loadUsers() {
    this.userService.list().subscribe((data) => {
      this.users = data;
    });
  }

  private loadRestaurantAds() {
    this.restaurantAdsService.list().subscribe((data) => {
      this.restaurantAds = data;
    });
  }

  saveNotification(): void {
    if (this.notificationForm.valid) {
      const notificationToSave: Notification = this.notificationForm.getRawValue();
      if (this.isEditMode) {
        notificationToSave.notificationId = this.notificationId;
        this.notificationsService.update(notificationToSave).subscribe(() => {
          this.snackBar.open('Notificación actualizada exitosamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/notifications']);
        });
      } else {
        this.notificationsService.create(notificationToSave).subscribe(() => {
          this.snackBar.open('Notificación registrada exitosamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/notifications']);
        });
      }
    } else {
      this.notificationForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.router.navigate(['/notifications']);
  }
}

import { Routes } from '@angular/router';
import { seguridadGuard } from './guard/seguridad.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { UserListComponent } from './components/user/listaruser/listaruser.component';
import { CreaEditaUserComponent } from './components/user/creaeditauser/creaeditauser.component';
import { RoleComponent } from './components/role/role.component';
import { CreaEditaRoleComponent } from './components/role/creaeditarole/creaeditarole.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { CreaEditaRestaurantComponent } from './components/restaurants/creaeditarestaurants/creaeditarestaurants.component';
import { RestaurantsAdsComponent } from './components/restaurantsads/restaurantsads.component';
import { CreaEditaRestaurantsAdsComponent } from './components/restaurantsads/creaeditarestaurantsads/creaeditarestaurantsads.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { CreaEditaNotificationComponent } from './components/notifications/creaeditanotifications/creaeditanotifications.component';
import { MessagesComponent } from './components/messages/messages.component';
import { CreaEditaMessagesComponent } from './components/messages/creaeditamessages/creaeditamessages.component';
import { ArtistProfileComponent } from './components/artistprofile/artistprofile.component';
import { CreaEditaArtistProfileComponent } from './components/artistprofile/creaeditaartistprofile/creaeditaartistprofile.component';
import { ArtistApplicationsComponent } from './components/artistapplications/artistapplications.component';
import { CreaEditaArtistApplicationComponent } from './components/artistapplications/creaeditaartistapplications/creaeditaartistapplications.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { RoleDistributionComponent } from './components/reportes/role-distribution/role-distribution.component';
import { ActivitySummaryComponent } from './components/reportes/activity-summary/activity-summary.component';
import { MessagesByUserComponent } from './components/reportes/messages-by-user/messages-by-user.component';
import { AdsByRestaurantComponent } from './components/reportes/ads-by-restaurant/ads-by-restaurant.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [seguridadGuard],
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'users',
        component: UserComponent,
        children: [
          { path: '', component: UserListComponent },
          { path: 'new', component: CreaEditaUserComponent },
          { path: 'edit/:id', component: CreaEditaUserComponent }
        ]
      },
      {
        path: 'roles',
        children: [
          { path: '', component: RoleComponent },
          { path: 'new', component: CreaEditaRoleComponent },
          { path: 'edit/:id', component: CreaEditaRoleComponent }
        ]
      },
      {
        path: 'restaurants',
        children: [
          { path: '', component: RestaurantsComponent },
          { path: 'new', component: CreaEditaRestaurantComponent },
          { path: 'edit/:id', component: CreaEditaRestaurantComponent }
        ]
      },
      {
        path: 'restaurant_ads',
        children: [
          { path: '', component: RestaurantsAdsComponent },
          { path: 'new', component: CreaEditaRestaurantsAdsComponent },
          { path: 'edit/:id', component: CreaEditaRestaurantsAdsComponent }
        ]
      },
      {
        path: 'notifications',
        children: [
          { path: '', component: NotificationsComponent },
          { path: 'new', component: CreaEditaNotificationComponent },
          { path: 'edit/:id', component: CreaEditaNotificationComponent }
        ]
      },
      {
        path: 'messages',
        children: [
          { path: '', component: MessagesComponent },
          { path: 'new', component: CreaEditaMessagesComponent },
          { path: 'edit/:id', component: CreaEditaMessagesComponent }
        ]
      },
      {
        path: 'artist-profiles',
        children: [
          { path: '', component: ArtistProfileComponent },
          { path: 'new', component: CreaEditaArtistProfileComponent },
          { path: 'edit/:id', component: CreaEditaArtistProfileComponent }
        ]
      },
      {
        path: 'artist-applications',
        children: [
          { path: '', component: ArtistApplicationsComponent },
          { path: 'new', component: CreaEditaArtistApplicationComponent },
          { path: 'edit/:id', component: CreaEditaArtistApplicationComponent }
        ]
      },
      {
        path: 'reportes',
        component: ReportesComponent,
        children: [
          { path: 'role-distribution', component: RoleDistributionComponent },
          { path: 'activity-summary', component: ActivitySummaryComponent },
          { path: 'messages-by-user', component: MessagesByUserComponent },
          { path: 'ads-by-restaurant', component: AdsByRestaurantComponent }
        ],
      },      
      { path: '', redirectTo: '/home', pathMatch: 'full' } // Redirección inicial a `home`
    ]
  },
  { path: '**', redirectTo: '/login' } // Redirección para rutas inexistentes
];

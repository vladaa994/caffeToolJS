import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Routes, RouterModule } from '@angular/router';
import {  MatButtonModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { UserComponent } from './component/user/user-list/user-list.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { UserService } from './service/user.service';
import { CheckLoggedInGuard } from './check-logged-in.guard';
import { UserCreateComponent } from './component/user/user-create/user-create.component';
import { RoleService } from './service/role.service';
import { ConfigService } from './service/config.service';
import { UserDeletedComponent } from './component/user/user-deleted/user-deleted.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserEditComponent } from './component/user/user-edit/user-edit.component';
import { PlayerListComponent } from './component/player/player-list/player-list.component';
import { PlayerCreateComponent } from './component/player/player-create/player-create.component';
import { PlayerDeletedComponent } from './component/player/player-deleted/player-deleted.component';
import { PlayerEditComponent } from './component/player/player-edit/player-edit.component';
import { PlayerService } from './service/player.service';
import { BiliardActiveComponent } from './component/biliard/biliard-active/biliard-active.component';
import { BiliardFinishedComponent } from './component/biliard/biliard-finished/biliard-finished.component';
import { BiliardCreateComponent } from './component/biliard/biliard-create/biliard-create.component';
import { BiliardService } from './service/biliard.service';
import { DatePipe } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import { PlayerDetailsComponent } from './component/player/player-details/player-details.component';

 
const routes : Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [CheckLoggedInGuard]
  },
  {
    path: 'users',
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'user-create',
        component: UserCreateComponent,
      },
      {
        path: 'user-deleted',
        component: UserDeletedComponent
      },
      {
        path: 'user-edit/:id',
        component: UserEditComponent
      }
    ]
  },
  {
    path: 'players',
    component: PlayerListComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create-player',
        component: PlayerCreateComponent
      },
      {
        path: 'edit-player/:id',
        component: PlayerEditComponent
      },
      {
        path: 'deleted-players',
        component: PlayerDeletedComponent
      }
    ]
  },
  {
    path: 'player-details/:id',
    component: PlayerDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'biliard',
    component: BiliardActiveComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'game-finished',
        component: BiliardFinishedComponent
      },
      {
        path: 'game-create',
        component: BiliardCreateComponent
      }
    ]
  },
  {
    path: "**",
    redirectTo: '/dashboard'
  }

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    DashboardComponent,
    UserCreateComponent,
    UserDeletedComponent,
    UserEditComponent,
    PlayerListComponent,
    PlayerCreateComponent,
    PlayerDeletedComponent,
    PlayerEditComponent,
    BiliardActiveComponent,
    BiliardFinishedComponent,
    BiliardCreateComponent,
    PlayerDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("token")
        },
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['localhost:8080/login']
      }
    })
  ],
  providers: [
    AuthGuard,
    UserService,
    CheckLoggedInGuard,
    RoleService,
    ConfigService,
    PlayerService,
    BiliardService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

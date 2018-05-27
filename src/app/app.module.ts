import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Routes, RouterModule } from '@angular/router';
import { MaterialAppModule } from './ngmaterial.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { UserComponent } from './component/user/user-list/user-list.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { UserService } from './service/user.service';
import { CheckLoggedInGuard } from './check-logged-in.guard';
import { BiliardComponent } from './component/biliard/biliard.component';
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
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'biliard',
    component: BiliardComponent,
    canActivate: [AuthGuard]
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
    BiliardComponent,
    UserCreateComponent,
    UserDeletedComponent,
    UserEditComponent,
    PlayerListComponent,
    PlayerCreateComponent,
    PlayerDeletedComponent,
    PlayerEditComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
    MaterialAppModule
  ],
  providers: [
    AuthGuard,
    UserService,
    CheckLoggedInGuard,
    RoleService,
    ConfigService,
    PlayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

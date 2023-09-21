import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { ServerComponent } from './servers/server/server.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { UserComponent } from './users/user/user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './server-resolver';

//Configuring routes for application
const applicationRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [{ path: ':userId/:userName', component: UserComponent }],
  },
  {
    path: 'servers',
    component: ServersComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: ':serverId',
        component: ServerComponent,
        resolve: { serverObj: ServerResolver },
      },
      {
        path: ':id/edit',
        component: EditServerComponent,
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
  // {
  //   path: 'not-found',
  //   component: PageNotFoundComponent,
  // },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: { errorMessage: 'Page Not found!' },
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(applicationRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

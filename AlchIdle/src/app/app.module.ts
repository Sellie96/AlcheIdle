
import { LandingComponent } from './landing/landing.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './landing/login/login.component';
import { RegisterComponent } from './landing/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChatComponent } from './chat/chat.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { CharacterState } from './state/character.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { AbilityComponent } from './ability/ability.component';
import { JwtInterceptor } from './utils/jwt.interceptor';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LootOpeningComponent } from './loot-opening/loot-opening.component';
import { InventoryComponent } from './inventory/inventory.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {
  extraHeaders: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    LandingComponent,
    RegisterComponent,
    AbilityComponent,
    LootOpeningComponent,
    InventoryComponent
  ],
  imports: [
    BrowserModule,
    [NgxsModule.forRoot([CharacterState], {
      developmentMode: !environment.production
    }), NgxsStoragePluginModule.forRoot()],
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDatatableModule,
    SocketIoModule.forRoot(config),
    environment.production ? [] : NgxsReduxDevtoolsPluginModule.forRoot(),
    LoadingBarRouterModule
  ],
  providers: [
    { provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
    },
    AppComponent,
    HttpClient
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}

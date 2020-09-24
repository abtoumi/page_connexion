import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login';
import { AlertComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings , RecaptchaFormsModule} from 'ng-recaptcha';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [{
    provide: RECAPTCHA_SETTINGS,
    useValue: {
      siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
    } as RecaptchaSettings,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

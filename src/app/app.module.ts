import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { HttpErrorInterceptor } from './core/http-error-interceptor.service';
import { DragonModule } from './dragon/dragon.module';
import { LoginModule } from './login/login.module';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { FeedbackMessageService } from './shared/services/feedback-message.service';
import { LoginService } from './shared/services/login.service';
import { CookiesService } from './core/cookie.service';
registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    LoginModule,
    DragonModule,
  ],
  providers: [
    LoginService,
    AuthGuardService,
    FeedbackMessageService,
    CookiesService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

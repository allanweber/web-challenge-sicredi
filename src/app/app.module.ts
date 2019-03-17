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
import { CookiesService } from './core/cookie.service';
import { HttpErrorInterceptor } from './core/http-error-interceptor.service';
import { DragonModule } from './dragon/dragon.module';
import { LoginModule } from './login/login.module';
import { AuthGuard } from './shared/guards/auth.guard';
import { CanDeactivateGuard } from './shared/guards/can-deactivate.guard';
import { FeedbackMessageService } from './shared/services/feedback-message.service';
import { LoginService } from './shared/services/login.service';
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
    AuthGuard,
    CanDeactivateGuard,
    FeedbackMessageService,
    CookiesService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

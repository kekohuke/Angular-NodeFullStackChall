import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OktaAuthModule } from '@okta/okta-angular';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { AppComponent } from './app.component';

import { AppRouters } from './app.routers';
import { SignUpComponent } from './sign-up/sign-up.component';
import { EnterContestComponent } from './enter-contest/enter-contest.component';
import { QuestionComponent } from './question/question.component';
import { EndPageComponent } from './end-page/end-page.component';
@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MaterialModule,

    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    MatNativeDateModule,

    AppRouters,
    OktaAuthModule.initAuth({
      issuer: 'https://{yourOktaDomain}/oauth2/default',
      redirectUri: 'http://localhost:4200/implicit/callback',
      clientId: '{YourClientId}',
    }),
  ],
  declarations: [
    AppComponent,
    SignUpComponent,
    EnterContestComponent,
    QuestionComponent,
    EndPageComponent,
  ],
  bootstrap: [AppComponent, SignUpComponent, EnterContestComponent],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
  ],
})
export class AppModule {}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { NavComponent } from "./components/nav/nav.component";
import { LoginComponent } from "./pages/login/login.component";
import { AuthService } from "./_services/auth.service";
import { RegisterComponent } from "./pages/register/register.component";
import { HomeComponent } from "./pages/home/home.component";
import { ErrorInterceptor } from "./_services/error.interceptor";
import { RouterModule } from "@angular/router";

import { MemberListComponent } from "./pages/member-list/member-list.component";
import { JwtModule } from "@auth0/angular-jwt";
import { MemberDetailComponent } from "./components/member-detail/member-detail.component";
import { MemberDetailResolver } from "./_resolver/member-detail.resolver";
import { MemberEditComponent } from "./components/member-edit/member-edit.component";
import { MemberEditResolver } from "./_resolver/member-edit.resolver";
import { PreventUnsavedChanges } from "./_guards/prevent-unsaved-changes.guard";
import { PhotoEditorComponent } from "./components/photo-editor/photo-editor.component";
import { FileUploadModule } from "ng2-file-upload";
import { OnboardComponent } from "./components/onboard/onboard.component";
import { MemberOnBoardResolver } from "./_resolver/member-onboard.resolver";
import { UserService } from "./_services/user.service";
import { AlertifyService } from "./_services/alertify.service";
import { TimeagoModule } from "ngx-timeago";
import { MemberListResolver } from "./_resolver/member-list.resolver";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MemberListComponent,
    MemberDetailComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    OnboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    TimeagoModule.forRoot(),
    PaginationModule.forRoot(),
    RouterModule,
    FileUploadModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5000"],
        disallowedRoutes: ["localhost:5000/api/auth"],
      },
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    AuthService,
    UserService,
    AlertifyService,
    ErrorInterceptor,
    MemberDetailResolver,
    MemberEditResolver,
    MemberListResolver,
    MemberOnBoardResolver,
    PreventUnsavedChanges,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

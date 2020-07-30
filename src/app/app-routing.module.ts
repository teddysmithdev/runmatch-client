import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "../app/pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { HomeComponent } from "./pages/home/home.component";
import { MemberListComponent } from "./pages/member-list/member-list.component";
import { MessagesComponent } from "./pages/messages/messages.component";
import { AuthGuard } from "./_guards/auth.guard";
import { MemberDetailComponent } from "./components/member-detail/member-detail.component";
import { MemberDetailResolver } from "./_resolver/member-detail.resolver";
import { MemberEditResolver } from "./_resolver/member-edit.resolver";
import { MemberEditComponent } from "./components/member-edit/member-edit.component";
import { PreventUnsavedChanges } from "./_guards/prevent-unsaved-changes.guard";
import { OnboardComponent } from "./components/onboard/onboard.component";
import { MemberOnBoardResolver } from "./_resolver/member-onboard.resolver";
import { MemberListResolver } from "./_resolver/member-list.resolver";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      {
        path: "members",
        component: MemberListComponent,
        resolve: { users: MemberListResolver },
      },
      {
        path: "onboard",
        component: OnboardComponent,
        resolve: { user: MemberOnBoardResolver },
      },
      {
        path: "members/:id",
        component: MemberDetailComponent,
        resolve: { user: MemberDetailResolver },
      },
      {
        path: "member/edit",
        component: MemberEditComponent,
        resolve: { user: MemberEditResolver },
        canDeactivate: [PreventUnsavedChanges],
      },
      { path: "messages", component: MessagesComponent },
    ],
  },
  { path: "**", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { Component, OnInit } from "@angular/core";
import { User } from "src/app/_models/user";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertifyService } from "src/app/_services/alertify.service";
import { UserService } from "src/app/_services/user.service";
import { AuthService } from "src/app/_services/auth.service";

@Component({
  selector: "app-onboard",
  templateUrl: "./onboard.component.html",
  styleUrls: ["./onboard.component.css"],
})
export class OnboardComponent implements OnInit {
  editForm: NgForm;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data["user"];
    });
  }

  onBoardUpdate() {
    this.userService.onboardUser(this.user.id, this.user).subscribe(
      (next) => {
        console.log(this.user);
        this.alertify.success("Onboarding complete!");
        this.router.navigate(["/members"]);
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
}

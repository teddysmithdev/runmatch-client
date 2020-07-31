import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { User } from "src/app/_models/user";
import { FileUploader } from "ng2-file-upload";
import { Photo } from "src/app/_models/photo";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { AlertifyService } from "src/app/_services/alertify.service";
import { UserService } from "src/app/_services/user.service";
import { AuthService } from "src/app/_services/auth.service";
import Stepper from "bs-stepper";

@Component({
  selector: "app-onboard",
  templateUrl: "./onboard.component.html",
  styleUrls: ["./onboard.component.css"],
})
export class OnboardComponent implements OnInit {
  name = "Angular";
  private stepper: Stepper;
  photos: Photo[];
  uploader: FileUploader;
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  editForm: NgForm;
  user: User;
  baseUrl = environment.apiUrl;

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
    this.stepper = new Stepper(document.querySelector("#stepper1"), {
      linear: false,
      animation: true,
    });
    this.initializeUploader();
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url:
        this.baseUrl +
        "users/" +
        this.authService.decodedToken.nameid +
        "/photos",
      authToken: "Bearer " + localStorage.getItem("token"),
      isHTML5: true,
      allowedFileType: ["image"],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
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

  next() {
    this.stepper.next();
  }
}

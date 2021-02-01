import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Club } from 'src/app/_models/club';
import { ClubService } from 'src/app/_services/club.service';

@Component({
  selector: 'app-club-detail',
  templateUrl: './club-detail.component.html',
  styleUrls: ['./club-detail.component.css']
})
export class ClubDetailComponent implements OnInit {

  club: Club;

  constructor(private clubService: ClubService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {
    this.getClub();
  }

  getClub() {
    this.clubService.getClub(this.route.snapshot.params['id']).subscribe((club: Club) => {
      this.club = club;
    }, error => {
      this.toastr.error(error);
    });
  }

}

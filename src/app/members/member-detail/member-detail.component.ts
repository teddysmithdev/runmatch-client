import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  member: Member;

  constructor(private memberService: MemberService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadMember();
  }

  loadMember() {
    this.memberService.getMember(this.route.snapshot.paramMap.get('username'))
      .subscribe(member => this.member = member);
  }

  addInvite(member: Member) {
    this.memberService.addInvite(member.userName).subscribe(() => {
      this.toastr.success('You have invited ' + member.userName);
    })
  }

}

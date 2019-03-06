import { Component, OnInit } from '@angular/core';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Subclass } from '../../../models/Subclass';

@Component({
  selector: 'app-subclass-details',
  templateUrl: './subclass-details.component.html',
  styleUrls: ['./subclass-details.component.css']
})
export class SubclassDetailsComponent implements OnInit {
  id: string;
  subclass: Subclass;

  constructor(
    private setupService: SetupService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.setupService.getSubclass(this.id).subscribe(subclass => {
      this.subclass = subclass;
      // console.log(subclass)
    })
  }

  onDeleteClick() {
    if(confirm('Are you sure')) {
      this.setupService.deleteSubclass(this.subclass);
      this.flashMessage.show('Sublcass removed', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/subclass']);
    }
  }

}

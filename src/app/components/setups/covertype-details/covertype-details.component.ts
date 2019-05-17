import { Component, OnInit } from '@angular/core';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Covertype } from '../../../models/Covertype';

@Component({
  selector: 'app-covertype-details',
  templateUrl: './covertype-details.component.html',
  styleUrls: ['./covertype-details.component.css']
})
export class CovertypeDetailsComponent implements OnInit {
  id: number;
  covertype: Covertype;

  constructor(
    private setupService: SetupService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    //  Get id from url
    this.id  = this.route.snapshot.params['id']; 
  //  Get Covertype
    this.setupService.getCovertype(this.id).subscribe(covertype => {
      // console.log(covertype)
      this.covertype = covertype;
    })
    
  }

  onDeleteClick() {
    if(confirm('Are you sure?')) {
      this.setupService.deleteCovertype(this.covertype);
      this.flashMessage.show('Covertype removed', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/covertypes']);
    }
  }
  
}

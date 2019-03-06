import { Component, OnInit } from '@angular/core';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Class } from '../../../models/Class';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit {
  id: string;
  class: Class;

  constructor(
    private setupService: SetupService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    //  Get id from url
    this.id  = this.route.snapshot.params['id']; 
  //  Get Class
    this.setupService.getClass(this.id).subscribe(data => {
      // console.log(data)
      this.class = data;
    })
    
  }

  onDeleteClick() {
    if(confirm('Are you sure?')) {
      this.setupService.deleteClass(this.class);
      this.flashMessage.show('Class removed', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/class']);
    }
  }
  
}

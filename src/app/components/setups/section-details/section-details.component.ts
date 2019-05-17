import { Component, OnInit } from '@angular/core';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Section } from '../../../models/Section';

@Component({
  selector: 'app-section-details',
  templateUrl: './section-details.component.html',
  styleUrls: ['./section-details.component.css']
})
export class SectionDetailsComponent implements OnInit {
  id: number;
  section: Section;

  constructor(
    private setupService: SetupService,
    private router: Router, 
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.setupService.getSection(this.id).subscribe(section => {
      this.section = section;
    })
  }

  onDeleteClick() {
    if(confirm('Are you sure?')){
      this.setupService.deleteSection(this.section);
      this.flashMessage.show('Section removed', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/sections']);
    }
  }

}

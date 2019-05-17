import { Component, OnInit } from '@angular/core';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Section } from '../../../models/Section';
import { Covertype } from '../../../models/Covertype';

@Component({
  selector: 'app-section-edit',
  templateUrl: './section-edit.component.html',
  styleUrls: ['./section-edit.component.css']
})
export class SectionEditComponent implements OnInit {
  id: number;
  section: Section = {}

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
    });
  }

  onSubmit(value): void {
    this.setupService.updateSection(value)
      .subscribe(() => {
        this.flashMessage.show('Section Updated', {cssClass: 'alert-success', timeout: 4000});
        this.router.navigate(['/sections']);
      })
  }

}

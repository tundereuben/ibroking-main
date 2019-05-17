import { Component, OnInit } from '@angular/core';
import { SetupService } from '../../../services/setup.service';

import { Section } from '../../../models/Section';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {
  sections: Section[];

  constructor(private setupService: SetupService) { }

  ngOnInit() {
    this.setupService.getSections().subscribe(sections=> {
      this.sections = sections;
    })
  }

  delete(section: Section)  : void {
    if(confirm("Are you sure?")) {
      this.setupService.deleteSection(section)
    .subscribe(data => {
      this.sections = this.sections.filter(c => c !== section);
    })
    }
  }
}

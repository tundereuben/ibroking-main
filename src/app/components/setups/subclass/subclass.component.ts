import { Component, OnInit } from '@angular/core';
import { SetupService } from '../../../services/setup.service';

import { Subclass } from '../../../models/Subclass';

@Component({
  selector: 'app-subclass',
  templateUrl: './subclass.component.html',
  styleUrls: ['./subclass.component.css']
})
export class SubclassComponent implements OnInit {
  subclasses: Subclass[];
  subclass: Subclass;

  constructor(private setupService: SetupService) { }

  ngOnInit() {
    this.setupService.getSubclasses().subscribe(subclasses => {
      this.subclasses = subclasses;
    });
  }

  delete(subclass: Subclass)  : void {
    if(confirm("Are you sure?")) {
      this.setupService.deleteSubclass(subclass)
      .subscribe(data => {
        this.subclasses = this.subclasses.filter(s => s !== subclass);
      })
    }
  }
}

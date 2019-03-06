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

  constructor(private setupService: SetupService) { }

  ngOnInit() {
    this.setupService.getSubclasses().subscribe(subclasses => {
      this.subclasses = subclasses;
      // console.log(this.subclasses)
    })
  }

}

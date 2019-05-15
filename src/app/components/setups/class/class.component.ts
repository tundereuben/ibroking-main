import { Component, OnInit } from '@angular/core';
import { SetupService} from '../../../services/setup.service'; 

import { setupClass } from '../../../models/Class';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
  classes: setupClass[] = []; 

  constructor(private setupService: SetupService) { }

  ngOnInit() {
    this.setupService.getClasses().subscribe(res => {
      this.classes = res;
    });
    
  }

  delete(_class: setupClass)  : void {
    this.setupService.deleteClass(_class)
    .subscribe(data => {
      this.classes = this.classes.filter(c => c !== _class);
    })
    // console.log('Delete clicked', _class);
  }

}

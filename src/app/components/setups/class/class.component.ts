import { Component, OnInit } from '@angular/core';
import { SetupService} from '../../../services/setup.service';

import { Class } from '../../../models/Class';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
  classes: Class[];

  constructor(private setupService: SetupService) { }

  ngOnInit() {
    this.setupService.getClasses().subscribe(classes => {
      this.classes = classes;
      // console.log(this.classes)
    }

    );
    
  }

}

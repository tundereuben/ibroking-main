import { Component, OnInit } from '@angular/core';
import { SetupService} from '../../../services/setup.service';

import { Covertype } from '../../../models/Covertype';

@Component({
  selector: 'app-covertypes',
  templateUrl: './covertypes.component.html',
  styleUrls: ['./covertypes.component.css']
})
export class CovertypesComponent implements OnInit {
  covertypes: Covertype[];

  constructor(private setupService: SetupService) { }

  ngOnInit() {
    this.setupService.getCovertypes().subscribe(covertypes => {
      this.covertypes = covertypes;
    });
    
  }

  delete(covertype: Covertype)  : void {
    if(confirm("Are you sure?")) {
      this.setupService.deleteCovertype(covertype)
      .subscribe(data => {
        this.covertypes = this.covertypes.filter(p => p !== covertype);
    });
    }
  }

}

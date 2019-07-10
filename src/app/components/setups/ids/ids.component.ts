import { Component, OnInit, ViewChild } from '@angular/core';
import { SetupService } from '../../../services/setup.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, RouterStateSnapshot } from '@angular/router';

import { Id } from '../../../models/Id'

@Component({
  selector: 'app-ids',
  templateUrl: './ids.component.html',
  styleUrls: ['./ids.component.css']
})
export class IdsComponent implements OnInit {
  ids: Id[];
  id: Id = {};
  idType: string;
  idTypes: string[];

  @ViewChild('idForm', {static: false }) form: any;

  constructor(
    private setupService: SetupService,
    private router: Router, 
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {

    this.setupService.getIds().subscribe(ids => {
      this.ids = ids;
      // console.log(this.ids);
    });

    this.idType = null;
    this.idTypes = ['Alphanumeric', 'Number'];
    
  }

  onSubmit({value, valid} : {value: Id, valid: boolean}){
    if(!valid) {
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 3000
      });
    } else {
      // console.log(value);
      const sub =  this.setupService.addId(value)
      .subscribe(id => {
        this.ids.push(id)
        this.flashMessage.show('New ID added', {
          cssClass: 'alert-success', timeout: 3000
        });
        this.router.navigate(['/ids']);
      });
    }
  }

  delete(id: Id)  : void {
    if(confirm("Are you sure?")) {
      this.setupService.deleteId(id)
    .subscribe(data => {
      this.ids = this.ids.filter(c => c !== id);
    })
    }
  }

}

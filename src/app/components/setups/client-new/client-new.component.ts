import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router } from '@angular/router';

import { Client } from '../../../models/Client';
import { Subscription } from 'rxjs';

import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-client-new',
  templateUrl: './client-new.component.html',
  styleUrls: ['./client-new.component.css']
})
export class ClientNewComponent implements OnInit {
  client: Client = {};
  clients: Client[];
  individual = false;
  corporate = false;

  @ViewChild('clientForm', {static: false }) form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private setupService: SetupService,
    private router: Router
  ) { }

  ngOnInit() {
  }

   // Show client type
   SelectClientType(e) {
    let clientType = e.target.value; 
    if(clientType == "Individual") {
      this.individual = true;
      this.corporate = false;
    } else {
      this.corporate = true;
      this.individual = false;
    }
  }

  // When the form is submitted
  onSubmit(clientForm: NgForm) {
    if (!clientForm) {
      this.flashMessage.show('Please fill out the form correctly', { cssClass: 'alert-danger', timeout: 4000 });
    } else {
      this.setupService.addClient(clientForm.value)
        .subscribe(response => {
          // this.flashMessage.show('New client added', { cssClass: 'alert-success', timeout: 4000 });
          this.setupService.getClients().subscribe(clients => this.clients = clients);
          // console.log(response),
          this.client = response,
          err => console.log(err),
          this.router.navigate([`/client-contact/${this.client.clntCode}`]);
        });
        
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from '../../../models/Client';

import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
  id:number;
  client: any = {};
  clients: Client[] = [];
  corporate = false;
  individual = false;

  constructor(
    private setupService: SetupService,
    private router: Router, 
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.setupService.getClient(this.id).subscribe(client => {
      this.client = client;
      if(client.clntType == "Corporate") {
        this.corporate = true;
      } else {
        this.individual = true;
      }
    });
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
      this.client = clientForm.value;
      this.client.clntCode = this.id;
      console.log(this.client);
      this.setupService.updateClient(this.client)
        .subscribe(response => {
          // this.flashMessage.show('New client added', { cssClass: 'alert-success', timeout: 4000 });
          this.setupService.getClients().subscribe(clients => this.clients = clients);
          // console.log(response),
          this.client = response,
          err => console.log(err)
          this.router.navigate([`/client-details/${this.id}`]);
        });
        
    }
  }

}

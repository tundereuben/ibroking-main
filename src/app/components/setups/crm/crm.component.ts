import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router, RouterStateSnapshot } from '@angular/router';

import { Client } from '../../../models/Client';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.css']
})
export class CrmComponent implements OnInit {
  clients: Client[];
  client: Client;
  // createNew = true;
  showClient = true;
  showVendors= false;
  showUsers = false;
  individual = false;
  corporate = false;

  @ViewChild('clientForm', {static: false }) form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private setupService: SetupService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setupService.getClients().subscribe(clients => {
      this.clients = clients;
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

  viewClient() {
    this.showClient = true;
    this.showVendors = false;
    this.showUsers = false;
  }

  viewVendors(){
    this.showVendors = true;
    this.showClient = false;
    this.showUsers = false;
  }

  viewUsers(){
    this.showVendors = false;
    this.showClient = false;
    this.showUsers = true;
    
  }

  // Client Details Navigation
  clientDetails(value){
    this.router.navigate([`/client-details/${value.clntCode}`]);
  }

  // When the form is submitted
  // onSubmit({ value, valid }: { value: any, valid: boolean }) {
  //   console.log(value);
  //   if (!valid) {
  //     this.flashMessage.show('Please fill out the form correctly', { cssClass: 'alert-danger', timeout: 4000 });
  //   } else {
  //     this.setupService.addClient(value)
  //       .subscribe(response => {
  //         // this.flashMessage.show('New client added', { cssClass: 'alert-success', timeout: 4000 });
  //         // this.setupService.getClients().subscribe(clients => this.clients = clients);
  //         console.log(response),
  //         err => console.log(err)
  //       });
        
  //   }
  // }

  // Delete a client
  // deleteClient(client) {
  //   this.setupService.deleteClient(client).subscribe(client =>
  //     this.setupService.getClients().subscribe(clients => this.clients = clients)
  //   )
  // };
  
}

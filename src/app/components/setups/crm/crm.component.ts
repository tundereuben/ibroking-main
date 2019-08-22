import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router, RouterStateSnapshot } from '@angular/router';

import { Client } from '../../../models/Client';
import { Underwriter } from '../../../models/Underwriter';
import { User } from '../../../models/User';
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
  underwriters: Underwriter[];
  users: User[];

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

    this.setupService.getUnderwriters().subscribe(underwriters => {
      this.underwriters = underwriters;
    });

    this.setupService.getUsers().subscribe(users => {
      this.users = users;
    })
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

  // Underwriter Details Navigation
  underwriterDetails(value){
    this.router.navigate([`/underwriter-details/${value.undCode}`]);
  }

  userDetails(value){
    this.router.navigate([`/user-details/${value.userId}`]);
  }
  
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router, RouterStateSnapshot } from '@angular/router';

import { Client } from '../../../models/Client';
import { Underwriter } from '../../../models/Underwriter';
import { User } from '../../../models/User';
// import { Subscription } from 'rxjs';

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
  showVendors = false;
  showUsers = false;

  individual = false;
  corporate = false;

  underwriters: Underwriter[];
  underwriter: Underwriter;

  users: User[];
  somethingFound = false;

  @ViewChild('clientForm', { static: false }) form: any;

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
    if (clientType == "Individual") {
      this.individual = true;
      this.corporate = false;
    } else {
      this.corporate = true;
      this.individual = false;
    }
  }

 // Client Details Navigation
  clientDetails(value) {
    this.router.navigate([`/client-details/${value.clntCode}`]);
  }

  // Underwriter Details Navigation
  underwriterDetails(value) {
    this.router.navigate([`/underwriter-details/${value.undCode}`]);
  }

  // userDetails(value) {
  //   this.router.navigate([`/user-details/${value.userId}`]);
  // }


  // Search by email
  searchClientByEmail(e) {
    let searchString = this.prepareForSeach(e);
     this.setupService.getClientsByEmail(searchString).subscribe(result => {   
      this.clients = result;
    });
  }

  // Search by Lastname
  searchClientByLastname(e) {
    let searchString = this.prepareForSeach(e);
     this.setupService.getClientsByLastname(searchString).subscribe(result => {   
      this.clients = result;
    });
  }

  // Search by ClientCode
  searchClientByCode(e) {
    let searchString = (this.prepareForSeach(e));
     this.setupService.getClient(searchString).subscribe(result => {   
      this.client = result;
      this.clients.push(this.client);
    });
  }


  prepareForSeach(e) {  
    if (e.keyCode === 13) {
      this.clients = [];
      let searchString = e.target.value;
      searchString = searchString.trim()  // Remove white spaces if any
      return searchString;  
    }
  }

}

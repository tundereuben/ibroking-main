import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from '../../../models/Client';

import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id:number;
  client: any = {};
  clients: Client[] = [];
  contacts: Client[];
  corporate = false;
  contact: any = {};

  @ViewChild('contactForm', {static: false }) form: any;

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
      // console.log(this.client);
      if(client.clntType == "Corporate") {
        this.corporate = true;  
      }
      this.setupService.getContactsByClientCode(this.id).subscribe(contacts => {
        this.contacts = contacts;
        // console.log(this.contacts);
      })
    });
  }

  deleteClient(client){
    this.setupService.deleteClient(client).subscribe(data => {
      this.setupService.getClients().subscribe(clients => this.clients = clients);
      this.router.navigate(['/crm']);
    });
  }

  // Edit clicked contact
  showEditContactForm(contact) {
    this.contact = contact;
  }

  updateContact(contactForm: NgForm) {
    let id = this.contact.contCode;

    this.contact = contactForm.value;
    this.contact.contCode = id;
    this.contact.contClntCode = this.client.clntCode;

    this.setupService.updateContact(contactForm.value).subscribe(contact => {
      this.contact = contact;
    }); 
    window.location.reload();
  }

}

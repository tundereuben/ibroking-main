import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Client } from '../../../models/Client';

import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-client-contact',
  templateUrl: './client-contact.component.html',
  styleUrls: ['./client-contact.component.css']
})
export class ClientContactComponent implements OnInit {
  id: number;
  client: Client = {};
  clients: Client[];
  contact: Client;
  contacts: Client;
  person: Client = {}; // for Contact/NOK
  individual = false;
  corporate = false;
  clientType: string = '';
  formTitle: string;

  @ViewChild('contactForm', {static: false }) form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private setupService: SetupService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.setupService.getClient(this.id).subscribe(client => {
      this.client = client;
      if(client.clntType == "Corporate") {
        this.clientType = 'Contact';
        this.formTitle = 'Contact Person';
      } else {
        this.clientType = 'NOK'
        this.formTitle = 'Next of Kin';
      }
    });
  }

   // When the form is submitted
   onSubmit(contactForm: NgForm) {
    if (!contactForm) {
      this.flashMessage.show('Please fill out the form correctly', { cssClass: 'alert-danger', timeout: 4000 });
    } else {
      this.person = contactForm.value;
      this.person.contClntCode = this.id;
      this.setupService.addContact(this.person)
        .subscribe(response => {
          // this.flashMessage.show('New client added', { cssClass: 'alert-success', timeout: 4000 });
          // this.setupService.getClients().subscribe(clients => this.clients = clients);
          // console.log(response),
          this.client = response,
          err => console.log(err)
          // this.router.navigate([`/client-contact/${this.client.clntCode}`]);
        });
       this.form.reset();
    }
  }
}

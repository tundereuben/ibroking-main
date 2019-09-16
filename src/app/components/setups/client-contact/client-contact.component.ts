import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Client } from '../../../models/Client';
import { Country } from '../../../models/Country';

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

  country: Country = null;
  countries: Country[];

  title: any = null;
  titles: any[] = ['Admiral', 'Air Chief Marshall', 'Air Commodore',' Air Marshall', 'Air Vice Marshall', 'Airman', 'Alhaja', 'Alhaji', 'Architect', 'Baron', 'Baroness', 'Barrister', 'Bean', 'Bishop', 'Bombardier', 'Brigadier', 'Brother', 'Canon', 'Captain', 'Cardinal', 'Chief', 'Colonel', 'Commander', 'Commodore', 'Corporal', 'Councillor', 'Count', 'Countess', 'Dame', 'Deacon', 'Deaconess', 'Dean', 'Doctor', 'Elder', 'Emir', 'Engineer', 'Executor(s) of', 'Evangelist', 'Father', 'Field Marshall',' Flight Lieutenant', 'Flight Sergeant', 'General',' Group Captain', 'Gunner', 'Hajia', 'Honourable', 'Judge', 'Lady', 'Lance Bombardier', 'Lance Corporal', 'Lieutenant', 'Lieutenant Colonel', 'Colonel', 'Lieutenant', 'Commander', 'Lieutenant General', 'Lord', 'Major', 'Mallam', 'Master', 'Master', 'Sergeant', 'Miss', 'Mother', 'Mr', 'Mr Justice', 'Mrs', 'Mr & Mrs', 'Ms', 'Oba', 'Otunba', 'Pastor', 'Prince', 'Princess', 'Private', 'Professor', 'Provost', 'Rabbi', 'Rear Admiral', 'Regimental Sergeant Major', 'Reverend', 'Right Reverend', 'Sergeant', 'Sir', 'Sister', 'Squadron Leader', 'Staff Sergeant', 'The Honourable Lady', 'The Honourable Mrs', 'The Honourable Sir', 'The Right Honourable', 'Very Reverend',  'Viscount', 'Viscountess',' Warrant Officer', 'Wing Commander'];

  errorMessage: any;

  @ViewChild('contactForm', {static: false }) form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private setupService: SetupService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.setupService.getCountries().subscribe(countries => {
      this.countries = countries;
    });

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
      this.errorMessage = this.validateContact(this.person);
      
      if(this.errorMessage !== '') {
        this.flashMessage.show(this.errorMessage, { cssClass: 'alert-danger', timeout: 10000 });
      } else {
        this.addNewContact()
      }
      
    }
  }

  // Validate compulsory info
  validateContact(person) {
    let message = ''; 
    
    if(!person.contTitle) {
      message += '<p>Title missing</p>';
    };

    if(!person.contLastname) {
      message += '<p>Lastname missing</p>';
    };

    if(!person.contOthernames) {
      message += '<p>Other names missing</p>';
    };

    if(!person.contDob) {
      message += '<p>Date of Birth</p>';
    };

    if(!person.contGender) {
      message += '<p>Gender missing</p>';
    };

    if(!person.contMobile) {
      message += '<p>Mobile Number missing</p>';
    };

    if(!person.contEmail) {
      message += '<p>Email missing</p>';
    };

    return message;
  }

  addNewContact(){
    this.setupService.addContact(this.person)
    .subscribe(response => {
      this.client = response,
      err => console.log(err)
      this.router.navigate([`/client-contact/${this.client.clntCode}`]);
    });
   this.form.reset();
  }
}

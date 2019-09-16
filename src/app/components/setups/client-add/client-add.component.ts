import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router } from '@angular/router';

import { Client } from '../../../models/Client';
import { Occupation } from '../../../models/Occupation';
import { Country } from '../../../models/Country';
import { Sector } from '../../../models/Sector';

import { Subscription } from 'rxjs';

import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit {

  client: Client = {};
  clients: Client[];

  occupations: Occupation[];
  occupation: Occupation = null;

  country: Country = null;
  countries: Country[];

  sector: Sector = null;
  sectors: Sector[] ;

  title: any = null;
  titles: any[] = ['Admiral', 'Air Chief Marshall', 'Air Commodore',' Air Marshall', 'Air Vice Marshall', 'Airman', 'Alhaja', 'Alhaji', 'Architect', 'Baron', 'Baroness', 'Barrister', 'Bean', 'Bishop', 'Bombardier', 'Brigadier', 'Brother', 'Canon', 'Captain', 'Cardinal', 'Chief', 'Colonel', 'Commander', 'Commodore', 'Corporal', 'Councillor', 'Count', 'Countess', 'Dame', 'Deacon', 'Deaconess', 'Dean', 'Doctor', 'Elder', 'Emir', 'Engineer', 'Executor(s) of', 'Evangelist', 'Father', 'Field Marshall',' Flight Lieutenant', 'Flight Sergeant', 'General',' Group Captain', 'Gunner', 'Hajia', 'Honourable', 'Judge', 'Lady', 'Lance Bombardier', 'Lance Corporal', 'Lieutenant', 'Lieutenant Colonel', 'Colonel', 'Lieutenant', 'Commander', 'Lieutenant General', 'Lord', 'Major', 'Mallam', 'Master', 'Master', 'Sergeant', 'Miss', 'Mother', 'Mr', 'Mr Justice', 'Mrs', 'Mr & Mrs', 'Ms', 'Oba', 'Otunba', 'Pastor', 'Prince', 'Princess', 'Private', 'Professor', 'Provost', 'Rabbi', 'Rear Admiral', 'Regimental Sergeant Major', 'Reverend', 'Right Reverend', 'Sergeant', 'Sir', 'Sister', 'Squadron Leader', 'Staff Sergeant', 'The Honourable Lady', 'The Honourable Mrs', 'The Honourable Sir', 'The Right Honourable', 'Very Reverend',  'Viscount', 'Viscountess',' Warrant Officer', 'Wing Commander'];

  status: any = null;
  statuses: any = ['Single', 'Married', 'Divorced','Widow/Widower','Other'];

  idType: any = null;
  idTypes: any[] = ['Voter\'s Card', 'Int\'l Passport', 'Driver\'s License','National ID Card','Other'];

  individual = false;
  corporate = false;

  errorMessage
  

  @ViewChild('clientForm', {static: false }) form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private setupService: SetupService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setupService.getOccupations().subscribe(occupations => {
      this.occupations = occupations;
    });

    this.setupService.getCountries().subscribe(countries => {
      this.countries = countries;
    });

    this.setupService.getSectors().subscribe(sectors => {
      this.sectors = sectors;
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

  // When the form is submitted
  onSubmit(clientForm: NgForm) {
    if (!clientForm) {
      this.flashMessage.show('Please fill out the form correctly', { cssClass: 'alert-danger', timeout: 10000 });
    } else {

      if(this.individual) {
        this.errorMessage = this.validateIndividual(clientForm.value);
        if(this.errorMessage !== '') {
          this.flashMessage.show(this.errorMessage, { cssClass: 'alert-danger', timeout: 10000 });
        } else {
          this.addNewClient(clientForm.value);
        }
        
      } else if (this.corporate) {
        this.errorMessage = this.validateCorporate(clientForm.value);
        if(this.errorMessage !== '') {
          this.flashMessage.show(this.errorMessage, { cssClass: 'alert-danger', timeout: 10000 });
        } else {
          this.addNewClient(clientForm.value);
        }

      } else {
        this.flashMessage.show('Select client type', { cssClass: 'alert-danger', timeout: 10000 });
      }  
        
    }
  }

  // Validate compulsory fields for individual client
  validateIndividual(clientForm){
    let message = ''; 
    
    if(!clientForm.clntTitle) {
      message += '<p>Client title missing</p>';
    };

    if(!clientForm.clntLastname) {
      message += '<p>Client Lastname missing</p>';
    };

    if(!clientForm.clntOthernames) {
      message += '<p>Client Other names missing</p>';
    };

    if(!clientForm.clntDob) {
      message += '<p>Client Date of Birth</p>';
    };

    if(!clientForm.clntGender) {
      message += '<p>Client Gender missing</p>';
    };

    if(!clientForm.clntMobile) {
      message += '<p>Client Mobile Number missing</p>';
    };

    if(!clientForm.clntEmail) {
      message += '<p>Client Email missing</p>';
    };

    return message;
  }

  // Validate compulsory fields for Corporate client
  validateCorporate(clientForm){
    let message = ''; 
    
    if(!clientForm.clntCompanyName) {
      message += '<p>Company missing</p>';
    };

    if(!clientForm.clntRcNo) {
      message += '<p>Registration Number missing</p>';
    };

    if(!clientForm.clntMobile) {
      message += '<p>Client Mobile Number missing</p>';
    };

    if(!clientForm.clntEmail) {
      message += '<p>Client Email missing</p>';
    };

    return message;
  }

  // Add a New Client
  addNewClient(clientForm){
    this.setupService.addClient(clientForm)
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

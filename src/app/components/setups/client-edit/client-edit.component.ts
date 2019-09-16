import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from '../../../models/Client';
import { Occupation } from '../../../models/Occupation';
import { Country } from '../../../models/Country';
import { Sector } from '../../../models/Sector';

import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
  id: number;

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

import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute } from '@angular/router';

import { User} from '../../../models/User';
import { Country} from '../../../models/Country';

import {NgForm} from '@angular/forms'; 

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  id: string;

  user: User = {};
  users: User[] = [];

  country: Country = null;
  countries: Country[];

  title: any = null;
  titles: any[] = ['Admiral', 'Air Chief Marshall', 'Air Commodore',' Air Marshall', 'Air Vice Marshall', 'Airman', 'Alhaja', 'Alhaji', 'Architect', 'Baron', 'Baroness', 'Barrister', 'Bean', 'Bishop', 'Bombardier', 'Brigadier', 'Brother', 'Canon', 'Captain', 'Cardinal', 'Chief', 'Colonel', 'Commander', 'Commodore', 'Corporal', 'Councillor', 'Count', 'Countess', 'Dame', 'Deacon', 'Deaconess', 'Dean', 'Doctor', 'Elder', 'Emir', 'Engineer', 'Executor(s) of', 'Evangelist', 'Father', 'Field Marshall',' Flight Lieutenant', 'Flight Sergeant', 'General',' Group Captain', 'Gunner', 'Hajia', 'Honourable', 'Judge', 'Lady', 'Lance Bombardier', 'Lance Corporal', 'Lieutenant', 'Lieutenant Colonel', 'Colonel', 'Lieutenant', 'Commander', 'Lieutenant General', 'Lord', 'Major', 'Mallam', 'Master', 'Master', 'Sergeant', 'Miss', 'Mother', 'Mr', 'Mr Justice', 'Mrs', 'Mr & Mrs', 'Ms', 'Oba', 'Otunba', 'Pastor', 'Prince', 'Princess', 'Private', 'Professor', 'Provost', 'Rabbi', 'Rear Admiral', 'Regimental Sergeant Major', 'Reverend', 'Right Reverend', 'Sergeant', 'Sir', 'Sister', 'Squadron Leader', 'Staff Sergeant', 'The Honourable Lady', 'The Honourable Mrs', 'The Honourable Sir', 'The Right Honourable', 'Very Reverend',  'Viscount', 'Viscountess',' Warrant Officer', 'Wing Commander'];


  constructor(
    private setupService: SetupService,
    private router: Router, 
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.setupService.getUser(this.id).subscribe(user => {
      this.user = user;
    });

    this.setupService.getCountries().subscribe(result => {
      this.countries = result;
    });
  }

  // When the form is submitted
  onSubmit(userForm: NgForm) { 
    if (!userForm) {
      this.flashMessage.show('Please fill out the form correctly', { cssClass: 'alert-danger', timeout: 4000 });
    } else {
      this.user = userForm.value;
      this.user.userId = this.id;
      this.setupService.updateUser(this.user).subscribe(response => {
          // this.flashMessage.show('New user added', { cssClass: 'alert-success', timeout: 4000 });
          this.setupService.getUsers().subscribe(users => this.users = users);
          console.log(response),
          this.user = response,
          err => console.log(err)
          this.router.navigate([`/user-details/${this.id}`]);
        });
        
    }
  }

}

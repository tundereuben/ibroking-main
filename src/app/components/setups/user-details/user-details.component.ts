import { Component, OnInit } from '@angular/core'; 
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../models/User';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  id: string;
  user: User;
  users: User[];

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
  }

  deleteUser(user){
    if(confirm('Confirm Delete user')) {
      this.setupService.deleteUser(user).subscribe(data => {
        this.setupService.getUsers().subscribe(users => this.users = users);
        this.router.navigate(['/crm']);
      });
    }
  }

}

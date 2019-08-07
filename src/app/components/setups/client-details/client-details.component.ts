import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from '../../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id:number;
  client: any = {};
  clients: Client[] = [];
  corporate = false;

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
    });
  }

  deleteClient(client){
    this.setupService.deleteClient(client).subscribe(data => {
      this.setupService.getClients().subscribe(clients => this.clients = clients);
      this.router.navigate(['/crm']);
    });
  }

}

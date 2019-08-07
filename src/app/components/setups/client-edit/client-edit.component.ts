import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from '../../../models/Client';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
  id:number;
  client: any = {};
  clients: Client[] = [];
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
      console.log(this.client);
    });
  }

}

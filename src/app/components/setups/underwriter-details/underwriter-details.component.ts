import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Underwriter } from '../../../models/Underwriter';

@Component({
  selector: 'app-underwriter-details',
  templateUrl: './underwriter-details.component.html',
  styleUrls: ['./underwriter-details.component.css']
})
export class UnderwriterDetailsComponent implements OnInit {
  id: number;
  underwriter: Underwriter;
  underwriters: Underwriter[];

  constructor(
    private setupService: SetupService,
    private router: Router, 
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.setupService.getUnderwriter(this.id).subscribe(underwriter => {
      this.underwriter = underwriter;
      // console.log(this.underwriter);
    });
  }

  deleteUnderwriter(underwriter){
    if(confirm('Confirm Delete underwriter')) {
      this.setupService.deleteUnderwriter(underwriter).subscribe(data => {
        this.setupService.getUnderwriters().subscribe(underwriters => this.underwriters = underwriters);
        this.router.navigate(['/crm']);
      });
    }
  }


}

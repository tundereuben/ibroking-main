import { Component, OnInit } from '@angular/core';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { setupClass } from '../../../models/Class';

@Component({
  selector: 'app-class-edit',
  templateUrl: './class-edit.component.html',
  styleUrls: ['./class-edit.component.css']
})
export class ClassEditComponent implements OnInit {

  id: number;
  class: setupClass = {
    claCode: 0,
    claShtDesc: '',
    claDesc: ''
  }

  constructor(
    private setupService: SetupService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) {  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.setupService.getClass(this.id).subscribe((data) => {
      this.class = data;
      console.log(this.class);
    })
  }

  // onSubmit({value, valid}: {value: setupClass, valid: boolean}) {
  //   if(!valid) {
  //     this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 4000});
  //   } else {
  //     this.setupService.updateClass(value);
  //     this.flashMessage.show('Class Updated', {cssClass: 'alert-success', timeout: 4000});
  //     this.router.navigate(['/class']);
  //   }
  // }

  onSubmit(value): void {
    this.setupService.updateClass(value)
      .subscribe(() => {
        this.flashMessage.show('Class Updated', {cssClass: 'alert-success', timeout: 4000});
        this.router.navigate(['/class']);
      })
  }

}

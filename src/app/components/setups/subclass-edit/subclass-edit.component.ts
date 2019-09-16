import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Subclass } from '../../../models/Subclass';
import { Clause } from '../../../models/Clause';
import { Policy } from '../../../models/Policy';
import { Id } from '../../../models/Id';
import { Discount } from '../../../models/Discount';
import { Loading } from '../../../models/Loading';
import { Commission } from '../../../models/Commission';
import { Extension } from '../../../models/Extension';
import { Benefit } from '../../../models/Benefit';
import { Rate } from '../../../models/Rate';
// import { read, readFile } from 'fs';

@Component({
  selector: 'app-subclass-edit',
  templateUrl: './subclass-edit.component.html',
  styleUrls: ['./subclass-edit.component.css']
})
export class SubclassEditComponent implements OnInit {
  subclasses: Subclass[];
  subclass: Subclass = {};
  sclCode: number; // get subclass ID from Navigation

  ids: Id[] = [];
  id: Id = {};
  idFile: any;

  rates: Rate[] = [];
  rate: Rate = {};

  benefits: Benefit[] = [];
  benefit: Benefit = {};

  commissions: Commission[] = [];
  commission: Commission = {};

  discounts: Discount[] = [];
  discount: Discount = {};

  loadings: Loading[] = [];
  loading: Loading = {};  

  clauses: Clause[] = [];
  clause: Clause = {};

  extensions: Extension[] = [];
  extension: Extension = {};

  // For Discount, Loading, Commission, etc
  types: string[];
  type: string = null;
  calcOns: string[];
  calcOn: string = null;
  idTypes: any[];

  



  constructor(
    private flashMessage: FlashMessagesService,
    private setupService: SetupService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
   
    // Get id from url, then fetch subclass, Ids, Benefits, Commissions, Discounts, Loadings, Clauses & Extensions
    this.sclCode = this.route.snapshot.params['id'];

    this.setupService.getSubclass(this.sclCode).subscribe(subclass => {
      this.subclass = subclass;
    });

    this.setupService.getIdsBySubclassCode(this.sclCode).subscribe(ids => {
      this.ids = ids;
    });

    this.setupService.getRatesBySubclassCode(this.sclCode).subscribe(rates => {
      this.rates = rates; 
    });
    
    this.setupService.getBenefitsBySubclassCode(this.sclCode).subscribe(benefits => {
      this.benefits = benefits; 
    });

    this.setupService.getCommissionsBySubclassCode(this.sclCode).subscribe(commissions => {
      this.commissions = commissions; 
    });

    this.setupService.getDiscountsBySubclassCode(this.sclCode).subscribe(discounts => {
      this.discounts = discounts; 
    });

    this.setupService.getDiscountsBySubclassCode(this.sclCode).subscribe(discounts => {
      this.discounts = discounts; 
    });

    this.setupService.getLoadingsBySubclassCode(this.sclCode).subscribe(loadings => {
      this.loadings = loadings; 
    });

    this.setupService.getClausesBySubclassCode(this.sclCode).subscribe(clauses => {
      this.clauses = clauses; 
    });

    this.setupService.getExtensionsBySubclassCode(this.sclCode).subscribe(extensions => {
      this.extensions = extensions; 
    });

    // IDs
    this.idTypes = ['Text', 'Number', 'Date', 'Boolean'];

    // For Discount, Loading, Commission, etc
    this.types = ['Rate', 'Value'];
    this.calcOns = ['Premium', 'Sum Insured'];
    
  }

  // When An ID is added
  addId(){
    this.id.idName = (<HTMLInputElement>document.getElementById('idName')).value;
    this.id.idType = (<HTMLInputElement>document.getElementById('idType')).value;
    this.id.idPolCode = this.subclass.sclPolCode; 
    this.id.idSclCode = this.subclass.sclCode;
    if(!this.id.idName) {
      // Show Error Message 
      this.showAlert('idMessage'); 
    } else {
      const sub =  this.setupService.addId(this.id)
      .subscribe(id => {
        this.ids.push(id); 
        // Fetch IDs
        this.setupService.getIdsBySubclassCode(this.id.idSclCode).subscribe(ids => {
          this.ids = ids;
        });
        (<HTMLInputElement>document.getElementById('idName')).value='';
      });
    }
  }

   // Delete a ID 
   deleteId(id: Id)  : void {
    this.setupService.deleteId(id).subscribe(data => this.ids = this.ids.filter(c => c !== id))
  }

   // When a RATE is added
   addRate(){
    this.rate.rateName = (<HTMLInputElement>document.getElementById('rateName')).value;
    this.rate.rateDefaultValue = parseFloat((<HTMLInputElement>document.getElementById('rateDefaultValue')).value);
    this.rate.ratePolCode = this.subclass.sclPolCode; 
    this.rate.rateSclCode = this.subclass.sclCode;
    if(!this.rate.rateName) {
      // Show Error Message 
      this.showAlert('rateMessage'); 
    } else {
      const sub =  this.setupService.addRate(this.rate)
      .subscribe(rate => {
        this.rates.push(rate); 
        // Fetch Rates
        this.setupService.getRatesBySubclassCode(this.rate.rateSclCode).subscribe(rates => {
          this.rates = rates;
        });
        (<HTMLInputElement>document.getElementById('rateName')).value='';
        (<HTMLInputElement>document.getElementById('rateDefaultValue')).value = '';
      });
    }
  }

   // Delete a ID 
   deleteRate(rate: Rate)  : void {
    this.setupService.deleteRate(rate).subscribe(data => this.rates = this.rates.filter(c => c !== rate))
  }



  // When a Benefit is added
  addBenefit(){
    this.benefit.bftName = (<HTMLInputElement>document.getElementById('bftName')).value;
    this.benefit.bftRate = parseFloat((<HTMLInputElement>document.getElementById('bftRate')).value);
    this.benefit.bftNo = parseFloat((<HTMLInputElement>document.getElementById('bftNo')).value);
    this.benefit.bftMultBy = parseFloat((<HTMLInputElement>document.getElementById('bftMultBy')).value);
    this.benefit.bftPolCode = this.subclass.sclPolCode;
    this.benefit.bftSclCode = this.subclass.sclCode

    if(!this.benefit.bftName) {
      // Show Error Message 
      this.showAlert('benefitMessage'); 
    } else {
      const sub =  this.setupService.addBenefit(this.benefit)
      .subscribe(benefit => {
        this.benefits.push(benefit); 
         // Fetch Benefits
         this.setupService.getBenefitsBySubclassCode(this.benefit.bftSclCode).subscribe(benefits => {
          this.benefits = benefits;
        });
        (<HTMLInputElement>document.getElementById('bftName')).value='';
        (<HTMLInputElement>document.getElementById('bftRate')).value ='';
        (<HTMLInputElement>document.getElementById('bftNo')).value ='';
        (<HTMLInputElement>document.getElementById('bftMultBy')).value;
      });
    }
  }

  // Delete a Benefit 
  deleteBenefit(benefit: Benefit)  : void {
    this.setupService.deleteBenefit(benefit)
    .subscribe(data => {
      this.benefits = this.benefits.filter(c => c !== benefit);
    })
  }


   // When a Commission is added
   addCommission(){
    this.commission.commName = (<HTMLInputElement>document.getElementById('commName')).value;
    this.commission.commType = (<HTMLInputElement>document.getElementById('commType')).value;
    this.commission.commCalcOn = (<HTMLInputElement>document.getElementById('commCalcOn')).value;
    this.commission.commDefaultValue = parseFloat((<HTMLInputElement>document.getElementById('commDefaultValue')).value);
    this.commission.commVat = parseFloat((<HTMLInputElement>document.getElementById('commVat')).value);
    this.commission.commPolCode = this.subclass.sclPolCode; 
    this.commission.commSclCode = this.subclass.sclCode;

    if(!this.commission.commName) {
      // Show Error Message 
      this.showAlert('commissionMessage'); 
    } else {
      const sub =  this.setupService.addCommission(this.commission)
      .subscribe(commission => {
        this.commissions.push(commission); 
        // Fetch Commissions
        this.setupService.getCommissionsBySubclassCode(this.commission.commSclCode).subscribe(commissions => {
          this.commissions = commissions;
        });
        (<HTMLInputElement>document.getElementById('commName')).value='';
        (<HTMLInputElement>document.getElementById('commDefaultValue')).value = '';
        (<HTMLInputElement>document.getElementById('commVat')).value = '';
      });
    }
  }

  // Delete a Commission => make this a function that other modules can call
  deleteCommission(commission: Commission)  : void {
    this.setupService.deleteCommission(commission)
    .subscribe(data => {
      this.commissions = this.commissions.filter(c => c !== commission);
    })
  }

  // When a Discount is added
  addDiscount(){
    this.discount.dsctName = (<HTMLInputElement>document.getElementById('dsctName')).value;
    this.discount.dsctType = (<HTMLInputElement>document.getElementById('dsctType')).value;
    this.discount.dsctCalcOn = (<HTMLInputElement>document.getElementById('dsctCalcOn')).value;
    this.discount.dsctDefaultValue = parseFloat((<HTMLInputElement>document.getElementById('dsctDefaultValue')).value);
    this.discount.dsctPolCode = this.subclass.sclPolCode; 
    this.discount.dsctSclCode = this.subclass.sclCode;
    // console.log(this.discount);

    if(!this.discount.dsctName) {
      // Show Error Message 
      this.showAlert('discountMessage'); 
    } else {
      const sub =  this.setupService.addDiscount(this.discount)
      .subscribe(discount => {
        this.discounts.push(discount); 
        // Fetch DISCOUNTS
        this.setupService.getDiscountsBySubclassCode(this.discount.dsctSclCode).subscribe(discounts => {
          this.discounts = discounts;
        });
        (<HTMLInputElement>document.getElementById('dsctName')).value='';
      });
    }
  }

  // Delete a Discount
  deleteDiscount(discount: Discount)  : void {
    this.setupService.deleteDiscount(discount)
    .subscribe(data => {
      this.discounts = this.discounts.filter(c => c !== discount);
    })
  }

   // When a Loading is added
   addLoading(){
    this.loading.loadName = (<HTMLInputElement>document.getElementById('loadName')).value;
    this.loading.loadType = (<HTMLInputElement>document.getElementById('loadType')).value;
    this.loading.loadCalcOn = (<HTMLInputElement>document.getElementById('loadCalcOn')).value;
    this.loading.loadDefaultValue = parseFloat((<HTMLInputElement>document.getElementById('loadDefaultValue')).value);
    this.loading.loadPolCode = this.subclass.sclPolCode; 
    this.loading.loadSclCode = this.subclass.sclCode;

    if(!this.loading.loadName) {
      // Show Error Message 
      this.showAlert('loadingMessage'); 
    } else {
      const sub =  this.setupService.addLoading(this.loading)
      .subscribe(loading => {
        this.loadings.push(loading); 
        // Fetch Loadings
        this.setupService.getLoadingsBySubclassCode(this.loading.loadSclCode).subscribe(loadings => {
          this.loadings = loadings;
        });
        (<HTMLInputElement>document.getElementById('loadName')).value='';
      });
    }
  }

  // Delete a Loading => make this a function that other modules can call
  deleteLoading(loading: Loading)  : void {
    this.setupService.deleteLoading(loading)
    .subscribe(data => {
      this.loadings = this.loadings.filter(c => c !== loading);
    })
  }

  // When A Clause is added
  addClause(){
    this.clause.clsName = (<HTMLInputElement>document.getElementById('clsName')).value;
    this.clause.clsPolCode = this.subclass.sclPolCode;
    this.clause.clsSclCode = this.subclass.sclCode;
    if(!this.clause.clsName) {
      // Show Error Message 
      this.showAlert('clauseMessage'); 
    } else {
      const sub =  this.setupService.addClause(this.clause)
      .subscribe(clause => {
        this.clauses.push(clause); 
        //  Fetch Clauses
          this.setupService.getClausesBySubclassCode(this.clause.clsSclCode).subscribe(clauses => {
            this.clauses = clauses;
        });
        (<HTMLInputElement>document.getElementById('clsName')).value='';
      });     
    }
  }

   // Delete a Clause 
   deleteClause(clause: Clause)  : void {
    this.setupService.deleteClause(clause)
    .subscribe(data => {
      this.clauses = this.clauses.filter(c => c !== clause);
    })
  }

   // When an Extension is added
   addExtension(){
    this.extension.extName = (<HTMLInputElement>document.getElementById('extName')).value;
    this.extension.extPolCode = this.subclass.sclPolCode;
    this.extension.extSclCode = this.subclass.sclCode;
    if(!this.extension.extName) {
      // Show Error Message 
      this.showAlert('extensionMessage'); 
    } else {
      this.extension.extPolCode = this.subclass.sclPolCode;
      const sub =  this.setupService.addExtension(this.extension)
      .subscribe(extension => {
        this.extensions.push(extension); 
        // Fetch Extensions
        this.setupService.getExtensionsBySubclassCode(this.extension.extSclCode ).subscribe(extensions => {
          this.extensions = extensions;
          // console.log(this.extensions);
        });
        (<HTMLInputElement>document.getElementById('extName')).value='';
      });
    }
  }

  // Delete a Commission => make this a function that other modules can call
  deleteExtension(extension: Extension)  : void {
    this.setupService.deleteExtension(extension)
    .subscribe(data => {
      this.extensions = this.extensions.filter(c => c !== extension);
    })
  }

  

 
  // onSubmit({value, valid}: {value: Subclass, valid: boolean}) {
  //   if(!valid) {
  //     // Show Error Message
  //     this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 5000});
  //   } else {
  //     // Add id to Subclass, then update
  //     value.id = this.id;
  //     this.setupService.updateSubclass(value);
  //     this.flashMessage.show('New Subclass Added', {cssClass: 'alert-success', timeout: 5000});
  //     this.router.navigate(['/subclass']);
  //   }
  // }

  // Set the classCode and productCode
  // setClassCode(e) {
  //   var index = this.classCodes.indexOf(e);
  //   this.classCode = this.classCode[index].classCode; 
  // }

  // Display error message
  showAlert(id) {
    let alertMessage = (<HTMLInputElement>document.getElementById(`${id}`));
      alertMessage.innerHTML = `<span class="alert alert-danger">Please fill out form correctly!</span>`;
      setTimeout(() => {
        alertMessage.innerHTML = ''
      }, 3000);
  }




  // uploadFile(e){
  //   this.idFile = e.target.files[0];
  //   this.readFile(this.idFile);
  //   console.log(this.idFile);
  // }

  // readFile(file) {
  //   let fileReader = new FileReader();
  //   fileReader.onload = (e) => {
  //     console.log(fileReader.result);
  //   }
  //   fileReader.readAsText(file);
  // }
}

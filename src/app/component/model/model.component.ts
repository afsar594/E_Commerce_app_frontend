import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent {
  filterForm: any;
  allbrandcategory:any;
  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<ModelComponent>,
    private api: ApiService
    
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ModelComponent, {
      width: '250px',  // You can configure the dialog width and other options
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log('The dialog was closed',result);
      // Handle dialog result if needed
    });
  }




  ngOnInit() {
    // Initialize the FormGroup with FormControls for each checkbox
    this.filterForm = new FormGroup({
      oppo: new FormControl(''),
      tecno: new FormControl(''),
      goldenMark: new FormControl(''),
      hardware: new FormControl(''),
      electronic: new FormControl(''),

    });
   this.getBrandcategory()
    }

  filter(): void {
    console.log("Form Values: ", this.filterForm.value);
    // const selectedBrands = [];
    // const selectedCategories = [];

    // if (this.filterForm.value.oppo) selectedBrands.push('OPPO');
    // if (this.filterForm.value.tecno) selectedBrands.push('Tecno');
    // if (this.filterForm.value.goldenMark) selectedBrands.push('GoldenMark');

    // if (this.filterForm.value.hardware) selectedCategories.push('Hardware');
    // if (this.filterForm.value.electronic) selectedCategories.push('Electronic');

    // console.log('Selected Brands: ', selectedBrands);
    // console.log('Selected Categories: ', selectedCategories);
    // Send form data back to parent on filter action
    this.dialogRef.close(this.filterForm.value);
  }
  getBrandcategory(){
    this.api.getBrandcategory().subscribe((res:any)=>{
      this.allbrandcategory=res
      console.log("res",res)
    })
  }
}

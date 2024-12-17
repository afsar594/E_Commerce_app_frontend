import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  brands: string[] = []; 
  categories: string[] = []; 

  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<ModelComponent>,
    private api: ApiService,private fb: FormBuilder,
    
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ModelComponent, {
      width: '250px',  
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log('The dialog was closed',result);
      // Handle dialog result if needed
    });
  }




  ngOnInit() {
    this.initializeForm()  
     this.getBrandcategory()
    }
    initializeForm() {
      this.filterForm = this.fb.group({});
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
      this.extractDynamicValues(res);
    })
  }
  extractDynamicValues(data: any[]) {
    const brandSet = new Set<string>();
    const categorySet = new Set<string>();

    // Extract unique brands and categories
    data.forEach(item => {
      if (item.brand) brandSet.add(item.brand.toLowerCase());
      if (item.category) categorySet.add(item.category.toLowerCase());
    });

    this.brands = Array.from(brandSet);
    this.categories = Array.from(categorySet);

    // Dynamically add form controls for checkboxes
    this.brands.forEach(brand => this.filterForm.addControl(brand, this.fb.control(false)));
    this.categories.forEach(category => this.filterForm.addControl(category, this.fb.control(false)));
  }
}

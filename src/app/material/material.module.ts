import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Import MatSnackBarModule
import {MatDialogModule} from '@angular/material/dialog';




@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,MatCardModule,MatFormFieldModule,MatToolbarModule,
    MatSnackBarModule,MatDialogModule
  ],
  exports: [
    MatButtonModule,MatCardModule,MatFormFieldModule,MatToolbarModule,MatSnackBarModule,MatDialogModule
  ]
})
export class MaterialModule { }

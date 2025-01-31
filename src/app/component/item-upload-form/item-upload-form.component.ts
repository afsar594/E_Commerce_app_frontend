import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-item-upload-form',
  templateUrl: './item-upload-form.component.html',
  styleUrls: ['./item-upload-form.component.css']
})
export class ItemUploadFormComponent implements OnInit {
  itemForm: any;
  selectedFile: File | null = null;
  selectedFileBase64: string | null = null;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private Notification: ToastServiceService
  ) { }

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      Name: ['', Validators.required],
      Price: ['', Validators.required],
      Brand: ['', Validators.required],
      Category: ['', Validators.required],
      quantity: ['', Validators.required],
      Description: [''],
      FilePath: ['']
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.selectedFileBase64 = reader.result as string;

      };

      reader.readAsDataURL(this.selectedFile);
    }
  }

  onUpload(): void {
    if (!this.itemForm.valid) {
      console.error('Form is invalid');
      return;
    }

    if (this.selectedFileBase64) {
      this.itemForm.patchValue({
        FilePath: this.selectedFileBase64,
      });
      this.api.saveItem(this.itemForm.value).subscribe({
        next: (res) => {
          if (res) {
            this.Notification.showNotification('Data saved successfully!', 'Close');
          }
        },
        error: (err) => {
          // this.Notification.showError('Failed to save data!', 'Error');
          console.error("Error:", err);
        }
      });
    }
  }
}
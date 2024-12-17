import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {

  constructor(private snackBar: MatSnackBar) {}

  showNotification(message: string, action: string = 'Close', duration: number = 3000, type: 'success' | 'error' = 'success') {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top', // Change to 'top' for top right position
    });

    // Apply custom styles based on the notification type
    snackBarRef.afterDismissed().subscribe(() => {
      // Optionally handle after dismissal
    });

    // Listen for the snack bar to open and then apply styles
    snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
    });

    snackBarRef.afterOpened().subscribe(() => {
      const element = document.querySelector('.mat-snack-bar-container');
      if (element) {
        element.classList.add(type === 'success' ? 'snackbar-success' : 'snackbar-error');
      }
    });
  }
}

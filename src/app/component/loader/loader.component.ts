import { Component } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  template: `
    <div *ngIf="loading | async" class="spinner-overlay">
      <div class="spinner"></div>
    </div>
  `,
  styles: [`
    /* Overlay to cover the full screen */
    .spinner-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5); /* Optional: darken the background */
      display: flex;
      justify-content: center;  /* Center horizontally */
      align-items: center;      /* Center vertically */
      z-index: 9999;            /* Ensure it is on top */
    }

    /* Spinner styles */
    .spinner {
      width: 88px;
      height: 88px;
      display: grid;
      border-radius: 50%;
      -webkit-mask: radial-gradient(farthest-side, #0000 40%, #fff 41%); /* Changed to white */
      background: linear-gradient(0deg, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 1) 0) center/7px 100%,
        linear-gradient(90deg, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0.75) 0) center/100% 7px; /* Changed to white */
      background-repeat: no-repeat;
      animation: spinner-d3o0rx 1.2s infinite steps(12);
    }

    .spinner::before,
    .spinner::after {
      content: "";
      grid-area: 1/1;
      border-radius: 50%;
      background: inherit;
      opacity: 0.915;
      transform: rotate(30deg);
    }

    .spinner::after {
      opacity: 0.83;
      transform: rotate(60deg);
    }

    @keyframes spinner-d3o0rx {
      100% {
        transform: rotate(1turn);
      }
    }
  `]
})
export class LoaderComponent {
  loading = this.loaderService.loading$;

  constructor(private loaderService: LoaderService) {}
}

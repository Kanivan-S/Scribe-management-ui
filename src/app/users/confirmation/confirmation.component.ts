import { Component } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent {
  confirmationMessage: string = '';

  confirm(accepted: boolean): void {
    this.confirmationMessage = accepted ? 'You have accepted.' : 'You have rejected.';
  }
}

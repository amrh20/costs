import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CheckboxModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  amount: any;
  reason: string = '';
  isCurrentMonthOnly: boolean = false;
  isOtherAccounts: boolean = false;

  entries: any[] = [];
  currentMonthTotal: number = 0;
  otherAccountsTotal: number = 0;
  overallTotal: number = 0;

  addEntry() {
    let color = 'black';

    if (this.isCurrentMonthOnly) {
      color = 'red';
      this.currentMonthTotal += this.amount;
    } else if (this.isOtherAccounts) {
      color = 'green';
      this.otherAccountsTotal += this.amount;
    }

    this.entries.push({ amount: this.amount, reason: this.reason, color });
    this.overallTotal += this.amount;

    // Reset the form inputs
    this.amount = 0;
    this.reason = '';
    this.isCurrentMonthOnly = false;
    this.isOtherAccounts = false;
  }

  deleteEntry(index: number) {
    const entry = this.entries[index];

    if (entry.color === 'red') {
      this.currentMonthTotal -= entry.amount;
    } else if (entry.color === 'green') {
      this.otherAccountsTotal -= entry.amount;
    }

    this.overallTotal -= entry.amount;
    this.entries.splice(index, 1);
  }


}

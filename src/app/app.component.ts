import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CheckboxModule } from 'primeng/checkbox';
interface Entry {
  amount: number;
  reason: string;
  isCurrentMonthOnly: boolean;
  isOtherAccounts: boolean;
  color: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CheckboxModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  amount: number = 0;
  reason: string = '';
  isCurrentMonthOnly: boolean = false;
  isOtherAccounts: boolean = false;
  entries: Entry[] = [];
  currentMonthTotal: number = 0;
  otherAccountsTotal: number = 0;
  overallTotal: number = 0;

  ngOnInit() {
    this.loadEntriesFromLocalStorage();
    this.calculateTotals();
  }

  addEntry() {
    const color = this.isCurrentMonthOnly ? 'red' : this.isOtherAccounts ? 'green' : 'black';
    const newEntry: Entry = {
      amount: this.amount,
      reason: this.reason,
      isCurrentMonthOnly: this.isCurrentMonthOnly,
      isOtherAccounts: this.isOtherAccounts,
      color: color
    };
    this.entries.push(newEntry);
    this.saveEntriesToLocalStorage();
    this.calculateTotals();
    this.clearInputs();
  }

  deleteEntry(index: number) {
    this.entries.splice(index, 1);
    this.saveEntriesToLocalStorage();
    this.calculateTotals();
  }

  saveEntriesToLocalStorage() {
    localStorage.setItem('entries', JSON.stringify(this.entries));
  }

  loadEntriesFromLocalStorage() {
    const entries = localStorage.getItem('entries');
    if (entries) {
      this.entries = JSON.parse(entries);
    }
  }

  calculateTotals() {
    this.currentMonthTotal = this.entries
      .filter(entry => entry.isCurrentMonthOnly)
      .reduce((total, entry) => total + entry.amount, 0);
    this.otherAccountsTotal = this.entries
      .filter(entry => entry.isOtherAccounts)
      .reduce((total, entry) => total + entry.amount, 0);
    this.overallTotal = this.entries.reduce((total, entry) => total + entry.amount, 0);
  }

  clearInputs() {
    this.amount = 0;
    this.reason = '';
    this.isCurrentMonthOnly = false;
    this.isOtherAccounts = false;
  }


}

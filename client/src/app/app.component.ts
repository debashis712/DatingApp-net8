import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { AccountService } from './_services/account.service';
import { HomeComponent } from "./home/home.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  private accountService = inject(AccountService);
  title = 'DatingApp';
  users: any;

  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString)  return;
      const user = JSON.parse(userString);
      this.accountService.currentUser.set(user);
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (response: any) => (this.users = response),
      error: (error: any) => console.log(error),
      complete: () => console.log('Request has completed'),
    });
  }
}

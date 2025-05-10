import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeService } from '../../services/home.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  welcomedata: any;


  constructor(
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.homeService.getWelcome().subscribe((orders: any) => {
      this.welcomedata = orders.success ? orders.data : [];
      console.log(this.welcomedata);
    });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Portfolio } from 'src/app/models/portfolio.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-portfolio-list-item',
  templateUrl: './portfolio-list-item.component.html',
  styleUrls: ['./portfolio-list-item.component.css']
})
export class PortfolioListItemComponent implements OnInit {
  @Input() portfolio?: Portfolio;

  constructor() { }

  ngOnInit(): void {
  }

}

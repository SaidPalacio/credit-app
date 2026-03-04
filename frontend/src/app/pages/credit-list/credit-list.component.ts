import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreditService } from '../../services/credit.service';

@Component({
  selector: 'app-credit-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './credit-list.component.html',
  styleUrls: ['./credit-list.component.css']
})
export class CreditListComponent implements OnInit {

  credits:any[] = [];

  filters:any = {
    client_name:'',
    client_id:'',
    commercial_name:'',
    sort:''
  };

  constructor(private service: CreditService) {}

  ngOnInit(){
    this.load();
  }

  load(){
    this.service.get(this.filters)
      .subscribe((res:any)=> this.credits = res);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message | undefined;
  user: User | undefined;

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    if (this.message) {
      this.getUser(this.message.userId);
      this.message.timeStamp = new Date(this.message.timeStamp).toLocaleString()
    }
  }

  getUser(userId: string) {
    this.userService.getUserById(userId)
      .subscribe((data: User) => {
        this.user = data;
      });
  }
}

import {Component, OnInit} from '@angular/core';
import {Avatar} from 'primeng/avatar';
import {Button} from 'primeng/button';
import {FriendlistItemComponent} from '../../components/friendlist-item/friendlist-item.component';
import {InputText} from 'primeng/inputtext';
import {MessageComponent} from '../../components/message/message.component';
import {NgForOf} from '@angular/common';
import {VerticalMenuComponent} from '../../components/vertical-menu/vertical-menu.component';
import {Textarea} from 'primeng/textarea';
import {Interest, User, UserService} from '../../services/user.service';
import {Chip} from 'primeng/chip';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-page-reglages',
  imports: [
    Avatar,
    Button,
    FriendlistItemComponent,
    InputText,
    MessageComponent,
    NgForOf,
    VerticalMenuComponent,
    Textarea,
    Chip,
    ReactiveFormsModule
  ],
  templateUrl: './page-reglages.component.html',
  standalone: true,
  styleUrls: ['./page-reglages.component.scss', '../page-reglages/page-reglages.component.scss']
})
export class PageReglagesComponent implements OnInit {

  user : User | null = null;
  interests : Interest[] = [];
  description : string | undefined = "";
  descriptionText = new FormControl("");
  displayNameText = new FormControl("");
  interestText = new FormControl("");


  constructor(private userService: UserService) {}

  async ngOnInit() {
    try {
      this.user = await this.userService.getCurrentUser();
      (this.user?.settings.description) ? this.description = this.user?.settings.description : "";

      if (this.user?.username) {
        this.userService.getUserInterests(this.user.username).subscribe({
          next: (value) => {
            this.interests = value;
          },
          error: (err) => {
            console.error('Failed to load interests', err);
          }
        });
      }
    } catch (err) {
      console.error('Failed to load user', err);
    }
  }

  get uniqueInterests(): Interest[] {
    const seen = new Set<string>();
    return this.interests.filter(i => {
      if (seen.has(i.interest)) {
        return false;
      } else {
        seen.add(i.interest);
        return true;
      }
    });
  }


  onRemoveInterest(tag: Interest) {
    // Filter out all interests matching the deleted interest
    this.interests = this.interests.filter(i => i.interest !== tag.interest);

    // Call backend to delete all user interests matching this interest
    this.userService.deleteUserInterest(this.user?.username || "", tag.interest).subscribe({
      next: (value) => {
        console.log('Deleted all duplicates of', tag.interest, value);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onAddInterest() {

    let tag = this.interestText.value || "";

    let interst : Interest = {
      username : this.user?.username || "",
      interest : tag
    }

    this.interests.push(interst);

    this.userService.addUserInterest(this.user?.username || "", tag).subscribe({
      next : (value) => {
        console.log(value)
      },
      error : (err) => {
        console.error(err);
      }
    });

  }

  onChangeDisplayName() {
    let newName = this.displayNameText.value || "";
    if (!newName.trim()) {
      console.warn('Display name is empty, skipping update');
      return;
    }

    this.userService.updateUser(this.user?.username || "", {
      displayname: newName
    }).subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onChangeDescription() {
    let newDesc = this.descriptionText.value || "";
    if (!newDesc.trim()) {
      console.error('Description is empty, skipping update');
      return;
    }

    this.userService.updateUser(this.user?.username || "", {
      settings: { description: newDesc }
    }).subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


}

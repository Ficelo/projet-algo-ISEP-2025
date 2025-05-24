import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { Textarea } from 'primeng/textarea';
import {Post, PostService} from '../../services/post.service';
import {User, UserService} from '../../services/user.service';
import {FileUpload, UploadEvent} from 'primeng/fileupload';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Chip} from 'primeng/chip';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-post-creation-popup',
  standalone: true,
  templateUrl: './post-creation-popup.component.html',
  styleUrl: './post-creation-popup.component.scss',
  imports: [Button, Dialog, Textarea, FileUpload, ReactiveFormsModule, InputText, Chip, NgForOf]
})
export class PostCreationPopupComponent {
  visible: boolean = false;
  postText=  new FormControl("");
  tagsText = new FormControl("")
  imageBase64: string = '';
  errorUser : User;
  tags : string[] =  [];

  constructor(private postService: PostService, private userService: UserService) {

    this.errorUser = {
      username : "",
      displayname: "",
      password: "",
      settings: {},
      last_connection_date : new Date()
    }

  }

  showDialog() {
    this.visible = true;
  }

  addTag() {

    if(this.tagsText.value){
      this.tags.push(this.tagsText.value || "");
      this.tagsText.setValue("");
    }

  }

  removeTag(tag : string) {
    let index = this.tags.indexOf(tag);
    if (index !== -1) {
      this.tags.splice(index, 1);
    }
  }

  onFileSelect(event: { files: File[] }) {
    const file = event.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.imageBase64 = (reader.result as string).split(',')[1];
    };
    reader.readAsDataURL(file);
  }

  isPostPostable() {
    return !!(this.postText.value);
  }

  createPost() {
    this.visible = false
    const user = this.userService.getCurrentUser() || this.errorUser;

    const post : Post = {
      id : '',
      username : user.username,
      text: this.postText.value || "",
      image: this.imageBase64,
      date: new Date()
    };

    this.postService.createPost(post).subscribe({
      next: res => {
        console.log('Post created:', res);
        this.resetForm();

        for(let tag of this.tags) {
          this.postService.postTag(res.id, tag).subscribe({
            next : res => {
              console.log(res);
            }
          });
        }
      },
      error: err => console.error('Error creating post:', err)
    });
  }

  resetForm() {
    this.visible = false;
    this.postText.setValue("");
    this.imageBase64 = '';
  }

  protected readonly event = event;
}

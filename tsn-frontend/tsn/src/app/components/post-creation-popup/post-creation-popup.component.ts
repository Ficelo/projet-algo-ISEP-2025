import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { Textarea } from 'primeng/textarea';
import {Post, PostService} from '../../services/post.service';
import {User, UserService} from '../../services/user.service';
import {FileUpload, UploadEvent} from 'primeng/fileupload';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-post-creation-popup',
  standalone: true,
  templateUrl: './post-creation-popup.component.html',
  styleUrl: './post-creation-popup.component.scss',
  imports: [Button, Dialog, Textarea, FileUpload, ReactiveFormsModule]
})
export class PostCreationPopupComponent {
  visible: boolean = false;
  postText=  new FormControl("");
  imageBase64: string = '';
  errorUser : User;

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
      username : user.username,
      text: this.postText.value || "",
      image: this.imageBase64,
      date: new Date()
    };

    console.log(post);

    this.postService.createPost(post).subscribe({
      next: res => {
        console.log('Post created:', res);
        this.resetForm();
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

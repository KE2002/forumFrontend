import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  coverImage: string = '../../assets/images/coverImage1.jpg';
  userProfile: string =
    'https://api.dicebear.com/5.x/lorelei/svg?seed=Snowball';
  username: string = 'Akash';
  email: string = 'akash2003m@gmail.com';
  technology: string[] = ['C', 'C++'];
  recommendationControl = new FormControl();

  constructor() {}

  insertImg(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      if (
        file.size / 1048576 <= 2 &&
        (file.type.match('image/png*') ||
          file.type.match('image/jpg*') ||
          file.type.match('image/jpeg*'))
      ) {
        reader.onload = () => {
          console.log(reader.result);
          this.userProfile = reader.result as string;
        };
        console.log('True');
      } else {
        if (file.size / 1048576 > 2) {
        } else {
        }
      }
    }
  }

  addRecommendation(event: Event) {
    event.preventDefault();
    if (event != null) {
      const value: string = this.recommendationControl.value;
      if (value.length > 0) {
        this.technology = [...this.technology, value];
        this.recommendationControl.reset();
      }
    }
  }
  clearRecommendation(index: number) {
    if (index > -1) {
      this.technology.splice(index, 1);
    }
  }
}
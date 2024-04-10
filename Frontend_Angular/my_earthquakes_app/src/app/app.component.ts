import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Feature, Comment } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  features: Feature[] = [];
  magType = 'md';
  page = 1;
  perPage = 20;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getFeatures();
  }
  
  getFeatures() {
    this.apiService.getFeatures(this.magType, this.page, this.perPage).subscribe((data: {data: Feature[]}) => {
      this.features = data.data.map(feature => ({
        ...feature,
        newComment: ''
      }));
    });
  }

  createComment(feature: Feature) {
    if (feature.newComment) {
      this.apiService.createComment(feature.id, feature.newComment).subscribe((newComment: Comment) => {
        console.log(newComment);
        feature.newComment = '';
        if (feature.comments) {
          feature.comments.push(newComment);
        } else {
          feature.comments = [newComment];
        }
      });
    }
  }

  nextPage() {
    this.page++;
    this.getFeatures();
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.getFeatures();
    }
  }
}

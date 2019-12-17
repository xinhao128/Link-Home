import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  slides = [
    {img: "assets/slide1.jpg"},
    {img: "assets/slide2.jpg"},
  ];
	slideConfig = {"infinite": true, 
"arrows": false, "autoplay": true, "autoplaySpeed": 10000, "centerMode": true, "fade": true,  "cssEase": 'linear', "pauseOnHover": false};
  constructor() { }

  ngOnInit() {
  }

}

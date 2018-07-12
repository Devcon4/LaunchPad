import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../firebaseDataAccessLayer/content.service';
import { Content } from '../../models/content';

@Component({
  selector: 'app-content-fab',
  templateUrl: './content-fab.component.html',
  styleUrls: ['./content-fab.component.scss']
})
export class ContentFabComponent implements OnInit {

  toggled = false;

  constructor(private contentService: ContentService) { }

  ngOnInit() {
  }

  toggleDial() {
    this.toggled = !this.toggled;
  }

  addHeader() {
    this.contentService.createDoc(new Content({
      type: 'header',
      text: 'Some Text!',
      width: 12,
      ordinal: this.contentService.list.state.length++
    }));
  }

  addParagraph() {
    this.contentService.createDoc(new Content({
      type: 'paragraph',
      text: 'Enter some text!',
      width: 12,
      ordinal: this.contentService.list.state.length++

    }))
  }

  addImage() {

  }
}

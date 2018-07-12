import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentFabComponent } from './content-fab.component';

describe('ContentFabComponent', () => {
  let component: ContentFabComponent;
  let fixture: ComponentFixture<ContentFabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentFabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

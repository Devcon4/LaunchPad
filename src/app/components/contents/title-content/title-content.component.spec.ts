import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleContentComponent } from './title-content.component';

describe('TitleContentComponent', () => {
  let component: TitleContentComponent;
  let fixture: ComponentFixture<TitleContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

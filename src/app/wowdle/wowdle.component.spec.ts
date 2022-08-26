import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WowdleComponent } from './wowdle.component';

describe('WowdleComponent', () => {
  let component: WowdleComponent;
  let fixture: ComponentFixture<WowdleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WowdleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WowdleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

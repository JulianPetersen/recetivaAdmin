import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceraSelectedComponent } from './recera-selected.component';

describe('ReceraSelectedComponent', () => {
  let component: ReceraSelectedComponent;
  let fixture: ComponentFixture<ReceraSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceraSelectedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceraSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

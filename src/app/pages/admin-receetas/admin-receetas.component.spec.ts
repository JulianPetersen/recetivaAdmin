import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReceetasComponent } from './admin-receetas.component';

describe('AdminReceetasComponent', () => {
  let component: AdminReceetasComponent;
  let fixture: ComponentFixture<AdminReceetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminReceetasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminReceetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

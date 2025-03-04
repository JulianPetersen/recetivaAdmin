import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRecetaComponent } from './update-receta.component';

describe('UpdateRecetaComponent', () => {
  let component: UpdateRecetaComponent;
  let fixture: ComponentFixture<UpdateRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateRecetaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

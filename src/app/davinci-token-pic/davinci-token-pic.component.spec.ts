import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DavinciTokenPicComponent } from './davinci-token-pic.component';

describe('DavinciTokenPicComponent', () => {
  let component: DavinciTokenPicComponent;
  let fixture: ComponentFixture<DavinciTokenPicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DavinciTokenPicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DavinciTokenPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

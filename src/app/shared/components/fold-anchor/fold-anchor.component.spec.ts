import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldAnchorComponent } from './fold-anchor.component';

describe('FoldAnchorComponent', () => {
  let component: FoldAnchorComponent;
  let fixture: ComponentFixture<FoldAnchorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoldAnchorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoldAnchorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

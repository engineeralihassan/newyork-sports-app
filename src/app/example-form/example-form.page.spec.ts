import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleFormPage } from './example-form.page';

describe('ExampleFormPage', () => {
  let component: ExampleFormPage;
  let fixture: ComponentFixture<ExampleFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExampleFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

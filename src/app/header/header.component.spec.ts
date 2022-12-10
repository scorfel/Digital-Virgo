import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarOverviewExample } from './header.component';

describe('HeaderComponent', () => {
  let component: ToolbarOverviewExample;
  let fixture: ComponentFixture<ToolbarOverviewExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolbarOverviewExample]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ToolbarOverviewExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

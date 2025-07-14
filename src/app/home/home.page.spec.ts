import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { HomePage } from './home.page';

// Mocks
const menuControllerMock = {
  close: jasmine.createSpy()
};

const activatedRouteMock = {
  queryParams: {
    subscribe: jasmine.createSpy('subscribe').and.callFake((fn) => {
      fn({ email: 'test@example.com', password: '123' });
      return {
        unsubscribe: jasmine.createSpy()
      };
    })
  }
};

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let menuController: MenuController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        { provide: MenuController, useValue: menuControllerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    menuController = TestBed.inject(MenuController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should close menu on initialization', () => {
      component.ngOnInit();
      expect(menuController.close).toHaveBeenCalledWith('mainMenu');
    });

    it('should set email and password from route parameters', () => {
      component.ngOnInit();
      expect(component.email).toBe('test@example.com');
      expect(component.password).toBe('123');
    });
  });

  describe('Properties', () => {
    it('should have default welcome message', () => {
      expect(component.bienvenidos).toBe('Bienvenid@');
    });
  });
});

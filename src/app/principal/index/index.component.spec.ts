import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IndexComponent } from './index.component';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PersonajesAPIService, ModalServiceService } from 'src/app/shared/services';
import { of } from 'rxjs';

const characterList = {
  info: {
    pages: 2,
  },
  results: [{
    "id": 1,
    "name": "Rick Sanchez",
    "status": "Alive",
    "species": "Human",
    "type": "",
    "gender": "Male",
    "origin": {
      "name": "Earth",
      "url": "https://rickandmortyapi.com/api/location/1"
    },
    "location": {
      "name": "Earth",
      "url": "https://rickandmortyapi.com/api/location/20"
    },
    "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    "episode": [
      "https://rickandmortyapi.com/api/episode/1",
      "https://rickandmortyapi.com/api/episode/2",
      // ...
    ],
    "url": "https://rickandmortyapi.com/api/character/1",
    "created": "2017-11-04T18:48:46.250Z"
  },
  {
    "id": 2,
    "name": "Morty Smith",
    "status": "Alive",
    "species": "Human",
    "type": "",
    "gender": "Male",
    "origin": {
      "name": "Earth",
      "url": "https://rickandmortyapi.com/api/location/1"
    },
    "location": {
      "name": "Earth",
      "url": "https://rickandmortyapi.com/api/location/20"
    },
    "image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    "episode": [
      "https://rickandmortyapi.com/api/episode/1",
      "https://rickandmortyapi.com/api/episode/2",
      // ...
    ],
    "url": "https://rickandmortyapi.com/api/character/2",
    "created": "2017-11-04T18:50:21.651Z"
  }

],
};


describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let personajesAPIServiceSpy: jasmine.SpyObj<PersonajesAPIService>;
  beforeEach( () => {
    const spy = jasmine.createSpyObj('PersonajesAPIService', ['getCharacterPrueba']);

    TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ],
        declarations: [
          IndexComponent
        ],
        providers: [
          { provide: PersonajesAPIService, useValue: spy },
          ModalServiceService
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
});
beforeEach( () => {
  fixture = TestBed.createComponent(IndexComponent);
  component = fixture.componentInstance;
  personajesAPIServiceSpy = TestBed.inject(PersonajesAPIService) as jasmine.SpyObj<PersonajesAPIService>;

});

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should get characters', () => {
    expect(component.getCharacters()).toEqual([]);
  });


  fit('should call getCharacterPrueba on service and increment currentPage', () => {
    personajesAPIServiceSpy.getCharacterPrueba.and.returnValue(of(characterList ));
    const page = component.getCurrentPage();

    component.llamarApi();

    expect(personajesAPIServiceSpy.getCharacterPrueba).toHaveBeenCalled();
    expect(component.getCurrentPage()).toBeGreaterThan(page);
  });
    
 


  fit('scroll llamar Boton', () => {
    spyOnProperty(window, 'scrollY', 'get').and.returnValue(800); 
    spyOnProperty(window, 'innerHeight', 'get').and.returnValue(200); 
    spyOnProperty(document.documentElement, 'scrollHeight', 'get').and.returnValue(1000); 

    spyOn(component, 'llamarApi');

    component.onScroll();

    expect(component.llamarApi).toHaveBeenCalled();
  });
});

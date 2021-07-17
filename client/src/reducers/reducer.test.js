import reducer from './index';
import { getAllDog, getDogsByQuery, getTemperaments, GET_DOGS_BY_QUERY } from '../actions';

describe('reducer', () => {

  it('Deberia retornar el estado inicial', () => {
    const initialState = {
        Dogs : [],
        Temperaments : [],
        FavDogs : [],
        dogDetail : undefined,
        queryDog: []
        
    }
    expect(reducer(undefined, [])).toEqual(initialState)
  })

  it('debe devolver un estado con todos los perros', () => {
    // fijarse bien las propiedades que tiene que recibir.
    expect(reducer([], getAllDog())).not.toBeUndefined()
  })

  it('no deberia buscar query, si no le es provisto', () => {
    const initialState = {
        Dogs : [],
        Temperaments : [],
        FavDogs : [],
        dogDetail : undefined,
        queryDog: []
        
    }
    expect(reducer(initialState,getDogsByQuery())).toEqual(initialState);
    });
});

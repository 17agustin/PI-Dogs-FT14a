import reducer from './index';
import { getAllDog, getDogsByQuery} from '../actions';

describe('reducer', () => {

  it('Deberia retornar el estado inicial', () => {
    const initialState = {
      Dogs: [],
      Temperaments: [],
      dogDetail: undefined,
      deleted: "",
      updating: false
        
    }
    expect(reducer(undefined, [])).toEqual(initialState)
  })

  it('debe devolver un estado con todos los perros', () => {
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

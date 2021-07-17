import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import SingleDogs from './singleDogs';


configure({adapter: new Adapter()});

describe('<SingleDogs />',() => {

  describe('Estructura', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<SingleDogs />);
    })
    it('Renderiza un <Link>', () => {
      expect(wrapper.find('Link')).toHaveLength(1)
    })

    it('Renderiza una imagen', () => {
      // El orden en el que se encuentran los Labels es importante.
      expect(wrapper.find('img')).toHaveLength(1)
    })

    it('Renderiza un span', () => {
      expect(wrapper.find('span')).toHaveLength(1);
    })

    it('Renderiza una ul', () => {
      // El orden en el que se encuentran los Labels es importante.
      expect(wrapper.find('ul')).toHaveLength(1)
    })
  
})
});
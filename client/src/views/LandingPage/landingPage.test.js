import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import LandingPage from './landingPage';



configure({adapter: new Adapter()});

describe('<landingPage />',() => {

  describe('Estructura', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<LandingPage />);
    })
    it('Renderiza un <Link>', () => {
      expect(wrapper.find('Link')).toHaveLength(1)
    })

    it('Renderiza un div', () => {
      // El orden en el que se encuentran los Labels es importante.
      expect(wrapper.find('div')).toHaveLength(5)
    })
})
});
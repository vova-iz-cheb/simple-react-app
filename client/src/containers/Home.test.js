import React from 'react';
import { Home } from './Home';
import { shallow } from 'enzyme';

describe('Home container', () => {
  const props = {
    news: [],
    error: '',
    isFetching: false,
    dispatch: () => {},
    getNews: () => {},
  };

  describe('Home container initial', () => {
    const mockGetNews = jest.fn();

    const nextProps = {
      ...props,
      getNews: mockGetNews,
    };

    const homeContainer = shallow(<Home {...nextProps} />);

    it('Snapshot', () => {
      expect(homeContainer).toMatchSnapshot();
    });

    it('Render initial', () => {
      // console.log(homeContainer.debug());
      expect(homeContainer.find('h1').text()).toEqual('News:');
      expect(homeContainer.find('.error')).toHaveLength(0);
      expect(homeContainer.find('LoadBox')).toHaveLength(0);
      expect(homeContainer.find('NewsList').html()).toEqual('<p>К сожалению нет новостей.</p>');
    });

    it('dispatches the getNews() method it receives from props', () => {
      expect(mockGetNews).toHaveBeenCalledTimes(1);
    });
  });

  describe('Home container loading', () => {
    const nextProps = {
      ...props,
      isFetching: true,
    };

    const homeContainer = shallow(<Home {...nextProps} />);

    it('Snapshot', () => {
      expect(homeContainer).toMatchSnapshot();
    });

    it('Loading', () => {
      // console.log(homeContainer.debug());
      expect(homeContainer.find('h1').text()).toEqual('News:');
      expect(homeContainer.find('.error')).toHaveLength(0);
      expect(homeContainer.find('NewsList')).toHaveLength(0);
      expect(homeContainer.find('LoadBox')).toHaveLength(1);
      expect(homeContainer.find('LoadBox').html()).toEqual(
        '<div class="loading"><div class="snipper"></div></div>'
      );
    });
  });

  describe('Home container fetch data', () => {
    const nextProps = {
      ...props,
      news: [1],
    };

    const homeContainer = shallow(<Home {...nextProps} />);

    it('Snapshot', () => {
      expect(homeContainer).toMatchSnapshot();
    });

    it('Fecth data', () => {
      // console.log(homeContainer.debug());
      expect(homeContainer.find('h1').text()).toEqual('News:');
      expect(homeContainer.find('.error')).toHaveLength(0);
      expect(homeContainer.find('NewsList')).toHaveLength(1);
      expect(homeContainer.find('LoadBox')).toHaveLength(0);
    });
  });

  describe('Home container error', () => {
    const nextProps = {
      ...props,
      error: 'Ошибка',
    };

    const homeContainer = shallow(<Home {...nextProps} />);

    it('Snapshot', () => {
      expect(homeContainer).toMatchSnapshot();
    });

    it('Error', () => {
      // console.log(homeContainer.debug());
      expect(homeContainer.find('h1').text()).toEqual('News:');
      expect(homeContainer.find('.error')).toHaveLength(1);
      expect(homeContainer.find('NewsList')).toHaveLength(0);
      expect(homeContainer.find('LoadBox')).toHaveLength(0);
    });
  });

  describe('Home container loading after error', () => {
    const nextProps = {
      ...props,
      error: 'Ошибка',
      isFetching: true,
    };

    const homeContainer = shallow(<Home {...nextProps} />);

    it('Snapshot', () => {
      expect(homeContainer).toMatchSnapshot();
    });

    it('Loading after error', () => {
      // console.log(homeContainer.debug());
      expect(homeContainer.find('h1').text()).toEqual('News:');
      expect(homeContainer.find('.error')).toHaveLength(1);
      expect(homeContainer.find('NewsList')).toHaveLength(0);
      expect(homeContainer.find('LoadBox')).toHaveLength(1);
    });
  });
});

import React from 'react';
import { NewsList } from './NewsList';
import { shallow } from 'enzyme';

describe('News List with 2 articles', () => {
  const news = [
    {
      _id: 1,
      title: 'Title',
      content: 'Content',
    },
    {
      _id: 2,
      title: 'Title2',
      content: 'Content2',
    },
  ];

  const newsList = shallow(<NewsList news={news} />);

  it('Snapshot', () => {
    expect(newsList).toMatchSnapshot();
  });

  it('Render initial', () => {
    console.log(newsList.debug());
    expect(newsList.find('ul.news__list h2')).toHaveLength(2);
    expect(newsList.find('ul.news__list p')).toHaveLength(2);

    expect(
      newsList
        .find('.news__link')
        .at(0)
        .text()
    ).toEqual('Title');

    expect(
      newsList
        .find('.news__link')
        .at(1)
        .text()
    ).toEqual('Title2');

    expect(
      newsList
        .find('ul.news__list p')
        .at(0) // equal first()
        .text()
    ).toEqual('Content');

    expect(
      newsList
        .find('ul.news__list p')
        .at(1)
        .text()
    ).toEqual('Content2');
  });
});

describe('empty NewsList', () => {
  const news = [];

  const newsList = shallow(<NewsList news={news} />);

  it('Snapshot', () => {
    expect(newsList).toMatchSnapshot();
  });

  it('Render initial', () => {
    console.log(newsList.debug());
    expect(newsList.find('ul.news__list h2')).toHaveLength(0);
    expect(newsList.find('ul.news__list p')).toHaveLength(0);
    expect(newsList.find('p').text()).toEqual('К сожалению нет новостей.');
  });
});

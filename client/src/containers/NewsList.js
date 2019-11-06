import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export const NewsList = props => {
  const news = props.news;

  if (news.length) {
    return (
      <ul className="news__list">
        {news.map(item => (
          <li key={item._id}>
            <article>
              <h2>
                <NavLink className="news__link" to={'/news/' + item._id}>
                  {item.title}
                </NavLink>
              </h2>
              <div>
                <p>{item.content}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    );
  } else {
    return <p>К сожалению нет новостей.</p>;
  }
};

NewsList.propTypes = {
  news: PropTypes.array.isRequired,
};

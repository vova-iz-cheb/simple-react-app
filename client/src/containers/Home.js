// переписал с хуков, чтобы протестировать с jest enzyme
import React from 'react';
import { NewsList } from './NewsList';
import { LoadBox } from '../components/LoadBox';
import {
  fetchingAllNews,
  fetchingAllNewsFailed,
  fetchingAllNewsSuccess,
} from '../actions/newsActions';
import { connect } from 'react-redux'; // добавлено

export class Home extends React.Component {
  componentDidMount() {
    const dispatch = this.props.dispatch;

    document.title = 'Simple React App';

    this.props.getNews(dispatch);
  }

  render() {
    const { dispatch, news, error, isFetching } = this.props;
    return (
      <>
        <h1>News:</h1>
        {error && (
          <div className="error">
            Ошибка загрузки, попробовать еще раз{' '}
            <button onClick={() => this.props.getNews(dispatch)}>again</button>
          </div>
        )}
        {isFetching && <LoadBox />}
        {!isFetching && !error && <NewsList news={news} />}
      </>
    );
  }
}

const mapStateToProps = store => {
  return {
    news: store.allNews.news,
    error: store.allNews.error,
    isFetching: store.allNews.isFetching,
    getNews: dispatch => {
      dispatch(fetchingAllNews);

      return fetch('/api/news')
        .then(response => response.json())
        .then(result => dispatch(fetchingAllNewsSuccess(result)))
        .catch(err => dispatch(fetchingAllNewsFailed(true)));
    },
  };
};

export default connect(mapStateToProps)(Home);

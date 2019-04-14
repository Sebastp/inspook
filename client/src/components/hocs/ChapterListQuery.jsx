import React from 'react';
import { Query } from 'react-apollo';

import ChapterList from './ChapterList';

import { getTopBooks } from '../../graphql'



const ChapterListQuery = () => (
  <Query query={getTopBooks}>
    {({ data, fetchMore }) =>
      data && (
        <ChapterList
          chapters={data.getTopBooks || []}
          onLoadMore={(page) =>
            fetchMore({
              variables: {
                page: page
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return Object.assign({}, prev, {
                  getTopBooks: [...prev.getTopBooks, ...fetchMoreResult.getTopBooks]
                });
              }
            })
          }
        />
      )
    }
  </Query>
);

export default ChapterListQuery;

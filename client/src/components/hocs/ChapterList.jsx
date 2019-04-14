import React from 'react';

import BookHalf from './../BookHalf'

const handleScroll = (allItms, onLoadMore) => {
  var pageSize = 20,
      page2get = (allItms.length/pageSize)+1

  onLoadMore(page2get);
};

const ChapterList = ({ chapters, onLoadMore }) => (
  <div>
    {console.log(chapters)}
    <ul className="list-group chapters-list"
        onClick={e => handleScroll(chapters, onLoadMore)}>
      {chapters.map(( item, i ) => (
        <li className="pageMain__bookLi" key={i}>
          <BookHalf onShelvesProp={item.onShelves} bookId={item.bookId}/>
        </li>
      ))}
    </ul>
  </div>
);

export default ChapterList;

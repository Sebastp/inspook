import React, { Component } from 'react';


import CollectionMini_loading from './../CollectionMini_loading';
import CollectionMini from './../CollectionMini'



export default class CollectionList extends Component {
  componentDidMount() {
    window.addEventListener("scroll", this.handleOnScroll);

  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleOnScroll);
  }

  handleOnScroll = () => {
    var scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    var scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    var clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;


    if (scrolledToBottom) {
      this.props.onLoadMore();
    }
  };

  render() {
    if (!this.props.lItems && this.props.loading) return(
      <ul>
        {
          [0,1,2,3].map(( item, i ) => (
            <CollectionMini_loading/>
          ))
        }
      </ul>
    )

    const { lItems } = this.props

    return(
      <ul>
        {lItems.map(( item, i ) => (
          <li className="pageMain__collectionLi" key={i}>
            <CollectionMini collectionObjPassed={item}/>
          </li>
        ))}
      </ul>
    )
  }
}

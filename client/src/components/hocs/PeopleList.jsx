import React, { Component } from 'react';


import PersonMini_loading from './../PersonMini_loading';
import PersonMini from './../PersonMini'



export default class PeopleList extends Component {
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
      <ul className="cont-width_2">
        {
          [0,1,2,3].map(( item, i ) => (
            <PersonMini_loading/>
          ))
        }
      </ul>
    )

    const { lItems } = this.props

    return(
      <ul className="cont-width_2">
        {lItems.map(( item, i ) => (
          <li className="pageMain__personLi" key={i}>
            <PersonMini personObj={item}/>
          </li>
        ))}
      </ul>
    )
  }
}

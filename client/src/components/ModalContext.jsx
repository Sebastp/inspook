import React, { Component, createContext } from 'react';

import ModalShelves from './ModalShelves';



const ModalContext = createContext({
  modalVisible: null,
  props: {},
  showModal: () => {},
  hideModal: () => {}
});

export class ModalProvider extends Component {
  showModal = (modalName, props = {}) => {
    this.setState({
      modalVisible: modalName,
      props
    });
  };

  hideModal = () => {
    this.setState({
      modalVisible: null,
      props: {}
    });
  }

  state = {
    modalVisible: null,
    props: {},
    showModal: this.showModal,
    hideModal: this.hideModal
  };

  render() {
    const { modalVisible, props } = this.state
    console.log(props);
    return (
      <ModalContext.Provider value={this.state}>
        <ModalShelves
          isVisible={modalVisible == "mShelves"}
          {...props}/>
        {this.props.children}
      </ModalContext.Provider>
    );
  }
}

export const ModalConsumer = ModalContext.Consumer;

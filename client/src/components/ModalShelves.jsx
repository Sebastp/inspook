import React, { Component } from 'react'
import {Query} from 'react-apollo'
import { Link } from 'react-router-dom'

import PersonMini from './PersonMini'
import { getChosenReaders } from '../graphql'

import {onShelves} from '../helpers/textTransf'
import { ModalConsumer } from './ModalContext';


export default class ModalShelves extends Component {
  render() {
    const { isVisible, shelves, bookId } = this.props
    return (
      <div className={"modalCont"+ (isVisible ? ' shown':'')}>
        <ModalConsumer>
          {({ hideModal }) => (
            <img src={ require('../assets/img/icons/x.svg') } className="close-icon"
              onClick={ () => { hideModal( 'mShelves')} }/>
          )}
        </ModalConsumer>
        <div className="modal__inner cont-width_2">


          <div className="sectHeader">
            <h3 className="sect-header pageMain__header">{onShelves(shelves)}</h3>
          </div>



          <ul className='cont-width_2__scroll scrollbar_1'>
            <Query query={getChosenReaders} variables={{ bookId }}>
              {
                ({loading, error, data}) => {
                  if (error) {
                    console.log(error.toString());
                  }

                  if (error || loading) {
                    return null;
                  }

                  var readers = data.getChosenReaders
                  return (
                    readers.map((persObj,i)=>(
                      <ModalConsumer>
                        {({ hideModal }) => (
                          <li key={i} onClick={ () => { hideModal( 'mShelves')} }>
                            <PersonMini personObj={persObj}/>
                          </li>
                        )}
                      </ModalConsumer>
                    ))
                  )
                }
              }
            </Query>

          </ul>
        </div>

        <div className="modal__bck"/>
      </div>
    )
  }
}

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
        <div className="modal__inner cont-width_2">
          <ModalConsumer>
            {({ hideModal }) => (
              <span onClick={ () => { hideModal( 'mShelves')} }>close</span>
            )}
          </ModalConsumer>

          <h3 className="sect-header_s1 pageMain__header">{onShelves(shelves)}</h3>

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
                      <li key={i}>
                        <PersonMini personObj={persObj}/>
                      </li>
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

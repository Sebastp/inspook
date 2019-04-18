import React from 'react'

const PersonMini_loading = (props) => {
  return (
    <div className="person loading">
      <div className="person-cover">
        <div className="person-cover__inner gradient-loadAnim"/>
      </div>
      <div className="person-name gradient-loadAnim"/>
    </div>
  )
}

export default PersonMini_loading

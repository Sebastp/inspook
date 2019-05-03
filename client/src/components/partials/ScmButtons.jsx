import React, {Fragment} from 'react'
import { Link } from 'react-router-dom'

const ScmButtons = (props) => {
  const {shareUrl} = props
  return (
    <Fragment>
        <a className="button-filled button-scm" target="popup" href={"https://www.facebook.com/sharer/sharer.php?u="+shareUrl}>
          <img src={ require('../../assets/img/icons/fb.png') }/>
        </a>

        <a className="button-filled button-scm" target="popup" href={"https://twitter.com/share?url="+shareUrl}>
          <img src={ require('../../assets/img/icons/twt.png') }/>
        </a>

        <a className="button-filled button-scm" target="popup" href={"https://www.linkedin.com/shareArticle?mini=true&url="+shareUrl}>
          <img src={ require('../../assets/img/icons/in.png') }/>
        </a>

    </Fragment>
  )
}


export default ScmButtons

import React from 'react'
import ReactDOM from 'react-dom'

import './assets/vendor/bootstrap/css/bootstrap.min.css'
import './assets/css/main.css'
import './assets/js/main.js'

import Main from './components/Main'



import { ApolloProvider } from 'react-apollo'
import apollo from './core/apollo'




const AUTH_URL = '/auth/steam'

ReactDOM.render(
  <ApolloProvider client={apollo}>
    <Main
      // user={data.user}
      AuthURL={AUTH_URL}
      // SteamInventory={data.SteamInventory}
      // RecentOpened={data.RecentOpened}
      // cases={data.cases}
    />
  </ApolloProvider>,
  window.document.getElementById('index')
)

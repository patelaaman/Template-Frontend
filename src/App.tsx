import { useEffect, useState } from 'react'
import AppProvidersWrapper from './components/wrappers/AppProvidersWrapper'
import configureFakeBackend from './helpers/fake-backend'
import AppRouter from './routes/router'
import { OnlineUsersProvider } from './context/OnlineUser.'
import { UnreadMessagesProvider } from './context/UnreadMessagesContext'
import '@/assets/scss/style.scss'
import { LastMessageProvider } from './context/LastMesageContext'
import ScrollToTop from './components/ScrollTop'

configureFakeBackend()

function App() {
  return (
    <AppProvidersWrapper>
      <OnlineUsersProvider>
        <UnreadMessagesProvider>
          <LastMessageProvider>
            <ScrollToTop />
            <AppRouter />
          </LastMessageProvider>
        </UnreadMessagesProvider>
      </OnlineUsersProvider>
    </AppProvidersWrapper>
  )
}

export default App

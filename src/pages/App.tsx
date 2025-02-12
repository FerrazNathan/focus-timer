import { ThemeProvider } from 'styled-components'
import { themeDefault } from '../styles/themes/themeDefault'
import { GlobalStyle } from '../styles/global'
import { Router } from '../Router'
import { BrowserRouter } from 'react-router-dom'
import { NewCyclesContextProvider } from '../context/NewCyclesContext'

export function App() {
  return (
    <ThemeProvider theme={themeDefault}>
      <BrowserRouter>
        <NewCyclesContextProvider>
          <Router />
        </NewCyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}

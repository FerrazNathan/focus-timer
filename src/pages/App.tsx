import { ThemeProvider } from 'styled-components'
import { themeDefault } from '../styles/themes/themeDefault'
import { GlobalStyle } from '../styles/global'
import { Router } from '../Router'
import { BrowserRouter } from 'react-router-dom'

export function App() {
  return (
    <ThemeProvider theme={themeDefault}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}

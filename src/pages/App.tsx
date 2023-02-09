import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { themeDefault } from '../styles/themes/themeDefault'
import { GlobalStyle } from '../styles/global'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider theme={themeDefault}>
      teste
      <GlobalStyle />
    </ThemeProvider>
  )
}

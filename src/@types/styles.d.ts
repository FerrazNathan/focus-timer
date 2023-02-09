// Arquivo de tipagem para integrar o styled-components com o typescript.
import styled from 'styled-components'
import { themeDefault } from '../styles/themes/themeDefault'

// Maneira de guardar o valor do themeDefault em uma variável.
type ThemeType = typeof themeDefault

// Maneira de criar uma tipagem para o módulo styled-components.
// Nesse caso eu não quero criar do zero apenas sobrescrever alguma coisa.
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}

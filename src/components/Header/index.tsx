import { Scroll, Timer } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo-ignite.svg'

import * as S from './styles'

export function Header() {
  return (
    <S.ContainerHeader>
      <img src={logo} />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </S.ContainerHeader>
  )
}

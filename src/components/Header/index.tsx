import React from 'react'
import * as S from './styles'

export function Header() {
  return (
    <S.ContainerHeader>
      <span>Logo</span>
      <nav>
        <a href="">Timer</a>
        <a href="">History</a>
      </nav>
    </S.ContainerHeader>
  )
}

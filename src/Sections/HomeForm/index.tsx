import { Play } from 'phosphor-react'

import * as S from './styles'

export const HomeForm = () => {
  return (
    <S.ContainerMain>
      <S.FormContainer action="">
        <S.ContentForm>
          <label htmlFor="task">Vou Trabalhar em:</label>
          <input type="text" id="task" />

          <label htmlFor="minutesOfDuration">Durante:</label>
          <input type="number" id="minutesOfDuration" />

          <span>minutos</span>
        </S.ContentForm>

        <S.CountDownContainer>
          <span>0</span>
          <span>0</span>
          <S.Divisor>:</S.Divisor>
          <span>0</span>
          <span>0</span>
        </S.CountDownContainer>

        <button type="submit">
          <Play size={24} />
          Iniciar
        </button>
      </S.FormContainer>
    </S.ContainerMain>
  )
}

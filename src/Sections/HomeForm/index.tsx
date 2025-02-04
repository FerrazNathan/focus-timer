import { Play } from 'phosphor-react'

import * as S from './styles'

export const HomeForm = () => {
  return (
    <S.ContainerMain>
      <S.FormContainer action="">
        <S.ContentForm>
          <label htmlFor="task">Vou Trabalhar em:</label>
          <S.InputTask
            type="text"
            id="task"
            list="options-tasks"
            placeholder="Dê um nome para o seu projeto"
          />

          <datalist id="options-tasks">
            <option value="React">React</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Typescript">Typescript</option>
            <option value="Node">Node</option>
            <option value="Testes Unitários">Testes Unitários</option>
            <option value="Redux">Redux</option>
            <option value="Context Api">Context Api</option>
            <option value="Inglês">Inglês</option>
          </datalist>

          <label htmlFor="minutesOfDuration">Durante:</label>
          <S.InputMinutesOfDuration
            type="number"
            id="minutesOfDuration"
            step={5}
            min={5}
            max={60}
          />

          <span>minutos</span>
        </S.ContentForm>

        <S.CountDownContainer>
          <span>0</span>
          <span>0</span>
          <S.Divisor>:</S.Divisor>
          <span>0</span>
          <span>0</span>
        </S.CountDownContainer>

        <S.ButtonStartCountdown type="submit">
          <Play size={24} />
          Iniciar
        </S.ButtonStartCountdown>
      </S.FormContainer>
    </S.ContainerMain>
  )
}

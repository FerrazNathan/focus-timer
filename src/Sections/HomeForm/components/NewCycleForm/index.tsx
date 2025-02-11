import { useContext } from 'react'

import { NewCyclesContext } from '../../../../context/NewCyclesContext'

import { useFormContext } from 'react-hook-form'
import * as S from './styles'

export function NewCycleForm() {
  const { activeCycle } = useContext(NewCyclesContext)
  const {
    register, // Função register = Conecta um input ao react-hook-form, gerenciando valor, validação e eventos automaticamente.
  } = useFormContext() // Obtém a referência do formulário do react-hook-form.

  return (
    <S.ContentForm>
      <label htmlFor="task">Vou Trabalhar em:</label>
      <S.InputTask
        type="text"
        id="task"
        list="options-tasks"
        disabled={!!activeCycle} // O sinal !! converte o valor para um booleano
        placeholder="Dê um nome para o seu projeto"
        {...register('task')}
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
        disabled={!!activeCycle} // O sinal !! converte o valor para um booleano
        {...register('minutesOfDuration', {
          valueAsNumber: true /* Converte o valor para number */,
        })}
      />

      <span>minutos</span>
    </S.ContentForm>
  )
}

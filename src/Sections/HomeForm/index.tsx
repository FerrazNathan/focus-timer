import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import * as S from './styles'

export const HomeForm = () => {
  const newCicleFormValidationSchema = zod.object({
    task: zod.string().nonempty('Campo obrigatório').min(1, 'Informe a Tarefa'),
    minutesOfDuration: zod
      .number()
      .int()
      .min(5, 'O tempo Mínimo é de 05 minutos')
      .max(60, 'O tempo Máximo é de 60 minutos'),
  })

  const {
    register, // Função register = Conecta um input ao react-hook-form, gerenciando valor, validação e eventos automaticamente.
    handleSubmit, // Função handleSubmit = Processa a submissão do formulário, executando uma função callback com os dados válidos.
    watch, // Função watch = Observa o valor de um input específico e retorna o valor atual do input.
    formState, // Função formState = Retorna o estado atual do formulário, como se está enviando, se está válido, se foi submetido, etc.
  } = useForm({ resolver: zodResolver(newCicleFormValidationSchema) })

  const handleCreateNewCicle = (data: any) => {
    console.log(data)
  }

  const task = watch('task') // monitora o input de task
  const isDisabledSubmit = !task // desabilita o envio do formulário caso o input de task não esteja preenchido

  return (
    <S.ContainerMain>
      <S.FormContainer action="" onSubmit={handleSubmit(handleCreateNewCicle)}>
        <S.ContentForm>
          <label htmlFor="task">Vou Trabalhar em:</label>
          <S.InputTask
            type="text"
            id="task"
            list="options-tasks"
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
            {...register('minutesOfDuration', {
              valueAsNumber: true /* Converte o valor para number */,
            })}
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

        <S.ButtonStartCountdown type="submit" disabled={isDisabledSubmit}>
          <Play size={24} />
          Iniciar
        </S.ButtonStartCountdown>
      </S.FormContainer>
    </S.ContainerMain>
  )
}

import { useEffect, useState } from 'react'

import * as zod from 'zod'
import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { differenceInSeconds } from 'date-fns'

import { FormatCycle } from './HomeForm.types'

import * as S from './styles'

export const HomeForm = () => {
  // STATES
  const [cycles, setCycles] = useState<FormatCycle[]>([])
  const [activeCicleId, setActiveCicleId] = useState<string | null>(null)
  const [minutesOfDurationPassed, setMinutesOfDurationPassed] = useState(0)

  // Definição do esquema de validação do formulário
  const newCicleFormValidationSchema = zod.object({
    task: zod.string().nonempty('Campo obrigatório').min(1, 'Informe a Tarefa'),
    minutesOfDuration: zod
      .number()
      .int()
      .min(5, 'O tempo Mínimo é de 05 minutos')
      .max(60, 'O tempo Máximo é de 60 minutos'),
  })

  type NewCicleFormData = zod.infer<typeof newCicleFormValidationSchema> // TIPAGEM INFERIDA A PARTIR DO SCHEMA DE VALIDAÇÃO DO ZOD

  const {
    register, // Função register = Conecta um input ao react-hook-form, gerenciando valor, validação e eventos automaticamente.
    handleSubmit, // Função handleSubmit = Processa a submissão do formulário, executando uma função callback com os dados válidos.
    watch, // Função watch = Observa o valor de um input específico e retorna o valor atual do input.
    formState, // Função formState = Retorna o estado atual do formulário, como se está enviando, se está válido, se foi submetido, etc.
    reset, // Função reset = Reseta o formulário, limpando os valores dos inputs.
  } = useForm<NewCicleFormData>({
    resolver: zodResolver(newCicleFormValidationSchema), // Resolver = Validação do formulário
    defaultValues: {
      minutesOfDuration: 0,
      task: '',
    }, // Valores padrão dos inputs
  })

  const handleCreateNewCicle = (data: NewCicleFormData) => {
    const newCicle: FormatCycle = {
      task: data.task,
      minutesOfDuration: data.minutesOfDuration,
      id: String(new Date().getTime()), // ID = Timestamp da data atual
      startData: new Date(), // Data de início do ciclo
    }

    setCycles((state) => [...state, newCicle]) // Copia o estado atual de ciclos, e adiciona mais um ciclo ao estado
    setActiveCicleId(newCicle.id) // Seleciona o novo ciclo como ativo
    reset() // Reseta o formulário
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCicleId) // Encontra o ciclo ativo
  const totalSeconds = activeCycle ? activeCycle?.minutesOfDuration * 60 : 0 // Converte o tempo de duração do ciclo ativo para segundos

  const currentSeconds = activeCycle
    ? totalSeconds - minutesOfDurationPassed
    : 0 // Calcula os segundos restantes do ciclo ativo

  const minutesOfDuration = Math.floor(currentSeconds / 60) // Calcula os minutos restantes do ciclo ativo, com o Math.floor arredonda o tempo pra baixo.
  const secondsOfDuration = currentSeconds % 60 // Calcula os segundos restantes do ciclo ativo

  const minutes = String(minutesOfDuration).padStart(2, '0') // Adiciona um zero a esquerda caso o número de minutos seja menor que 10
  const seconds = String(secondsOfDuration).padStart(2, '0') // Adiciona um zero a esquerda caso o número de segundos seja menor que 10

  const task = watch('task') // monitora o input de task
  const isDisabledSubmit = !task // desabilita o envio do formulário caso o input de task não esteja preenchido

  useEffect(() => {
    if (activeCycle) {
      const interval = setInterval(() => {
        setMinutesOfDurationPassed(
          differenceInSeconds(new Date(), activeCycle.startData),
        )
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [activeCycle])

  console.log(cycles, 'cycles')
  console.log(activeCycle, 'activeCycle')

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
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <S.Divisor>:</S.Divisor>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </S.CountDownContainer>

        <S.ButtonStartCountdown type="submit" disabled={isDisabledSubmit}>
          <Play size={24} />
          Iniciar
        </S.ButtonStartCountdown>
      </S.FormContainer>
    </S.ContainerMain>
  )
}

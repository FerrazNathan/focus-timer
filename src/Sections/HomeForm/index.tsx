import { useState } from 'react'

import * as zod from 'zod'
import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormatCycle } from './HomeForm.types'

import { CountDown } from './components/CountDown'
import { NewCycleForm } from './components/NewCycleForm'

import { NewCyclesContext } from '../../context/NewCyclesContext'

import * as S from './styles'

export const HomeForm = () => {
  // STATES
  const [cycles, setCycles] = useState<FormatCycle[]>([])
  const [activeCycleId, setactiveCycleId] = useState<string | null>(null)
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

  const newCycleForm = useForm<NewCicleFormData>({
    // Criação de um newCycleForm sem a desestruturação para enviar funções para outros componentes.
    resolver: zodResolver(newCicleFormValidationSchema), // Resolver = Validação do formulário
    defaultValues: {
      minutesOfDuration: 0,
      task: '',
    }, // Valores padrão dos inputs
  })

  const {
    handleSubmit, // Função handleSubmit = Processa a submissão do formulário, executando uma função callback com os dados válidos.
    watch, // Função watch = Observa o valor de um input específico e retorna o valor atual do input.
    formState, // Função formState = Retorna o estado atual do formulário, como se está enviando, se está válido, se foi submetido, etc.
    reset, // Função reset = Reseta o formulário, limpando os valores dos inputs.
  } = newCycleForm // Desestruturação do newCycleForm para usar apenas as funções que serão usadas aqui.

  const handleCreateNewCicle = (data: NewCicleFormData) => {
    const newCicle: FormatCycle = {
      task: data.task,
      minutesOfDuration: data.minutesOfDuration,
      id: String(new Date().getTime()), // ID = Timestamp da data atual
      startDate: new Date(), // Data de início do ciclo
    }

    setCycles((state) => [...state, newCicle]) // Copia o estado atual de ciclos, e adiciona mais um ciclo ao estado
    setactiveCycleId(newCicle.id) // Seleciona o novo ciclo como ativo
    reset() // Reseta o formulário
    setMinutesOfDurationPassed(0) // Reseta o tempo passado
  }

  const handleInterruptedCycle = () => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interruptedDate: new Date(),
          }
        } else {
          return cycle
        }
      }),
    )
    setactiveCycleId(null) // Remove o ciclo ativo
  }

  const markCurrenctCycleAsFinished = () => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            endDate: new Date(),
          }
        } else {
          return cycle
        }
      }),
    )
  }

  const setSecondsPassed = (seconds: number) => {
    setMinutesOfDurationPassed(seconds)
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId) // Encontra o ciclo ativo

  const task = watch('task') // monitora o input de task
  const isDisabledSubmit = !task // desabilita o envio do formulário caso o input de task não esteja preenchido

  console.log(cycles, 'cycles')
  // console.log(activeCycle, 'activeCycle')

  return (
    <S.ContainerMain>
      <NewCyclesContext.Provider
        value={{
          activeCycle,
          activeCycleId,
          markCurrenctCycleAsFinished,
          minutesOfDurationPassed,
          setSecondsPassed,
        }}
      >
        <S.FormContainer
          action=""
          onSubmit={handleSubmit(handleCreateNewCicle)}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <CountDown />

          {activeCycle ? (
            <S.ButtonStopCountdown
              type="button"
              onClick={handleInterruptedCycle}
            >
              <HandPalm size={24} />
              Interromper
            </S.ButtonStopCountdown>
          ) : (
            <S.ButtonStartCountdown type="submit" disabled={isDisabledSubmit}>
              <Play size={24} />
              Iniciar
            </S.ButtonStartCountdown>
          )}
        </S.FormContainer>
      </NewCyclesContext.Provider>
    </S.ContainerMain>
  )
}

import { useContext } from 'react'
import * as zod from 'zod'
import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { CountDown } from './components/CountDown'
import { NewCycleForm } from './components/NewCycleForm'

import { NewCyclesContext } from '../../context/NewCyclesContext'

import * as S from './styles'

export const HomeForm = () => {
  const { createNewCicle, interruptCurrentCycle, activeCycle } =
    useContext(NewCyclesContext)
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

  const task = watch('task') // monitora o input de task
  const isDisabledSubmit = !task // desabilita o envio do formulário caso o input de task não esteja preenchido

  return (
    <S.ContainerMain>
      <S.FormContainer action="" onSubmit={handleSubmit(createNewCicle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />

        {activeCycle ? (
          <S.ButtonStopCountdown type="button" onClick={interruptCurrentCycle}>
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
    </S.ContainerMain>
  )
}

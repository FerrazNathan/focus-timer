import { createContext, useState, ReactNode } from 'react'

import { FormatCycle } from '../Sections/HomeForm/HomeForm.types'

interface CreateCicleFormData {
  task: string
  minutesOfDuration: number
}

interface NewCyclesContextProps {
  activeCycle: FormatCycle | undefined
  activeCycleId: string | null
  minutesOfDurationPassed: number
  cycles: FormatCycle[] | undefined

  markCurrenctCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCicle: (data: CreateCicleFormData) => void
  interruptCurrentCycle: () => void
}

interface NewCyclesContextProviderProps {
  children: ReactNode
}

export const NewCyclesContext = createContext({} as NewCyclesContextProps)

export const NewCyclesContextProvider = ({
  children,
}: NewCyclesContextProviderProps) => {
  const [cycles, setCycles] = useState<FormatCycle[]>([])
  const [activeCycleId, setactiveCycleId] = useState<string | null>(null)
  const [minutesOfDurationPassed, setMinutesOfDurationPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId) // Encontra o ciclo ativo

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

  const createNewCicle = (data: CreateCicleFormData) => {
    const newCicle: FormatCycle = {
      task: data.task,
      minutesOfDuration: data.minutesOfDuration,
      id: String(new Date().getTime()), // ID = Timestamp da data atual
      startDate: new Date(), // Data de início do ciclo
    }

    setCycles((state) => [...state, newCicle]) // Copia o estado atual de ciclos, e adiciona mais um ciclo ao estado
    setactiveCycleId(newCicle.id) // Seleciona o novo ciclo como ativo
    // reset() // Reseta o formulário
    setMinutesOfDurationPassed(0) // Reseta o tempo passado
  }

  const interruptCurrentCycle = () => {
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

  return (
    <NewCyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrenctCycleAsFinished,
        minutesOfDurationPassed,
        setSecondsPassed,
        createNewCicle,
        interruptCurrentCycle,
        cycles,
      }}
    >
      {children}
    </NewCyclesContext.Provider>
  )
}

import {
  createContext,
  useState,
  ReactNode,
  useReducer,
  useEffect,
} from 'react'

import { FormatCycle } from '../Sections/HomeForm/HomeForm.types'
import { cyclesReducer, CyclesState } from '../reducers/cycles/cycles'
import {
  createNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

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
  createnewCycle: (data: CreateCicleFormData) => void
  interruptCurrentCycle: () => void
}

interface NewCyclesContextProviderProps {
  children: ReactNode
}

export const NewCyclesContext = createContext({} as NewCyclesContextProps)

export const NewCyclesContextProvider = ({
  children,
}: NewCyclesContextProviderProps) => {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storageStateJSON = localStorage.getItem('newCyclesState')

      if (storageStateJSON) {
        const savedState: CyclesState = JSON.parse(storageStateJSON)

        return savedState
      }

      return initialState
    },
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId) // Encontra o ciclo ativo

  const [minutesOfDurationPassed, setMinutesOfDurationPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  const markCurrenctCycleAsFinished = () => {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  const setSecondsPassed = (seconds: number) => {
    setMinutesOfDurationPassed(seconds)
  }

  const createnewCycle = (data: CreateCicleFormData) => {
    const newCycle: FormatCycle = {
      task: data.task,
      minutesOfDuration: data.minutesOfDuration,
      id: String(new Date().getTime()), // ID = Timestamp da data atual
      startDate: new Date(), // Data de início do ciclo
    }

    dispatch(createNewCycleAction(newCycle))

    setMinutesOfDurationPassed(0) // Reseta o tempo passado
  }

  const interruptCurrentCycle = () => {
    dispatch(interruptCurrentCycleAction())
  }

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('newCyclesState', stateJSON) // Salva o estado do contexto em localStorage
  }, [cyclesState])

  return (
    <NewCyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrenctCycleAsFinished,
        minutesOfDurationPassed,
        setSecondsPassed,
        createnewCycle,
        interruptCurrentCycle,
        cycles,
      }}
    >
      {children}
    </NewCyclesContext.Provider>
  )
}

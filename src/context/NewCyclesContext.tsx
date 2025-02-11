import { createContext } from 'react'

import { FormatCycle } from '../Sections/HomeForm/HomeForm.types'

interface NewCyclesContextProps {
  activeCycle: FormatCycle | undefined
  activeCycleId: string | null
  minutesOfDurationPassed: number

  markCurrenctCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}

export const NewCyclesContext = createContext({} as NewCyclesContextProps)

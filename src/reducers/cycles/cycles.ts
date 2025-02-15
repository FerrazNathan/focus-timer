import { FormatCycle } from '../../Sections/HomeForm/HomeForm.types'
import { ActionTypes } from './actions'

import { produce } from 'immer'

export interface CyclesState {
  cycles: FormatCycle[]
  activeCycleId: string | null
}

export const cyclesReducer = (state: CyclesState, action: any) => {
  switch (action.type) {
    case ActionTypes.CREATE_NEW_CYCLE: {
      console.log('ACTION =>', action, 'CREATE')

      return produce(state, (draft) => {
        draft.cycles.push(action.payload)
        draft.activeCycleId = action.payload.id
      })
    }
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      console.log('ACTION =>', action, 'INTERRUPT')

      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
      })
    }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      console.log('ACTION =>', action, 'FINISHED')

      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].endDate = new Date()
      })
    }
    default:
      return state
  }

  return state
}

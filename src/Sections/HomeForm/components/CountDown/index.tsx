import { useContext, useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

import { NewCyclesContext } from '../../../../context/NewCyclesContext'

import * as S from './styles'

export function CountDown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrenctCycleAsFinished,
    minutesOfDurationPassed,
    setSecondsPassed,
  } = useContext(NewCyclesContext)

  const totalSeconds = activeCycle ? activeCycle?.minutesOfDuration * 60 : 0 // Converte o tempo de duração do ciclo ativo para segundos

  const currentSeconds = activeCycle
    ? totalSeconds - minutesOfDurationPassed
    : 0 // Calcula os segundos restantes do ciclo ativo

  const minutesOfDuration = Math.floor(currentSeconds / 60) // Calcula os minutos restantes do ciclo ativo, com o Math.floor arredonda o tempo pra baixo.
  const secondsOfDuration = currentSeconds % 60 // Calcula os segundos restantes do ciclo ativo

  const minutes = String(minutesOfDuration).padStart(2, '0') // Adiciona um zero a esquerda caso o número de minutos seja menor que 10
  const seconds = String(secondsOfDuration).padStart(2, '0') // Adiciona um zero a esquerda caso o número de segundos seja menor que 10

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          markCurrenctCycleAsFinished()

          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrenctCycleAsFinished,
    setSecondsPassed,
  ])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle]) // Muda o título da página para o tempo restante quando existir um ciclo ativo

  return (
    <S.CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <S.Divisor>:</S.Divisor>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </S.CountDownContainer>
  )
}

import { useContext } from 'react'
import { NewCyclesContext } from '../../context/NewCyclesContext'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import * as S from './styles'

export const SectionHistory = () => {
  const { cycles } = useContext(NewCyclesContext)

  console.log(cycles, 'cycles in section history')

  return (
    <S.ContainerHistory>
      <h2>Meu Histórico</h2>

      <S.ListHistory>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles?.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesOfDuration} minutos</td>
                  <td>
                    {formatDistanceToNow(cycle.startDate, {
                      // Formata a data como a distancia de agora
                      addSuffix: true, // Adiciona um prefixo do tipo há (tempo de distância)
                      locale: ptBR, // Traduz para o português do Brasil
                    })}
                  </td>
                  <td>
                    {cycle.interruptedDate && (
                      <S.StatusDot statusColor="canceled">
                        Interrompido
                      </S.StatusDot>
                    )}
                    {cycle.endDate && (
                      <S.StatusDot statusColor="completed">
                        Concluído
                      </S.StatusDot>
                    )}
                    {!cycle.endDate && !cycle.interruptedDate && (
                      <S.StatusDot statusColor="inProgress">
                        Em Andamento
                      </S.StatusDot>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </S.ListHistory>
    </S.ContainerHistory>
  )
}

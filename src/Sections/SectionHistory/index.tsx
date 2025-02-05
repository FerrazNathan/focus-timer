import * as S from './styles'

export const SectionHistory = () => {
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
            <tr>
              <td>React</td>
              <td>20 minutos</td>
              <td>há 2 anos</td>
              <td>
                <S.StatusDot statusColor="completed">Concluído</S.StatusDot>
              </td>
            </tr>
            <tr>
              <td>JavaScript</td>
              <td>45 minutos</td>
              <td>há 2 meses</td>
              <td>
                <S.StatusDot statusColor="inProgress">Em Andamento</S.StatusDot>
              </td>
            </tr>
            <tr>
              <td>React</td>
              <td>20 minutos</td>
              <td>há 2 anos</td>
              <td>
                <S.StatusDot statusColor="completed">Concluído</S.StatusDot>
              </td>
            </tr>
            <tr>
              <td>JavaScript</td>
              <td>45 minutos</td>
              <td>há 2 meses</td>
              <td>
                <S.StatusDot statusColor="inProgress">Em Andamento</S.StatusDot>
              </td>
            </tr>
            <tr>
              <td>JavaScript</td>
              <td>45 minutos</td>
              <td>há 2 meses</td>
              <td>
                <S.StatusDot statusColor="canceled">Cancelado</S.StatusDot>
              </td>
            </tr>
          </tbody>
        </table>
      </S.ListHistory>
    </S.ContainerHistory>
  )
}

import styled from 'styled-components'

export const ContentForm = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme.colors.gray100};
  font-size: 1.125rem;
  font-weight: 700;
  flex-wrap: wrap;
`

export const InputBase = styled.input`
  background: transparent;
  border: none;
  padding: 0 0.5rem;
  border-bottom: 2px solid ${(props) => props.theme.colors.gray500};
  color: ${(props) => props.theme.colors.gray100};
  font-size: 1.125rem;
  font-weight: 700;
  height: 2.5rem;

  &::placeholder {
    color: ${(props) => props.theme.colors.gray500};
  }

  &:focus {
    border-color: ${(props) => props.theme.colors.green500};
    box-shadow: none;
  }
`

export const InputTask = styled(InputBase)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`
export const InputMinutesOfDuration = styled(InputBase)`
  width: 4rem;
`

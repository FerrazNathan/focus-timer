import styled from 'styled-components'

export const ContainerMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.5rem;
`

export const ButtonBaseCountdown = styled.button`
  width: 100%;
  border: none;
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  color: ${(props) => props.theme.colors.gray100};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const ButtonStartCountdown = styled(ButtonBaseCountdown)`
  background: ${(props) => props.theme.colors.green500};

  &:not(:disabled):hover {
    background: ${(props) => props.theme.colors.green700};
  }
`

export const ButtonStopCountdown = styled(ButtonBaseCountdown)`
  background: ${(props) => props.theme.colors.red500};

  &:not(:disabled):hover {
    background: ${(props) => props.theme.colors.red700};
  }
`

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

export const CountDownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme.colors.gray100};
  display: flex;
  gap: 1rem;

  span {
    background: ${(props) => props.theme.colors.gray700};
    padding: 2rem 1rem;
    border-radius: 0.5rem;
  }
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

export const Divisor = styled.div`
  padding: 2rem 0;
  color: ${(props) => props.theme.colors.green500};);
  width: 4rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ButtonStartCountdown = styled.button`
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
  background: ${(props) => props.theme.colors.green500};
  color: ${(props) => props.theme.colors.gray100};

  &:not(:disabled):hover {
    background: ${(props) => props.theme.colors.green700};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

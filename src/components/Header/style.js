import styled from 'styled-components'

export const Headerline = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 90px;
`
export const Para = styled.p`
  color: ${props => (props.cliked ? '#0284C7' : '#64748B')};
  text-decoration: none;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`
export const Loginbtn = styled.button`
  width: 73px;
  height: 32px;
  background: #0284c7;
  border-radius: 4px;
  border: 0;
  color: white;
`

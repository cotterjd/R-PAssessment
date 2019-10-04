import styled from 'styled-components'

const darkGrayColor = '#525a6d'
const dataGrid = `
  display: grid;
  grid-template: 1fr / 80px 120px 120px 120px 500px 40px 80px;
`
export const CheckboxLabel = styled.label`
    text-transform: uppercase;
    color: #fff;
  `
export const ColumnHeader = styled.span`
    color: #11466f;
  `
export const ColumnHeaders = styled.div`
    background: linear-gradient(#a3bbd0, #fff);
    padding: 20px;
    ${dataGrid}
  `
export const ItemContainer = styled.div`
    ${dataGrid}
    background-color: #dbdfe5;
    border-radius: 5px;
    height: 50px;
    align-items: center;
    border-sizing: box-size;
    padding: 0 20px;
  `
export const Filters = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.1);

    .filters {
      display: flex;
    }
  `
export const LinkImg = styled.a`
    justify-self: center;
  `

const checkMarkImg = require('../../../assets/images/checkmark.svg')
export const Checkbox = styled.span`
    height: 20px;
    width: 20px;
    border: 2px solid #fff;
    position: absolute;
    border-radius: 3px;
    transform: translate(-35px, -5px);

    ${props => props.checked ?
      `
        background-image: url(${checkMarkImg});
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
      ` : ''}
  `

export const RefreshIcon = styled.img`
    border: 1px solid #fff;
    border-radius: 50%;
    padding: 5px;


    ${props => props.loading
      ? `
        animation: App-logo-spin infinite 2s linear;
        @keyframes App-logo-spin {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
      ` : ''}
  `
export const TableBody = styled.div`
    display: grid;
    grid-gap: 5px;
    margin-top: 5px;
  `
export const TableHeader = styled.div`
    display: grid;
    grid-template: 2fr 1fr / 1fr;
    border: 1px solid ${darkGrayColor};
    border-radius: 7px 7px;
  `
export const Title = styled.h1`
    text-align: center;
    color: #fff;
    font-size: 3em;
  `

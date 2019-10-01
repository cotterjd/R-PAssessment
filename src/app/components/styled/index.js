import styled from 'styled-components'

export const CheckboxLabel = styled.label`
    text-transform: uppercase;
    color: #fff;
  `
export const ColumnHeader = styled.span`
    color: #11466f;
  `
export const ColumnHeaders = styled.div`
    background: linear-gradient(#a3bbd0, #fff);
    display: grid;
    grid-template: 1fr / 1fr 1fr 1fr 1fr 3fr 1fr 1fr;
    padding: 20px;
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
export const RefreshIcon = styled.img`
    border: 1px solid #fff;
    border-radius: 50%;
    padding: 5px;
  `
export const TableBody = styled.div`
    display: grid;
  `
export const TableHeader = styled.div`
    display: grid;
    grid-template: 2fr 1fr / 1fr;
    border: 1px solid #525a6d;
    border-radius: 7px 7px;
  `
export const Title = styled.h1`
    text-align: center;
    color: #fff;
  `

import React from 'react'
import {CheckboxLabel, Checkbox} from './styled'
const log = console.log // eslint-disable-line no-unused-vars

export function Filter({name, filters, setFilters}) {
	const propName = getPropName(name)
	return (
		<div style={{padding: '20px'}}>
      <Checkbox checked={filters[propName]} onClick={setFilter}></Checkbox>
      <CheckboxLabel>{name}</CheckboxLabel>
		</div>
	)

	function setFilter(evt) {
		setFilters({
			...filters,
			[propName]: !filters[propName]
		})
	}
}

function getPropName(str) {
	return str.split(' ').join('_').toLowerCase()
}

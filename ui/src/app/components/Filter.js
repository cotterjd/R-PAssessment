import React from 'react'
import {CheckboxLabel} from './styled'
const log = console.log
export function Filter({name, filters, setFilters}) {
	const propName = getPropName(name)
	return (
		<div style={{padding: '20px'}}>
      <input type="checkbox" checked={filters[propName]} onChange={setFilter}/><CheckboxLabel>{name}</CheckboxLabel>
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

import React from 'react'
import {CheckboxLabel} from './styled'
export function Filter({name}) {
		return (
			<div style={{padding: '20px'}}>
        <input type="checkbox" /><CheckboxLabel>{name}</CheckboxLabel>
			</div>
		)
}

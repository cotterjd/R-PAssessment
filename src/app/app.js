import React, { useState } from 'react'
import {
	TableHeader
, Filters
, ColumnHeaders
, Title
} from './components/styled'
import {
	Filter
} from './components'
import '../scss/styles.css'

function App() {
		return (
			<div id="app" className="page-wrapper">
				<Title>SpaceX Launches</Title>
				<TableHeader>
					<Filters>
					</Filters>
					<ColumnHeaders></ColumnHeaders>
				</TableHeader>
			</div>
		)
}

export default App

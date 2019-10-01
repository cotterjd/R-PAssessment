import React, { useEffect, useState } from 'react'
import {
	TableHeader
, Filters
, ColumnHeaders
, Title
, TableBody
} from './components/styled'
import {
	Filter
, Item
} from './components'
import {getData} from '../utils/xhr'
import '../scss/styles.css'

function App() {
	const [data, setData] = useState([])
	useEffect(() => {
		getData()
		.then(setData)
		.catch(e => alert(e.message || e))
	}, [])
	return (
		<div id="app" className="page-wrapper">
			<Title>SpaceX Launches</Title>
			<TableHeader>
				<Filters>
				</Filters>
				<ColumnHeaders></ColumnHeaders>
			</TableHeader>
			<TableBody>
				{data.map(d => <Item key={Math.random()} data={d} />)}
			</TableBody>
		</div>
	)
}

export default App

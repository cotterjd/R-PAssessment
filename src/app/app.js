import React, { useEffect, useState } from 'react'
import {
	TableHeader
, Filters
, ColumnHeaders
, Title
, TableBody
, RefreshIcon
, ColumnHeader
} from './components/styled'
import {
	Filter
, Item
} from './components'
import refreshImg from '../assets/images/refresh.svg'
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
					<RefreshIcon className="clickable" src={refreshImg} alt="refresh icon" />
					<div className="filters">
					  <Filter name="Landing Success" />
					  <Filter name="Reused" />
					  <Filter name="With Reddit" />
					</div>
				</Filters>
				<ColumnHeaders>
					<ColumnHeader>Badge</ColumnHeader>
					<ColumnHeader>Rocket Name</ColumnHeader>
					<ColumnHeader>Rocket Type</ColumnHeader>
					<ColumnHeader>Launch Date</ColumnHeader>
					<ColumnHeader>Details</ColumnHeader>
					<ColumnHeader>ID</ColumnHeader>
					<ColumnHeader>Article</ColumnHeader>
				</ColumnHeaders>
			</TableHeader>
			<TableBody>
				{data.map(d => <Item key={Math.random()} data={d} />)}
			</TableBody>
		</div>
	)
}

export default App

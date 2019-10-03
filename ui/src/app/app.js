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

const log = console.log // eslint-disable-line no-unused-vars
, R = require('ramda')

function App() {
	const [data, setData] = useState([])
	const [filters, setFilters] = useState({
		land_success: false,
		reused: false,
		with_reddit: false,
	})
	const filterProps = {filters, setFilters}
	useEffect(refreshData, [])
	return (
		<div id="app" className="page-wrapper">
			<Title>SpaceX Launches</Title>
			<TableHeader>
				<Filters>
					<RefreshIcon onClick={refreshData} className="clickable" src={refreshImg} alt="refresh icon" />
					<div className="filters">
					  <Filter name="Land Success" {...filterProps} />
					  <Filter name="Reused"  {...filterProps}/>
					  <Filter name="With Reddit"  {...filterProps}/>
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
				{data.map(d => <Item key={d.id} data={d} />)}
			</TableBody>
		</div>
	)

	function refreshData(evt) {
		const obj = R.pickBy((v, k) => v, filters)
		getData(Object.keys(obj))
		.then(setData)
	}
}

export default App

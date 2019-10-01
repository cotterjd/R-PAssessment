import React from 'react'

export function Item({data}) {
		return (
			<div style={{display: 'grid', gridTemplate: '1fr 1fr 1fr 1fr 3fr 1fr 1fr'}}>
        <span>{data.badge}</span>
        <span>{data.rocketName}</span>
        <span>{data.rocketType}</span>
        <span>{data.launchDate}</span>
        <span>{data.details}</span>
        <span>{data.id}</span>
        <span>{data.article}</span>
			</div>
		)
}

import React from 'react'
import {ItemContainer, LinkImg} from './styled'
import * as R from 'ramda'

const log = console.log
, cutoff = 68
;
export function Item({data}) {
		return (
			<ItemContainer>
        <img width="50px" src={require('../../assets/images/placeholder.png')} alt="launch icon" />
        <span>{data.rocket_name}</span>
        <span>{data.rocket_type}</span>
        <span>{formatDate(data.launch_date)}</span>
        <span title={getTooltip(data.details || '')}>{formatDetails(data.details || '')}</span>
        <span>{data.flight_number}</span>
        <LinkImg href={data.article_link} target="blank_"><img className="clickable" width="25px"
					src={require('../../assets/images/link.svg')} alt="external link icon"
				/></LinkImg>
			</ItemContainer>
		)
}

function formatDate(dateStr) {
	return require('date-fns').format(new Date(dateStr), 'MM/dd/yyyy')
}

function formatDetails(dets = '') { // TODO: find out why this default params don't work
	return dets.length > cutoff
		? `${R.slice(0, cutoff-3, dets)}...`
		: dets
}

function getTooltip(dets = '') {
	return dets.length > cutoff
		? dets : null
}

import React from 'react'
import {ItemContainer, LinkImg} from './styled'
export function Item({data}) {
		return (
			<ItemContainer>
        <img width="50px" src={require('../../assets/images/placeholder.png')} alt="launch icon" />
        <span>{data.rocketName}</span>
        <span>{data.rocketType}</span>
        <span>{data.launchDate}</span>
        <span>{data.details}</span>
        <span>{data.id}</span>
        <LinkImg width="25px" src={require('../../assets/images/link.svg')} alt="external link icon"/>
			</ItemContainer>
		)
}

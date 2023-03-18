import React from 'react';

import Character from '../../assets/error/character.png';
import Cloud from '../../assets/error/cloud.png';
import Laptop from '../../assets/error/laptop.png';
import Screen from '../../assets/error/screen.png';
import Tag from '../../assets/error/tag.png';
import { ErrorPageComponent } from './styles';

export default function ErrorPage() {
	return (
		<ErrorPageComponent>
			<img src={Laptop} className='laptop' />
			<img src={Screen} className='screen' />
			<img src={Cloud} className='cloud' />
			<img src={Tag} className='tag' />
			<img src={Character} className='character' />
		</ErrorPageComponent>
	);
}

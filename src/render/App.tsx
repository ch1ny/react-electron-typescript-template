import MainBody from 'Components/MainBody';
import TopBar from 'Components/TopBar';
import React from 'react';
import './App.scss';

export default function App() {
	return (
		<div className='app'>
			<TopBar />
			<MainBody />
		</div>
	);
}

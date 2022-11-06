import { PagePluginRender } from 'Components/PagePluginRender';
import TopBar from 'Components/TopBar';
import React from 'react';
import './App.scss';
import { usePagePlugins } from './Hooks';

export default function App() {
	const { pagePlugins } = usePagePlugins();

	const pagePluginRenders = React.useMemo(() => {
		if (!pagePlugins.length) return null;

		return pagePlugins.map((pagePlugin: any, index) => (
			<React.Fragment key={index}>
				<PagePluginRender entry={pagePlugin.entry} pageName={pagePlugin.pageName} />
			</React.Fragment>
		));
	}, [pagePlugins]);

	return (
		<div className='app'>
			<TopBar />
			{/* <div className='sider'>
				{
					pagePlugins.map((pagePlugin: any) => (
						<div key={pagePlugin.entry}>{pagePlugin.entry}</div>
					))
				}
			</div> */}
			<div className='pages'>
				{pagePluginRenders}
			</div>
		</div>
	);
}

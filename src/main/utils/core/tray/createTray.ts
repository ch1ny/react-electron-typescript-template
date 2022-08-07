import { Tray } from 'electron';

export const createTray = (
	icon: string | Electron.NativeImage,
	menu: Electron.Menu,
	tooltip?: string,
	onClick?: (
		event: Electron.KeyboardEvent,
		bounds: Electron.Rectangle,
		position: Electron.Point
	) => void
) => {
	const tray = new Tray(icon);
	tray.setContextMenu(menu);
	if (tooltip) tray.setToolTip(tooltip);
	if (onClick) tray.on('click', onClick);
	return tray;
};

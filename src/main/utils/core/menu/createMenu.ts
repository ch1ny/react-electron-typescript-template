import { Menu } from 'electron';

interface IMenuProps {
	template: Electron.MenuItem[] | Electron.MenuItemConstructorOptions[];
}

export const createMenu = ({ template }: IMenuProps) => {
	return Menu.buildFromTemplate(template);
};

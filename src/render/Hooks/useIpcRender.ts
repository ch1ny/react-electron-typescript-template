import { useCallback } from 'react';

const useIpcRender = (prefix?: string) => {
	const { ipc } = window;

	const setListener = useCallback(
		(channel: string, cb: Function) => {
			ipc.on(`${prefix}.${channel}`, cb);
		},
		[ipc, prefix]
	);
	const removeListener = useCallback(
		(channel: string, cb: Function) => {
			ipc.removeListener(`${prefix}.${channel}`, cb);
		},
		[ipc, prefix]
	);
	const removeAllListeners = useCallback(
		(channel: string) => {
			ipc.removeAllListeners(`${prefix}.${channel}`);
		},
		[ipc, prefix]
	);
	const invokeHandler = useCallback(
		(channel: string, ...args: unknown[]) => {
			return ipc.invoke(`${prefix}.${channel}`, args);
		},
		[ipc, prefix]
	);

	return {
		setListener,
		removeListener,
		removeAllListeners,
		invokeHandler,
	};
};

export default useIpcRender;

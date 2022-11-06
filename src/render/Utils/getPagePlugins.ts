export const getPagePlugins = async () => {
    const { ipc: { invoke } } = window;

    const plugins = await invoke('PLUGINS.GET.PAGE_PLUGINS');
    return plugins;
}
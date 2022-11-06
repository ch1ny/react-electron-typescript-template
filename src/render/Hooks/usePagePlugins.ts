import { useEffect, useState } from "react";
import { getPagePlugins } from "Utils";

export const usePagePlugins = () => {
    const [pagePlugins, setPagePlugins] = useState([]);

    useEffect(() => {
        getPagePlugins().then(setPagePlugins);
    }, []);

    return {
        pagePlugins,
    }
}
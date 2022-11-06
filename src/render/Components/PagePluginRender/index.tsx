import React, { useEffect, useState } from "react";

export class PagePluginRenderCore extends React.Component<{ children: any }, { renderError: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { renderError: false };
    }

    componentDidCatch() {
        this.setState({ renderError: true });
    }

    render() {
        if (this.state.renderError) return null;

        const { children } = this.props;
        return (
            <>
                {children}
            </>
        )
    }
}

interface IPagePluginRenderProps {
    entry: string;
    pageName: string;
}

export const PagePluginRender: React.FC<IPagePluginRenderProps> = (props) => {
    const [Comp, setComp] = useState<React.FC>(() => () => null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `file:///${props.entry}`;
        script.onload = () => {
            setComp(() => window[props.pageName as any] as any);
        }
        document.head.appendChild(script);
    }, []);

    console.log(Comp);

    return (
        <>
            <Comp />
        </>
    )
}
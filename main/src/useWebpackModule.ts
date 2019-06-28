import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';

const getComponentFromSource: (source: string) => any = (source: string) => {
    const exports = {};
    // Hijacking require call to importing internal dependencies.
    function require(name: string){
        switch (name) {
            case 'react': return React;
            case 'react-dom': return ReactDOM;
            case 'redux': return Redux;
            case 'react-redux': return ReactRedux;
        }
    }
    eval(source);
    return exports;
};

const loadScript = (url: string) => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.onload = resolve;
    script.onerror = reject;
    script.src = url;
    script.type = 'text/javascript';
    script.async = true;
    document.head.appendChild(script);
});

export default (statsURL: string) => {
    const [source, setSource] = React.useState(null);
    const [loaded, setLoaded] = React.useState(false);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        let dismounted = false;
        (async () => {
            const [ componentURL, ...chunkURLs ] = await (await fetch(statsURL)).json();
            if (dismounted) return;
            const source = await (await fetch(componentURL)).text();
            !dismounted && setSource(source);
            try {
                await Promise.all(chunkURLs.map(loadScript));
                !dismounted && setLoaded(true);
            } catch (e) {
                !dismounted && setError(true);
            }
        })();
        return () => dismounted = true;
    });
    return source ? [getComponentFromSource(source).components, error, loaded] : [null, error, loaded];
};

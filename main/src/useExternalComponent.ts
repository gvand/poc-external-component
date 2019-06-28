import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';

const getComponentFromSource = (source: string) => {
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

export default (url: string) => {
    const [source, setSource] = React.useState(null);
    React.useEffect(() => {
        fetch(url)
            .then(res => res.text())
            .then(source => setSource(source));
    }, []);
    return source ? getComponentFromSource(source) : null;
};
import * as React from 'react';
import useExternalComponent from './useExternalComponent';

const App: React.FC = () => {
    const Component = useExternalComponent('http://localhost:9002/bundle.js');
    // @ts-ignore
    if (Component && Component.FirstComponent) {
        // @ts-ignore
        const { FirstComponent, SecondComponent } = Component;
        return (
            <div>
                <FirstComponent message={'Hello'}/>
                <SecondComponent message={'World'}/>
            </div>
        );
    } else {
        return (<div>Loading...</div>)
    }
};

export default App;

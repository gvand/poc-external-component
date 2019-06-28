import * as React from 'react';
import useWebpackModule from './useWebpackModule';

const App: React.FC = () => {
    const [components, error, loaded] = useWebpackModule('http://localhost:9002/stats.json');

    if (error) {
        return (<div>Component error!</div>);
    }
    if (!loaded) {
        return (<div>Loading…</div>);
    }
    // @ts-ignore
    const { FirstComponent, SecondComponent } = components;
    return (
        <div>
            <FirstComponent message={'Hello'}/>
            <SecondComponent message={'World'}/>
        </div>
    );
};

export default App;

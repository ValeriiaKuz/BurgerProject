import React from 'react';
import AppHeader from "../app-header/app-header";
import ComponentWrapper from "../main-components-wrapper/component-wrapper";
import style from './app.module.css'

function App() {
    return (
        <div className={style.wrapper}>
            <AppHeader/>
            <ComponentWrapper/>
        </div>
    );
}

export default App;

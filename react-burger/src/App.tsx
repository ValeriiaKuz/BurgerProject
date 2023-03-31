import React from 'react';
import AppHeader from "./components/app-header/app-header";
import './App.css'
import ComponentWrapper from "./components/main-components-wrapper/component-wrapper";
function App() {
  return (
      <div style={{height:'100%'}}>
        <AppHeader/>
        <ComponentWrapper/>
      </div>
  );
}
export default App;

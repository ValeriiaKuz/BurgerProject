import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from "./components/app/app";
import ErrorBoundary from "./components/error-boundary/error-boundary";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(

        <ErrorBoundary>
            <App/>
        </ErrorBoundary>

);

reportWebVitals();

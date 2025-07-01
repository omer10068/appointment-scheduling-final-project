import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

// RTL - Right to Left imports
import createCache from '@emotion/cache';
import {CacheProvider} from '@emotion/react';
import {prefixer} from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import {App} from "./App";

// take care of RTL stuff
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    // No need for double rendering
    // <React.StrictMode>
        <CacheProvider value={cacheRtl}>
            <App/>
        </CacheProvider>
    // </React.StrictMode>
);

reportWebVitals();

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { router } from './routes/router';
import "./index.css"
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FluentProvider theme={teamsLightTheme}>
    <RouterProvider router={router} />
    </FluentProvider>
  </React.StrictMode>,
)

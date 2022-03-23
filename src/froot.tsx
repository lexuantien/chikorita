/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactDOM from 'react-dom';

import Logger from "@helpers/logger";
import App from '@components/App';
import { BrowserRouter } from 'react-router-dom';

export default async () => {
  const logger = new Logger('froot');
  try {
    // load router
    // load api
    // track data with newrelic
    // track data with google analystic 

    return {
      render: () => {
        // some context api here
        // GraphqlContext
        // UserDataContext
        ReactDOM.render(
          <>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </>,
          document.getElementById('root')
        )
      },
    }

  } catch (error) {
    logger.logError(error, 'Could not load froot correctly');
    return {
      render: (ErrorPage: any = null) => {
        ReactDOM.render(<ErrorPage />, document.getElementById('content-main'));
      },
    }
  }
}
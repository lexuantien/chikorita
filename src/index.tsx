// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './app';
// import Logger from '@pipedrive/tools/logger';
// import { FrootRouter } from '@pipedrive/router';
// import ToolsContext from '@pipedrive/context/ToolsContext';

// document.addEventListener("DOMContentLoaded", function (event) {

//   const logger = new Logger('froot.index');
//   const router = new FrootRouter();
//   const toolsContextValue: ToolsContext = {
//     router
//   }

//   ReactDOM.render(
//     <>
//       <ToolsContext.Provider value={toolsContextValue}>
//         <App />
//       </ToolsContext.Provider>
//     </>,
//     document.getElementById('root'),
//   );

//   const skeleton = document.getElementById("skeleton");
//   if (skeleton != null) {
//     skeleton.style.opacity = "0";
//     skeleton.style.display = "none";
//   }
// });
import { logError } from "@helpers/errors/logError";
import { logger, unhandledErrors } from "@helpers/errors/loggerInstances";
import getErrorLevel from "@helpers/errors/getErrorLevel";
import Logger from "@helpers/logger";
import froot from "./froot";
// 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
(async () => {

  window.addEventListener('error', (event) => {
    logError(unhandledErrors, event, getErrorLevel(event));
  });

  window.addEventListener('unhandledrejection', (event) => {
    if (typeof event.reason === 'object' && event.reason?.componentName) {
      // remap the componentLoader rejections there's no reason to blame froot for x component not loading
      const derivedLogger = new Logger(event.reason.componentName, 'componentLoader');

      derivedLogger.logError(event.reason.message);
      event.preventDefault();

      return;
    }

    logError(unhandledErrors, event.reason, 'error');
    event.preventDefault();
  });

  try {

    // 1. Load configuration
    // 2. Set global app to help things coming

    const frootA = froot();

    (await frootA).render();

    const skeleton = document.getElementById("skeleton");
    skeleton?.remove();

  } catch (error) {
    logger.logError(error, 'Could not initialize froot');
  }

})();
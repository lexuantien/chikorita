/* eslint-disable @typescript-eslint/no-explicit-any */

const errorMessages = {
  default: "Request unsuccessful",
  invalidJSON: "Did not receive JSON response",
  notAvailable: "Fetch is not available",
  unauthorized: "Unauthorized request",
};

const defineProperty = (obj = {}, key: any, value: any) => {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    Object.assign(obj, {
      key: value,
    });
  }

  return obj;
};

const objectSpread = (target: any, ...args: any) => {
  for (let i = 1; i < args.length; i++) {
    const source = args[i] != null ? args[i] : {};
    let ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source)
          .filter((sym) => {
            return Object.getOwnPropertyDescriptor(source, sym as PropertyKey)
              ?.enumerable;
          })
          .toString()
      );
    }

    ownKeys.forEach((key) => {
      defineProperty(target, key, source[key]);
    });
  }

  return target;
};

const objectWithoutPropertiesLoose = (source = {}, excluded: string[]) => {
  if (source == null) return {};
  const target = {};
  const sourceKeys = Object.keys(source);
  let key: string;

  for (let i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key as keyof typeof target] = source[key as keyof typeof source];
  }

  return target;
};

const objectWithoutProperties = (source: any = {}, excluded: string[]) => {
  if (source == null) return {};

  const target: any = objectWithoutPropertiesLoose(source, excluded);
  let key: symbol, i;

  if (Object.getOwnPropertySymbols) {
    const sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key.toString()) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key.toString() as keyof typeof target] =
        source[key.toString() as keyof typeof source];
    }
  }

  return target;
};

const getCookieValue = (name: string) => {
  const value = "; ".concat(document.cookie);
  const parts = value.split("; ".concat(name, "="));

  if (!parts || parts.length !== 2) {
    return "";
  }

  return parts.pop()?.split(";").shift();
};

const parseResponse = (response: Response, isErrorResponse = false) => {
  return new Promise(function (resolve, reject) {
    response
      .json()
      .then(function (parsedResponse) {
        if (isErrorResponse || !parsedResponse.success) {
          return reject(
            Object.assign(
              {
                message: errorMessages.default,
              },
              parsedResponse
            )
          );
        }

        return resolve(parsedResponse);
      })
      .catch((err) => {
        const message = err.message.includes("invalid json response body")
          ? errorMessages.invalidJSON
          : errorMessages.default;
        return reject(new Error(message));
      });
  });
};

const _fetch = (url: string, ...args: any) => {
  const options = args.length > 1 && args[1] !== undefined ? args[1] : {};

  if (!global.fetch) {
    throw new Error(errorMessages.notAvailable);
  }

  const optionsRetryOptions = options.retryOptions;
  const retryOptions =
    optionsRetryOptions === undefined
      ? {
          retries: 1,
          retryDelay: 250,
        }
      : optionsRetryOptions;

  const optionsQueryParams = options.queryParams;
  const queryParams =
    optionsQueryParams === undefined ? {} : optionsQueryParams;

  const authCallback = options.authCallback;
  const restOptions = objectWithoutProperties(options, [
    "retryOptions",
    "queryParams",
    "authCallback",
  ]);

  const queryWithDefaults = objectSpread(
    {
      session_token: getCookieValue("pipe-session-token"),
      strict_mode: true,
    },
    queryParams
  );

  const queryString = Object.keys(queryWithDefaults)
    .map((key) => {
      const value = queryWithDefaults[key as keyof typeof queryWithDefaults];
      return "".concat(key, "=").concat(encodeURIComponent(value));
    })
    .join("&");

  url += "".concat(url.match(/\?/) ? "&" : "?").concat(queryString);

  const fetchOptions = objectSpread(
    {
      credentials: "include",
    },
    restOptions,
    {
      headers: objectSpread(
        {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Cache-control": "no-cache",
          Pragma: "no-cache",
        },
        restOptions.headers
      ),
    }
  );

  return new Promise((resolve, reject) => {
    async function retryFetch(...args2: any) {
      let retriesLeft =
        args2.length > 0 && args2[0] !== undefined
          ? args2[0]
          : retryOptions.retries - 1;
      try {
        const response = await global.fetch(url, fetchOptions);
        if (response.status === 401) {
          if (typeof authCallback === "function") {
            authCallback(response);
          } else {
            window.location.assign("/auth/login");
          }

          return reject(new Error(errorMessages.unauthorized));
        }

        if (response.status < 200 || response.status >= 300) {
          return parseResponse(response, true);
        }
        const parsedResponse = await parseResponse(response);
        return resolve(parsedResponse);
      } catch (err) {
        if (retriesLeft > 0) {
          setTimeout(function () {
            retryFetch(--retriesLeft);
          }, retryOptions.retryDelay);
        } else {
          if (err instanceof Error && retryOptions.retries > 1) {
            return reject(
              new Error(
                "Request unsuccessful after "
                  .concat(retryOptions.retries, " retries with error: ")
                  .concat(err.message)
              )
            );
          }

          reject(err);
        }
      }
    }

    retryFetch();
  });
};

const getStringData = (data = {}) => {
  return typeof data === "string" ? data : JSON.stringify(data);
};

const get = (path: string, options: any) => {
  return _fetch(
    path,
    objectSpread(
      {
        method: "GET",
      },
      options
    )
  );
};

const post = (path: string, data = {}, options = {}) => {
  const stringData = getStringData(data);
  return _fetch(
    path,
    objectSpread(
      {
        method: "POST",
        body: stringData,
      },
      options
    )
  );
};

const put = (path: string, data: string, options: any) => {
  const stringData = getStringData(data);
  return _fetch(
    path,
    objectSpread(
      {
        method: "PUT",
        body: stringData,
      },
      options
    )
  );
};
const patch = (path: string, data: any, options: any) => {
  const stringData = getStringData(data);
  return _fetch(
    path,
    objectSpread(
      {
        method: "PATCH",
        body: stringData,
      },
      options
    )
  );
};
const remove = (path: string, data: any, options: any) => {
  const stringData = getStringData(data);
  return _fetch(
    path,
    objectSpread(
      {
        method: "DELETE",
        body: stringData,
      },
      options
    )
  );
};

export default _fetch;
export { getCookieValue, get, put, patch, post, remove };
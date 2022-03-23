/* eslint-disable @typescript-eslint/no-explicit-any */
import Logger, { logType } from "@helpers/logger";

function getDerivedFacility(error: ErrorEvent | Error | any): string | null {
  let stack;

  if (error instanceof ErrorEvent) {
    stack = error.error?.stack;
  } else if (error instanceof Error) {
    stack = error.stack;
  }

  if (stack) {
    const lastMatch = stack.match(/pipedriveassets\.[a-z]+\/[a-z0-9-_]+\//gi);

    if (lastMatch) {
      const facility = lastMatch[0]?.split("/")[1];

      return facility;
    }
  }

  return null;
}

export function logError(
  logger: Logger,
  error: ErrorEvent | Error | any,
  level: logType
) {
  const derivedFacility = getDerivedFacility(error);
  const extraData: any = {};

  if (derivedFacility) {
    extraData.facility_is_derived = "true";
    const derivedLogger = new Logger(derivedFacility, "unhandledError");

    derivedLogger.logError(error, null, level, extraData, derivedFacility);
    return;
  }

  logger.logError(error, null, level, extraData, derivedFacility);
}

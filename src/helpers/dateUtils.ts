/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

// need this because we receive non-standard date strings from some apis
dayjs.extend(customParseFormat); 

export const formatDate = (formatString: string, date = new Date()) =>
  dayjs(date).format(formatString);

export const parseDate = (dateToParse: string, formatString: any) =>
  dayjs(dateToParse, formatString).toDate();

import { Response } from "express";

export enum StatusInformation {
  CONTINUE = 100,
  SWITCHING_PROTOCOL = 101,
  PROCESSING = 102,
  EARLY_HINTS = 103,
}

export enum StatusSuccess {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  MULTI_STATUS = 207,
  ALREADY_REPORTED = 208,
  IM_USED = 226,
}

export enum StatusRedirect {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  MULTI_STATUS = 207,
  ALREADY_REPORTED = 208,
  IM_USED = 226,
}

export enum StatusError {
  BAD_REQUEST = 400,
  UNAUTHORIZEDD = 401,
  FORBIDDEN = 403,
  CONFLICT = 409,
}

export const ApiResponse = (
  res: Response,
  statusCode: StatusError | StatusInformation | StatusSuccess | StatusRedirect,
  data: any
) => {
  return res.status(statusCode).json(data);
};

import { Express } from 'express';

/**
 * Interface representing an HTTP request.
 */
export interface IHttpRequest {
  /**
   * Represents the headers of the HTTP request.
   */
  header?: unknown;

  /**
   * Represents the body of the HTTP request.
   */
  body?: unknown;

  /**
   * Represents the query parameters of the HTTP request.
   */
  query?: unknown;

  /**
   * Represents the path parameters of the HTTP request.
   */
  path?: unknown;

  /**
   * Represents the cookie of the HTTP request.
   */
  cookie?: unknown;

  /**
   * Represents uploaded files (e.g., from Multer).
   */
  files?: { [fieldname: string]: Express.Multer.File[] };
}

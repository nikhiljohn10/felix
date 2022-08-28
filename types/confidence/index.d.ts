declare module "@hapipal/confidence" {
  import { Manifest } from "@hapi/glue";

  
  export declare class Store {
    /**
     * @constructor
     * @param {any} document - the configuration document for this document store
     */
    constructor(document?: unknown);

    /**
     * Validates the provided configuration, clears any existing configuration, then loads the configuration where:
     *   @param {any} document - an object containing a confidence configuration object generated from a parsed JSON document. If the document is invlaid, will throw an error.
     */
    load(document: unknown): void;

    /**
     * Retrieves a value from the configuration document after applying the provided criteria where:
     *   @param {string} key - the requested key path. All keys must begin with '/'. '/' returns the the entire document.
     *   @param {any} criteria - optional object used as criteria for applying filters in the configuration document. Defaults to {}.
     *
     *   @return {any} Returns the value found after applying the criteria. If the key is invalid or not found, returns undefined.
     */
    get(key: string, criteria?: unknown): Manifest;

    /**
     * Retrieves the metadata (if any) from the configuration document after applying the provided criteria where:
     *   @param {string} key - the requested key path. All keys must begin with '/'. '/' returns the the entire document.
     *   @param {any} criteria - optional object used as criteria for applying filters in the configuration document. Defaults to {}.
     *
     *   @return {any} Returns the metadata found after applying the criteria. If the key is invalid or not found, or if no metadata is available, returns undefined.
     */
    meta(key: string, criteria?: unknown): unknown;
  }
}

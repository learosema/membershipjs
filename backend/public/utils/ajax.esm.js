/**
 * Request State
 */
export const RequestState = {
  IDLE: 'idle',
  ABORTED: 'aborted',
  PENDING: 'pending',
  READY: 'ready',
  ERROR: 'error',
};

/**
 * Ajax class
 *
 * Wrapper class around the fetch API.
 * It creates an AbortController alongside with the request.
 * Also, it keeps track of the request state and throws an ApiException on HTTP status code !== 2xx
 *
 */
export class Ajax {
  /**
   * Ajax constructor. Takes the same arguments as fetch()
   * @param {string | Request} info URL or Request object
   * @param {RequestInit?} init options object
   */
  constructor(info, init) {
    this.abortController = new AbortController();
    this.init = { ...(init || {}), signal: this.abortController.signal };
    this.info = info;
    this.state = RequestState.IDLE;
    this.promise = null;
  }

  /**
   * Send API request.
   *
   * @returns {any} json data (await (await fetch()).json())
   * @throws {ApiException} exception if http response status code is not 2xx
   *
   */
  async send() {
    this.state = RequestState.PENDING;
    try {
      this.promise = fetch(this.info, this.init);
      const response = await this.promise;
      const json = await response.json();
      if (!response.ok) {
        throw { status: response.status, details: json };
      }
      this.state = RequestState.READY;
      return json;
    } catch (ex) {
      this.state = RequestState.ERROR;
      throw ex;
    } finally {
      this.abortController = null;
    }
  }

  /**
   * Cancel the request.
   */
  abort() {
    if (this.abortController) {
      this.state = RequestState.ABORTED;
      this.abortController.abort();
      this.abortController = null;
    }
  }
}

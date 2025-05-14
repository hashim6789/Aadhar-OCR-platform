/* eslint-disable no-unused-vars */
export interface IOCRProvider {
  performOCR(imagePath: string, lang?: string): Promise<string>;
}

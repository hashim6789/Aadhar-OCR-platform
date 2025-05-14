import Tesseract from 'tesseract.js';

export class OCRProvider {
  /**
   * Performs OCR on an image and extracts text.
   * @param imagePath Path to the image file.
   * @param lang Language for OCR (e.g., "eng", "eng+hin").
   * @returns Extracted text.
   */
  async performOCR(imagePath: string, lang: string = 'eng'): Promise<string> {
    try {
      const {
        data: { text },
      } = await Tesseract.recognize(imagePath, lang, {
        logger: (m) => console.log(`OCR Progress: ${m.status} (${(m.progress * 100).toFixed(2)}%)`),
      });
      return text;
    } catch (error: any) {
      throw new Error(`OCR failed: ${error.message}`);
    }
  }
}

export const ocrProvider = new OCRProvider();

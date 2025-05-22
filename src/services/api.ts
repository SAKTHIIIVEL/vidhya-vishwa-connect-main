import * as mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';


const API_URL = 'http://localhost:8080/api'; // Change this to your actual Spring Boot API endpoint

export interface ChatResponse {
  response: string;
}

export interface ChatRequest {
  message: string;
}

export async function sendMessage(message: string, file: File | null = null, sessionId: string): Promise<ChatResponse> {
  try {
    let finalMessage = message;

    if (file) {
      if (file.type.startsWith('image/')) {
        const extractedText = await extractTextFromImage(file);
        finalMessage = `${message} ${extractedText} ${file.name} image`;
      } else {
        const extractedText = await extractTextFromDocument(file);
        finalMessage = `${message} ${extractedText} ${file.name} document`;
      }
    }

    console.log(finalMessage);

    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: finalMessage, sessionId }),
    });

    if (!response.ok) throw new Error('Failed to fetch response');

    return await response.json();
  } catch (error) {
    console.error('Error fetching response:', error);
    return { response: "I'm having trouble connecting to my backend. Please try again later." };
  }
}

async function extractTextFromImage(file: File): Promise<string> {
  try {
    // Convert image to data URL for processing
    const imageUrl = await fileToDataURL(file);
    
    // Load Tesseract.js dynamically to avoid adding it as a dependency
    const Tesseract = await import('tesseract.js');
    const worker = await Tesseract.createWorker('eng');
    
    // Recognize text from image
    const result = await worker.recognize(imageUrl);
    const extractedText = result.data.text;
    
    // Terminate worker
    await worker.terminate();
    
    return extractedText || "No text could be extracted from the image";
  } catch (error) {
    console.error('Error extracting text from image:', error);
    return "Failed to extract text from image";
  }
}

async function extractTextFromDocument(file: File): Promise<string> {
  try {
    if (file.type === 'text/plain') {
      return await readTextFile(file);
    } else if (file.type === 'application/pdf') {
      return await extractTextFromPDF(file);
    } else if (
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.name.endsWith('.docx')
    ) {
      return await extractTextFromDocx(file);
    } else {
      return `[File content could not be extracted from ${file.name}]`;
    }
  } catch (error) {
    console.error('Error extracting text from document:', error);
    return "Failed to extract text from document";
  }
}

function readTextFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read text file"));
    reader.readAsText(file);
  });
}

async function extractTextFromDocx(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value || "No text found in DOCX file";
}

async function extractTextFromPDF(file: File): Promise<string> {
  try {
    // Assign the workerSrc for pdfjs
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n';
    }

    return fullText.trim();
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    return "Failed to extract text from PDF";
  }
}

// Convert file to data URL
function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

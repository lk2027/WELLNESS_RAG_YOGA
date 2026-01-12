/**
 * Text Chunking Utility
 * Splits text into chunks with overlap for better context retention
 */

export function chunkText(text, chunkSize = 1000, chunkOverlap = 200) {
  const chunks = [];
  let start = 0;

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    let chunk = text.slice(start, end);

    // Try to break at sentence boundaries for better chunk quality
    if (end < text.length) {
      const lastPeriod = chunk.lastIndexOf('.');
      const lastNewline = chunk.lastIndexOf('\n');
      const breakPoint = Math.max(lastPeriod, lastNewline);
      
      if (breakPoint > chunkSize * 0.5) { // Only break if we're past halfway
        chunk = chunk.slice(0, breakPoint + 1);
        start = start + breakPoint + 1 - chunkOverlap;
      } else {
        start = end - chunkOverlap;
      }
    } else {
      start = end;
    }

    if (chunk.trim().length > 0) {
      chunks.push(chunk.trim());
    }
  }

  return chunks;
}

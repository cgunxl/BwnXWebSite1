import * as fs from 'fs';

// Read the file
const filePath = '/workspace/data/calculators/fun-calculators.ts';
let content = fs.readFileSync(filePath, 'utf-8');

// Function to fix localized content
function fixLocalizedContent(content: string): string {
  // Pattern to match localizedContent blocks
  const pattern = /localizedContent:\s*{([^}]+(?:{[^}]*}[^}]*)*)}(?=\s*})/g;
  
  return content.replace(pattern, (match) => {
    // Process each locale in the block
    const localePattern = /(\w+):\s*{([^}]+(?:{[^}]*}[^}]*)*)}/g;
    let newContent = 'localizedContent: {\n';
    
    let localeMatch;
    while ((localeMatch = localePattern.exec(match)) !== null) {
      const locale = localeMatch[1];
      const localeContent = localeMatch[2];
      
      // Check if required fields exist
      const hasKeywords = localeContent.includes('keywords:');
      const hasFaq = localeContent.includes('faq:');
      const hasArticle = localeContent.includes('article:');
      
      newContent += `    ${locale}: {\n`;
      
      // Split content into lines
      const lines = localeContent.split('\n').filter(line => line.trim());
      
      // Add existing fields
      lines.forEach((line, index) => {
        const trimmed = line.trim();
        if (trimmed) {
          // Don't add comma after the last line if we're adding more fields
          const needsComma = trimmed.endsWith(',') || 
                           (index < lines.length - 1) || 
                           (!hasKeywords || !hasFaq || !hasArticle);
          
          if (!trimmed.endsWith(',') && needsComma && !trimmed.endsWith('}')) {
            newContent += `      ${trimmed},\n`;
          } else {
            newContent += `      ${trimmed}\n`;
          }
        }
      });
      
      // Add missing fields
      if (!hasKeywords) {
        // Generate default keywords based on title
        const titleMatch = localeContent.match(/title:\s*['"]([^'"]+)['"]/);
        const title = titleMatch ? titleMatch[1] : '';
        const keywords = locale === 'en' 
          ? `['${title.toLowerCase()}', 'calculator', 'online tool']`
          : `['${title}', 'คำนวณ', 'เครื่องมือ']`;
        newContent += `      keywords: ${keywords},\n`;
      }
      if (!hasFaq) {
        newContent += `      faq: [],\n`;
      }
      if (!hasArticle) {
        newContent += `      article: ''\n`;
      }
      
      // Close locale block
      newContent = newContent.trimEnd();
      if (!newContent.endsWith(',')) {
        newContent += '\n';
      }
      newContent += '    },\n';
    }
    
    // Remove trailing comma and close
    newContent = newContent.slice(0, -2) + '\n  }';
    return newContent;
  });
}

// Apply fixes
const fixedContent = fixLocalizedContent(content);

// Write back
fs.writeFileSync(filePath, fixedContent);
console.log('Fixed fun-calculators.ts');
import { ContentGenerator } from '../lib/content/generators';
import * as fs from 'fs';
import * as path from 'path';

// Function to fix localized content structure
function fixLocalizedContent(filePath: string) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  
  // Regular expression to find localizedContent objects
  const localizedContentRegex = /localizedContent:\s*{[\s\S]*?}(?=\s*})/g;
  
  let modifiedContent = fileContent;
  
  // Process each localized content block
  modifiedContent = modifiedContent.replace(/localizedContent:\s*{([\s\S]*?)(?=\s*}\s*,|\s*}\s*\})/g, (match) => {
    // Extract each locale block
    const localeRegex = /(\w+):\s*{([^}]+)}/g;
    let newContent = 'localizedContent: {\n';
    
    let localeMatch;
    while ((localeMatch = localeRegex.exec(match)) !== null) {
      const locale = localeMatch[1];
      const content = localeMatch[2];
      
      // Check if it has the required fields
      if (!content.includes('keywords:') || !content.includes('faq:') || !content.includes('article:')) {
        // Add missing fields
        newContent += `    ${locale}: {\n`;
        
        // Extract existing fields
        const lines = content.split('\n').filter(line => line.trim());
        lines.forEach(line => {
          newContent += `      ${line.trim()}\n`;
        });
        
        // Add missing fields with empty values
        if (!content.includes('keywords:')) {
          newContent += `      keywords: [],\n`;
        }
        if (!content.includes('faq:')) {
          newContent += `      faq: [],\n`;
        }
        if (!content.includes('article:')) {
          newContent += `      article: '',\n`;
        }
        
        newContent += '    },\n';
      } else {
        // Keep original if it has all fields
        newContent += `    ${locale}: {${content}},\n`;
      }
    }
    
    newContent = newContent.slice(0, -2) + '\n  }';
    return newContent;
  });
  
  fs.writeFileSync(filePath, modifiedContent);
  console.log(`Fixed: ${filePath}`);
}

// Fix all calculator files
const calculatorDir = path.join(__dirname, '../data/calculators');
const files = fs.readdirSync(calculatorDir);

files.forEach(file => {
  if (file.endsWith('.ts')) {
    const filePath = path.join(calculatorDir, file);
    try {
      fixLocalizedContent(filePath);
    } catch (error) {
      console.error(`Error fixing ${file}:`, error);
    }
  }
});

console.log('All calculator files have been fixed!');
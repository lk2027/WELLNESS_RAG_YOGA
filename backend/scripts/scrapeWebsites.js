/**
 * Web Scraper for Yoga Knowledge Base
 * Scrapes content from provided URLs and saves to knowledge base
 */

import https from 'https';
import http from 'http';
import { URL } from 'url';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of URLs to scrape
const URLs = [
  // Foundational Poses & General Wellness
  { url: 'https://www.siddhiyoga.com/yoga/poses/easy-yoga-poses-for-beginners', category: 'beginner_poses', source: 'Siddhi Yoga' },
  { url: 'https://www.hopkinsmedicine.org/health/wellness-and-prevention/9-benefits-of-yoga', category: 'benefits', source: 'Johns Hopkins Medicine' },
  { url: 'https://osteopathic.org/what-is-osteopathic-medicine/benefits-of-yoga/', category: 'benefits', source: 'American Osteopathic Association' },
  
  // Clinical Safety & Medical Guardrails
  { url: 'https://www.yogajournal.com/teach/ask-the-teacher-what-yoga-poses-are-safe-for-people-with-glaucoma/', category: 'safety', source: 'Yoga Journal' },
  { url: 'https://www.wjgnet.com/2222-0682/full/v14/i1/90127.htm', category: 'safety', source: 'World Journal of Gastrointestinal Oncology' },
  { url: 'https://glaucoma.org/articles/is-doing-yoga-safe-if-i-have-glaucoma', category: 'safety', source: 'Glaucoma Research Foundation' },
  { url: 'https://www.womenshealthnetwork.com/heart-health/yoga-for-high-blood-pressure/', category: 'safety', source: "Women's Health Network" },
  
  // Pregnancy & Prenatal Guidance
  { url: 'https://www.prathamyoga.com/blog/what-yoga-poses-you-should-avoid-during-pregnancy', category: 'pregnancy', source: 'Pratham Yoga' },
  { url: 'https://www.rainbowhospitals.in/blog/antenatal-yoga-safe-poses-and-precautions', category: 'pregnancy', source: 'Rainbow Hospitals' },
  { url: 'https://www.healthline.com/health/fitness/first-trimester-yoga', category: 'pregnancy', source: 'Healthline' },
  
  // Hernia & Surgical Recovery
  { url: 'https://yogainternational.com/article/view/drs-advice-for-hernias/', category: 'safety', source: 'Yoga International' },
  { url: 'https://www.missionsurgical.com/blogs/when-is-it-safe-to-resume-exercise-after-hernia-surgery/', category: 'safety', source: 'Mission Surgical Clinic' },
  { url: 'https://int.livhospital.com/exercise-after-abdominal-surgery-12-safe-easy-moves/', category: 'safety', source: 'Liv Hospital' },
  
  // Yoga Styles & Progression Levels
  { url: 'https://theyogainstitute.org/beginner-to-advanced', category: 'levels', source: 'The Yoga Institute' },
  { url: 'https://www.omshantiomyoga.com/blog/hatha-vinyasa-yin-restorative-beginner-s-guide-to-yoga-styles.html', category: 'styles', source: 'Om Shanti Om Yoga' },
  { url: 'https://yogauonline.com/yoga-practice-teaching-tips/yoga-practice-tips/8-ways-to-modify-yoga-inversions/', category: 'modifications', source: 'YogaUOnline' }
];

/**
 * Simple HTML to text extractor (removes HTML tags)
 */
function extractText(html) {
  // Remove script and style elements
  html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  
  // Remove HTML tags but keep text content
  let text = html.replace(/<[^>]+>/g, ' ');
  
  // Decode HTML entities
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  
  // Clean up whitespace
  text = text.replace(/\s+/g, ' ').trim();
  
  return text;
}

/**
 * Fetch content from URL
 */
function fetchURL(urlString) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlString);
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };

    const client = url.protocol === 'https:' ? https : http;
    
    const req = client.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    req.end();
  });
}

/**
 * Scrape a single URL
 */
async function scrapeURL(urlInfo) {
  try {
    console.log(`📡 Scraping: ${urlInfo.source}...`);
    const html = await fetchURL(urlInfo.url);
    const text = extractText(html);
    
    // Extract title (simple method - look for first heading)
    const titleMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/i) || 
                      html.match(/<title[^>]*>(.*?)<\/title>/i);
    const title = titleMatch ? extractText(titleMatch[1]) : urlInfo.source;
    
    // Clean and structure the content
    const content = text
      .split(/\n+/)
      .map(line => line.trim())
      .filter(line => line.length > 50) // Filter out very short lines
      .join('\n\n')
      .substring(0, 5000); // Limit content length
    
    return {
      id: `web_${urlInfo.source.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`,
      title: title,
      content: content,
      category: urlInfo.category,
      source: urlInfo.source,
      url: urlInfo.url
    };
  } catch (error) {
    console.error(`❌ Error scraping ${urlInfo.url}:`, error.message);
    return null;
  }
}

/**
 * Main scraping function
 */
async function scrapeAll() {
  console.log('🚀 Starting web scraping...\n');
  console.log(`📚 Found ${URLs.length} URLs to scrape\n`);
  
  const results = [];
  
  for (const urlInfo of URLs) {
    const result = await scrapeURL(urlInfo);
    if (result) {
      results.push(result);
      console.log(`✅ Scraped: ${result.title.substring(0, 60)}...`);
    }
    
    // Be respectful - add small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log(`\n📦 Successfully scraped ${results.length} articles`);
  
  // Save to file
  const outputPath = path.join(__dirname, '../data/scrapedArticles.js');
  const content = `/**
 * Scraped Yoga Articles from Web Sources
 * Generated by scrapeWebsites.js
 * Date: ${new Date().toISOString()}
 */

export const scrapedArticles = ${JSON.stringify(results, null, 2)};
`;
  
  fs.writeFileSync(outputPath, content, 'utf8');
  console.log(`💾 Saved to: ${outputPath}`);
  console.log(`\n🎉 Scraping complete!`);
  
  return results;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  scrapeAll().catch(console.error);
}

export { scrapeAll, URLs };

import { Calculator } from '@/lib/types/calculator';

export const techCalculators: Calculator[] = [
  {
    id: 'bandwidth-calculator',
    slug: 'bandwidth-calculator',
    category: 'tech',
    icon: '🌐',
    color: '#6366F1',
    inputs: [
      {
        key: 'visitors',
        label: 'Monthly Visitors',
        type: 'number',
        defaultValue: 10000,
        min: 0,
        max: 100000000,
        step: 100,
        required: true
      },
      {
        key: 'pageViews',
        label: 'Page Views per Visitor',
        type: 'number',
        defaultValue: 3,
        min: 1,
        max: 100,
        step: 0.1,
        required: true
      },
      {
        key: 'pageSize',
        label: 'Average Page Size',
        type: 'number',
        defaultValue: 2,
        min: 0.1,
        max: 100,
        step: 0.1,
        required: true,
        unit: 'MB'
      },
      {
        key: 'videoPercentage',
        label: 'Pages with Video',
        type: 'slider',
        defaultValue: 10,
        min: 0,
        max: 100,
        step: 1,
        required: false,
        unit: '%'
      },
      {
        key: 'videoSize',
        label: 'Average Video Size',
        type: 'number',
        defaultValue: 50,
        min: 1,
        max: 1000,
        step: 1,
        required: false,
        unit: 'MB'
      },
      {
        key: 'downloadFiles',
        label: 'Downloadable Files',
        type: 'boolean',
        defaultValue: false,
        required: false
      },
      {
        key: 'downloadSize',
        label: 'Average Download Size',
        type: 'number',
        defaultValue: 10,
        min: 0.1,
        max: 1000,
        step: 0.1,
        required: false,
        unit: 'MB',
        dependsOn: ['downloadFiles'],
        showWhen: { downloadFiles: true }
      },
      {
        key: 'downloadRate',
        label: 'Download Rate',
        type: 'number',
        defaultValue: 5,
        min: 0,
        max: 100,
        step: 0.1,
        required: false,
        unit: '%',
        dependsOn: ['downloadFiles'],
        showWhen: { downloadFiles: true }
      },
      {
        key: 'redundancy',
        label: 'Redundancy Factor',
        type: 'slider',
        defaultValue: 20,
        min: 0,
        max: 100,
        step: 5,
        required: false,
        unit: '%',
        tooltip: 'Extra bandwidth for peaks'
      }
    ],
    outputs: [
      {
        key: 'monthlyBandwidth',
        label: 'Monthly Bandwidth',
        format: 'number',
        decimals: 2,
        unit: 'GB',
        description: 'Total monthly transfer',
        highlight: true
      },
      {
        key: 'dailyBandwidth',
        label: 'Daily Average',
        format: 'number',
        decimals: 2,
        unit: 'GB',
        description: 'Average daily transfer'
      },
      {
        key: 'peakBandwidth',
        label: 'Peak Bandwidth',
        format: 'number',
        decimals: 2,
        unit: 'Mbps',
        description: 'Required connection speed'
      },
      {
        key: 'yearlyBandwidth',
        label: 'Yearly Bandwidth',
        format: 'number',
        decimals: 2,
        unit: 'TB',
        description: 'Annual data transfer'
      },
      {
        key: 'hostingCost',
        label: 'Estimated Hosting Cost',
        format: 'currency',
        decimals: 2,
        description: 'Monthly hosting estimate'
      },
      {
        key: 'cdnRecommendation',
        label: 'CDN Recommendation',
        format: 'text',
        description: 'CDN usage advice'
      }
    ],
    formulas: [
      {
        key: 'calculate',
        expression: `
          // Calculate total page views
          const totalPageViews = visitors * pageViews;
          
          // Calculate bandwidth from regular pages
          let regularBandwidth = totalPageViews * pageSize;
          
          // Add video bandwidth
          const videoBandwidth = totalPageViews * (videoPercentage / 100) * videoSize;
          
          // Add download bandwidth
          let downloadBandwidth = 0;
          if (downloadFiles) {
            downloadBandwidth = visitors * (downloadRate / 100) * downloadSize;
          }
          
          // Total bandwidth in MB
          let totalBandwidthMB = regularBandwidth + videoBandwidth + downloadBandwidth;
          
          // Add redundancy
          totalBandwidthMB *= (1 + redundancy / 100);
          
          // Convert to different units
          const monthlyBandwidth = totalBandwidthMB / 1024; // GB
          const dailyBandwidth = monthlyBandwidth / 30;
          const yearlyBandwidth = monthlyBandwidth * 12 / 1024; // TB
          
          // Calculate peak bandwidth (assuming 20% of traffic in peak hour)
          const peakHourGB = dailyBandwidth * 0.2;
          const peakBandwidth = (peakHourGB * 1024 * 8) / 3600; // Mbps
          
          // Estimate hosting cost
          let hostingCost = 0;
          if (monthlyBandwidth < 100) {
            hostingCost = 5; // Shared hosting
          } else if (monthlyBandwidth < 1000) {
            hostingCost = 20 + (monthlyBandwidth - 100) * 0.05; // VPS
          } else if (monthlyBandwidth < 10000) {
            hostingCost = 65 + (monthlyBandwidth - 1000) * 0.02; // Dedicated
          } else {
            hostingCost = 245 + (monthlyBandwidth - 10000) * 0.01; // CDN required
          }
          
          // CDN recommendation
          let cdnRecommendation = '';
          if (monthlyBandwidth < 500) {
            cdnRecommendation = 'CDN not required. Standard hosting sufficient for your traffic.';
          } else if (monthlyBandwidth < 5000) {
            cdnRecommendation = 'Consider CDN for better performance. Cloudflare free tier may suffice.';
          } else if (monthlyBandwidth < 50000) {
            cdnRecommendation = 'CDN recommended. Consider Cloudflare Pro or AWS CloudFront.';
          } else {
            cdnRecommendation = 'CDN essential. Enterprise solution needed. Consider multiple CDN providers.';
          }
          
          return {
            monthlyBandwidth,
            dailyBandwidth,
            peakBandwidth,
            yearlyBandwidth,
            hostingCost,
            cdnRecommendation
          };
        `,
        description: 'Calculate website bandwidth requirements'
      }
    ],
    localizedContent: {
      en: {
        title: 'Website Bandwidth Calculator',
        description: 'Calculate bandwidth requirements and hosting costs for your website',
        keywords: ['bandwidth calculator', 'website bandwidth', 'hosting calculator', 'data transfer', 'CDN calculator'],
        faq: [
          {
            question: 'What is website bandwidth?',
            answer: 'Bandwidth is the amount of data transferred between your website and users. It includes page loads, images, videos, and downloads.'
          },
          {
            question: 'How much bandwidth do I need?',
            answer: 'Depends on traffic and content. Text sites: 1-5GB/1000 visitors. Image-heavy: 10-50GB/1000 visitors. Video sites: 100GB+/1000 visitors.'
          },
          {
            question: 'What happens if I exceed bandwidth?',
            answer: 'Site may go offline, incur overage charges, or experience throttling. Choose plans with adequate bandwidth or use CDN for high traffic.'
          },
          {
            question: 'How can I reduce bandwidth usage?',
            answer: 'Optimize images, use compression, implement caching, use CDN, lazy load content, minimize code, and optimize videos.'
          }
        ],
        article: {
          title: 'Understanding Website Bandwidth',
          introduction: 'Bandwidth determines how much data your website can transfer to visitors. Proper planning prevents downtime and reduces costs.',
          sections: [
            {
              heading: 'Calculating Requirements',
              content: 'Multiply visitors × page views × page size. Add extra for videos and downloads. Include 20-50% buffer for traffic spikes.'
            },
            {
              heading: 'Optimization Strategies',
              content: 'Compress images (WebP format), minify CSS/JS, enable GZIP, use browser caching, implement CDN, optimize database queries.'
            },
            {
              heading: 'Choosing Hosting',
              content: 'Shared: <5GB/month. VPS: 5-500GB. Dedicated: 500GB-5TB. Cloud/CDN: unlimited scalability. Match hosting to bandwidth needs.'
            }
          ],
          conclusion: 'Monitor bandwidth usage regularly and optimize content delivery for better performance and lower costs.',
          wordCount: 320
        }
      },
      th: {
        title: 'คำนวณแบนด์วิธเว็บไซต์',
        description: 'คำนวณแบนด์วิธที่ต้องการและค่าโฮสติ้งสำหรับเว็บไซต์',
        keywords: ['คำนวณแบนด์วิธ', 'แบนด์วิธเว็บไซต์', 'คำนวณโฮสติ้ง', 'data transfer', 'CDN'],
        faq: [
          {
            question: 'แบนด์วิธเว็บไซต์คืออะไร?',
            answer: 'แบนด์วิธคือปริมาณข้อมูลที่ถ่ายโอนระหว่างเว็บไซต์กับผู้ใช้ รวมการโหลดหน้า รูปภาพ วิดีโอ และดาวน์โหลด'
          },
          {
            question: 'ต้องใช้แบนด์วิธเท่าไหร่?',
            answer: 'ขึ้นอยู่กับทราฟฟิกและเนื้อหา เว็บข้อความ: 1-5GB/1000 คน เว็บรูปเยอะ: 10-50GB/1000 คน เว็บวิดีโอ: 100GB+/1000 คน'
          }
        ],
        article: {
          title: 'เข้าใจแบนด์วิธเว็บไซต์',
          introduction: 'แบนด์วิธกำหนดปริมาณข้อมูลที่เว็บไซต์ส่งให้ผู้เข้าชม การวางแผนที่ดีป้องกันเว็บล่มและลดค่าใช้จ่าย',
          sections: [
            {
              heading: 'คำนวณความต้องการ',
              content: 'ผู้เข้าชม × หน้าที่ดู × ขนาดหน้า เพิ่มสำหรับวิดีโอและดาวน์โหลด เผื่อ 20-50% สำหรับทราฟฟิกพุ่ง'
            }
          ],
          conclusion: 'ติดตามการใช้แบนด์วิธสม่ำเสมอและปรับปรุงการส่งเนื้อหาเพื่อประสิทธิภาพที่ดีและต้นทุนต่ำ',
          wordCount: 280
        }
      }
    }
  },
  {
    id: 'cloud-storage-calculator',
    slug: 'cloud-storage-calculator',
    category: 'tech',
    icon: '☁️',
    color: '#3B82F6',
    inputs: [
      {
        key: 'storageAmount',
        label: 'Storage Needed',
        type: 'number',
        defaultValue: 100,
        min: 1,
        max: 1000000,
        step: 1,
        required: true,
        unit: 'GB'
      },
      {
        key: 'monthlyGrowth',
        label: 'Monthly Growth Rate',
        type: 'number',
        defaultValue: 5,
        min: 0,
        max: 100,
        step: 1,
        required: false,
        unit: '%'
      },
      {
        key: 'dataTransferOut',
        label: 'Monthly Data Transfer Out',
        type: 'number',
        defaultValue: 50,
        min: 0,
        max: 1000000,
        step: 1,
        required: true,
        unit: 'GB'
      },
      {
        key: 'requestsPerMonth',
        label: 'API Requests/Month',
        type: 'select',
        defaultValue: '100000',
        required: true,
        options: [
          { value: '10000', label: 'Low (10K)' },
          { value: '100000', label: 'Medium (100K)' },
          { value: '1000000', label: 'High (1M)' },
          { value: '10000000', label: 'Very High (10M)' },
          { value: '100000000', label: 'Enterprise (100M)' }
        ]
      },
      {
        key: 'storageClass',
        label: 'Storage Class',
        type: 'select',
        defaultValue: 'standard',
        required: true,
        options: [
          { value: 'standard', label: 'Standard (Frequent Access)' },
          { value: 'infrequent', label: 'Infrequent Access' },
          { value: 'archive', label: 'Archive/Cold' },
          { value: 'deep-archive', label: 'Deep Archive' }
        ]
      },
      {
        key: 'redundancy',
        label: 'Redundancy Level',
        type: 'select',
        defaultValue: 'high',
        required: true,
        options: [
          { value: 'single', label: 'Single Region' },
          { value: 'high', label: 'High Redundancy' },
          { value: 'geo', label: 'Geo-Redundant' }
        ]
      },
      {
        key: 'provider',
        label: 'Cloud Provider',
        type: 'select',
        defaultValue: 'aws',
        required: true,
        options: [
          { value: 'aws', label: 'AWS S3' },
          { value: 'azure', label: 'Azure Blob' },
          { value: 'gcp', label: 'Google Cloud' },
          { value: 'generic', label: 'Generic Estimate' }
        ]
      }
    ],
    outputs: [
      {
        key: 'monthlyStorageCost',
        label: 'Monthly Storage Cost',
        format: 'currency',
        decimals: 2,
        description: 'Storage fees',
        highlight: true
      },
      {
        key: 'monthlyTransferCost',
        label: 'Data Transfer Cost',
        format: 'currency',
        decimals: 2,
        description: 'Egress fees'
      },
      {
        key: 'monthlyRequestCost',
        label: 'API Request Cost',
        format: 'currency',
        decimals: 2,
        description: 'Operation fees'
      },
      {
        key: 'totalMonthlyCost',
        label: 'Total Monthly Cost',
        format: 'currency',
        decimals: 2,
        description: 'All fees combined',
        highlight: true
      },
      {
        key: 'yearlyProjection',
        label: 'Yearly Cost Projection',
        format: 'currency',
        decimals: 2,
        description: 'With growth factored'
      },
      {
        key: 'storageIn12Months',
        label: 'Storage in 12 Months',
        format: 'number',
        decimals: 2,
        unit: 'GB',
        description: 'Projected storage'
      },
      {
        key: 'recommendation',
        label: 'Cost Optimization Tips',
        format: 'text',
        description: 'Ways to save'
      }
    ],
    formulas: [
      {
        key: 'calculate',
        expression: `
          // Storage cost per GB per month (USD)
          let storagePricePerGB = 0.023; // AWS S3 Standard
          
          // Adjust for storage class
          if (storageClass === 'infrequent') storagePricePerGB *= 0.55;
          else if (storageClass === 'archive') storagePricePerGB *= 0.17;
          else if (storageClass === 'deep-archive') storagePricePerGB *= 0.04;
          
          // Adjust for redundancy
          if (redundancy === 'single') storagePricePerGB *= 0.8;
          else if (redundancy === 'geo') storagePricePerGB *= 1.3;
          
          // Adjust for provider
          if (provider === 'azure') storagePricePerGB *= 0.95;
          else if (provider === 'gcp') storagePricePerGB *= 1.05;
          else if (provider === 'generic') storagePricePerGB *= 0.9;
          
          // Calculate storage cost
          const monthlyStorageCost = storageAmount * storagePricePerGB;
          
          // Data transfer cost (egress)
          let transferPricePerGB = 0;
          if (dataTransferOut <= 1) {
            transferPricePerGB = 0; // First GB free
          } else if (dataTransferOut <= 10000) {
            transferPricePerGB = 0.09;
          } else if (dataTransferOut <= 50000) {
            transferPricePerGB = 0.085;
          } else {
            transferPricePerGB = 0.07;
          }
          
          const monthlyTransferCost = dataTransferOut * transferPricePerGB;
          
          // API request cost
          const requests = parseInt(requestsPerMonth);
          let requestCost = 0;
          
          if (storageClass === 'standard') {
            requestCost = (requests / 1000) * 0.0004; // $0.0004 per 1000 requests
          } else if (storageClass === 'infrequent') {
            requestCost = (requests / 1000) * 0.001;
          } else {
            requestCost = (requests / 1000) * 0.01; // Archive retrieval
          }
          
          const monthlyRequestCost = requestCost;
          
          // Total monthly cost
          const totalMonthlyCost = monthlyStorageCost + monthlyTransferCost + monthlyRequestCost;
          
          // Calculate growth projection
          let projectedStorage = storageAmount;
          let yearlyCost = 0;
          
          for (let month = 0; month < 12; month++) {
            projectedStorage *= (1 + monthlyGrowth / 100);
            const monthCost = (projectedStorage * storagePricePerGB) + monthlyTransferCost + monthlyRequestCost;
            yearlyCost += monthCost;
          }
          
          const storageIn12Months = projectedStorage;
          const yearlyProjection = yearlyCost;
          
          // Recommendations
          let recommendations = [];
          
          if (storageClass === 'standard' && requestsPerMonth <= '100000') {
            recommendations.push('Consider Infrequent Access tier for 45% savings');
          }
          
          if (dataTransferOut > storageAmount * 0.5) {
            recommendations.push('High transfer ratio - consider CDN for static content');
          }
          
          if (monthlyGrowth > 10) {
            recommendations.push('High growth rate - implement data lifecycle policies');
          }
          
          if (redundancy === 'geo' && provider === 'aws') {
            recommendations.push('Consider S3 Intelligent-Tiering for automatic cost optimization');
          }
          
          recommendations.push('Use compression', 'Delete old data', 'Implement lifecycle rules');
          
          const recommendation = recommendations.slice(0, 3).join('; ');
          
          return {
            monthlyStorageCost,
            monthlyTransferCost,
            monthlyRequestCost,
            totalMonthlyCost,
            yearlyProjection,
            storageIn12Months,
            recommendation
          };
        `,
        description: 'Calculate cloud storage costs across providers'
      }
    ],
    localizedContent: {
      en: {
        title: 'Cloud Storage Cost Calculator',
        description: 'Calculate and compare cloud storage costs for AWS S3, Azure, Google Cloud',
        keywords: ['cloud storage calculator', 'AWS S3 pricing', 'Azure blob cost', 'Google Cloud storage', 'cloud costs'],
        faq: [
          {
            question: 'Which storage class should I choose?',
            answer: 'Standard: frequently accessed data. Infrequent: accessed monthly. Archive: yearly access. Deep Archive: rarely accessed compliance data.'
          },
          {
            question: 'What are egress charges?',
            answer: 'Fees for data transferred OUT of the cloud provider\'s network. Ingress (upload) is usually free. Egress can be expensive at scale.'
          },
          {
            question: 'How to reduce cloud storage costs?',
            answer: 'Use appropriate storage tiers, implement lifecycle policies, compress data, delete unused files, use CDN for frequently accessed content.'
          }
        ],
        article: {
          title: 'Optimizing Cloud Storage Costs',
          introduction: 'Cloud storage offers scalability but costs can escalate. Understanding pricing models helps optimize expenses.',
          sections: [
            {
              heading: 'Cost Components',
              content: 'Storage: price per GB stored. Transfer: egress fees. Requests: API call charges. Retrieval: for archive tiers. Consider all components.'
            },
            {
              heading: 'Optimization Strategies',
              content: 'Right-size storage class, use lifecycle policies, compress before storing, implement caching, monitor unused data, consider multi-cloud.'
            }
          ],
          conclusion: 'Regular monitoring and optimization of storage usage patterns can reduce costs by 30-50%.',
          wordCount: 300
        }
      }
    }
  },
  {
    id: 'password-strength-calculator',
    slug: 'password-strength-calculator',
    category: 'tech',
    icon: '🔐',
    color: '#10B981',
    inputs: [
      {
        key: 'password',
        label: 'Password to Test',
        type: 'text',
        defaultValue: '',
        required: true,
        placeholder: 'Enter password to test'
      },
      {
        key: 'showPassword',
        label: 'Show Password',
        type: 'boolean',
        defaultValue: false,
        required: false
      },
      {
        key: 'checkCompromised',
        label: 'Check if Compromised',
        type: 'boolean',
        defaultValue: true,
        required: false,
        tooltip: 'Check against known breaches'
      }
    ],
    outputs: [
      {
        key: 'strength',
        label: 'Password Strength',
        format: 'text',
        description: 'Overall rating',
        highlight: true
      },
      {
        key: 'score',
        label: 'Strength Score',
        format: 'number',
        decimals: 0,
        unit: '/100',
        description: 'Numerical rating',
        highlight: true
      },
      {
        key: 'crackTime',
        label: 'Time to Crack',
        format: 'text',
        description: 'Brute force estimate'
      },
      {
        key: 'entropy',
        label: 'Entropy',
        format: 'number',
        decimals: 1,
        unit: 'bits',
        description: 'Randomness measure'
      },
      {
        key: 'characterTypes',
        label: 'Character Types Used',
        format: 'text',
        description: 'Variety of characters'
      },
      {
        key: 'suggestions',
        label: 'Improvement Suggestions',
        format: 'text',
        description: 'How to strengthen'
      },
      {
        key: 'patterns',
        label: 'Patterns Detected',
        format: 'text',
        description: 'Weak patterns found'
      }
    ],
    formulas: [
      {
        key: 'calculate',
        expression: `
          if (!password) {
            return {
              strength: 'No password entered',
              score: 0,
              crackTime: 'Instant',
              entropy: 0,
              characterTypes: 'None',
              suggestions: 'Enter a password to test',
              patterns: 'N/A'
            };
          }
          
          let score = 0;
          const length = password.length;
          
          // Length scoring
          if (length >= 8) score += 10;
          if (length >= 12) score += 10;
          if (length >= 16) score += 15;
          if (length >= 20) score += 15;
          
          // Character variety
          const hasLower = /[a-z]/.test(password);
          const hasUpper = /[A-Z]/.test(password);
          const hasNumber = /[0-9]/.test(password);
          const hasSpecial = /[^a-zA-Z0-9]/.test(password);
          
          if (hasLower) score += 10;
          if (hasUpper) score += 10;
          if (hasNumber) score += 10;
          if (hasSpecial) score += 20;
          
          // Character types description
          const types = [];
          if (hasLower) types.push('lowercase');
          if (hasUpper) types.push('uppercase');
          if (hasNumber) types.push('numbers');
          if (hasSpecial) types.push('special');
          const characterTypes = types.length > 0 ? types.join(', ') : 'none';
          
          // Pattern detection
          const patterns = [];
          
          // Common patterns
          if (/123|234|345|456|567|678|789|890/.test(password)) {
            patterns.push('sequential numbers');
            score -= 10;
          }
          
          if (/abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i.test(password)) {
            patterns.push('sequential letters');
            score -= 10;
          }
          
          if (/qwerty|asdf|zxcv/i.test(password)) {
            patterns.push('keyboard pattern');
            score -= 15;
          }
          
          if (/(.)\\1{2,}/.test(password)) {
            patterns.push('repeated characters');
            score -= 10;
          }
          
          if (/password|admin|user|login|welcome/i.test(password)) {
            patterns.push('common word');
            score -= 20;
          }
          
          // Calculate entropy
          let charSet = 0;
          if (hasLower) charSet += 26;
          if (hasUpper) charSet += 26;
          if (hasNumber) charSet += 10;
          if (hasSpecial) charSet += 32;
          
          const entropy = length * Math.log2(charSet || 1);
          
          // Calculate crack time
          const guessesPerSecond = 1000000000; // 1 billion/sec
          const possibleCombinations = Math.pow(charSet || 1, length);
          const secondsToCrack = possibleCombinations / (2 * guessesPerSecond);
          
          let crackTime = '';
          if (secondsToCrack < 1) crackTime = 'Instant';
          else if (secondsToCrack < 60) crackTime = Math.round(secondsToCrack) + ' seconds';
          else if (secondsToCrack < 3600) crackTime = Math.round(secondsToCrack / 60) + ' minutes';
          else if (secondsToCrack < 86400) crackTime = Math.round(secondsToCrack / 3600) + ' hours';
          else if (secondsToCrack < 2592000) crackTime = Math.round(secondsToCrack / 86400) + ' days';
          else if (secondsToCrack < 31536000) crackTime = Math.round(secondsToCrack / 2592000) + ' months';
          else if (secondsToCrack < 31536000000) crackTime = Math.round(secondsToCrack / 31536000) + ' years';
          else crackTime = 'Centuries';
          
          // Ensure score is 0-100
          score = Math.max(0, Math.min(100, score));
          
          // Determine strength label
          let strength = '';
          if (score < 20) strength = 'Very Weak';
          else if (score < 40) strength = 'Weak';
          else if (score < 60) strength = 'Fair';
          else if (score < 80) strength = 'Strong';
          else strength = 'Very Strong';
          
          // Suggestions
          const suggestions = [];
          if (length < 12) suggestions.push('Use at least 12 characters');
          if (!hasUpper) suggestions.push('Add uppercase letters');
          if (!hasLower) suggestions.push('Add lowercase letters');
          if (!hasNumber) suggestions.push('Add numbers');
          if (!hasSpecial) suggestions.push('Add special characters');
          if (patterns.length > 0) suggestions.push('Avoid predictable patterns');
          
          return {
            strength,
            score,
            crackTime,
            entropy,
            characterTypes,
            suggestions: suggestions.slice(0, 3).join('; ') || 'Good password!',
            patterns: patterns.join(', ') || 'None detected'
          };
        `,
        description: 'Analyze password strength and security'
      }
    ],
    localizedContent: {
      en: {
        title: 'Password Strength Calculator',
        description: 'Test password strength, entropy, and get security recommendations',
        keywords: ['password strength', 'password checker', 'security calculator', 'password entropy', 'password tester'],
        faq: [
          {
            question: 'What makes a strong password?',
            answer: 'Length (12+ characters), variety (upper, lower, numbers, symbols), randomness (no patterns), uniqueness (not reused), and no personal info.'
          },
          {
            question: 'How long should passwords be?',
            answer: 'Minimum 12 characters, ideally 16+. Each additional character exponentially increases security. Consider passphrases for easy-to-remember length.'
          },
          {
            question: 'Are password managers safe?',
            answer: 'Yes, reputable password managers are very safe. They encrypt passwords, generate strong unique passwords, and are safer than reusing passwords.'
          }
        ],
        article: {
          title: 'Creating Strong Passwords',
          introduction: 'Strong passwords are your first line of defense against cyber attacks.',
          sections: [
            {
              heading: 'Password Best Practices',
              content: 'Use unique passwords for each account. Minimum 12 characters. Mix character types. Avoid personal information. Use password manager.'
            },
            {
              heading: 'Passphrase Method',
              content: 'Combine 4+ random words: "correct-horse-battery-staple". Easy to remember, hard to crack. Add numbers/symbols for extra security.'
            }
          ],
          conclusion: 'Strong, unique passwords combined with two-factor authentication provide excellent security.',
          wordCount: 280
        }
      }
    }
  },
  {
    id: 'download-time-calculator',
    slug: 'download-time-calculator',
    category: 'tech',
    icon: '⬇️',
    color: '#F59E0B',
    inputs: [
      {
        key: 'fileSize',
        label: 'File Size',
        type: 'number',
        defaultValue: 1000,
        min: 1,
        max: 1000000,
        step: 1,
        required: true,
        unit: 'MB'
      },
      {
        key: 'connectionSpeed',
        label: 'Internet Speed',
        type: 'number',
        defaultValue: 100,
        min: 0.1,
        max: 10000,
        step: 0.1,
        required: true,
        unit: 'Mbps'
      },
      {
        key: 'connectionType',
        label: 'Connection Type',
        type: 'select',
        defaultValue: 'broadband',
        required: false,
        options: [
          { value: 'dialup', label: 'Dial-up (56 Kbps)' },
          { value: '3g', label: '3G (2 Mbps)' },
          { value: '4g', label: '4G LTE (20 Mbps)' },
          { value: '5g', label: '5G (100 Mbps)' },
          { value: 'broadband', label: 'Broadband' },
          { value: 'fiber', label: 'Fiber (1 Gbps)' },
          { value: 'custom', label: 'Custom Speed' }
        ]
      },
      {
        key: 'overhead',
        label: 'Network Overhead',
        type: 'slider',
        defaultValue: 20,
        min: 0,
        max: 50,
        step: 5,
        required: false,
        unit: '%',
        tooltip: 'Protocol overhead and inefficiency'
      },
      {
        key: 'simultaneousDownloads',
        label: 'Simultaneous Downloads',
        type: 'number',
        defaultValue: 1,
        min: 1,
        max: 10,
        step: 1,
        required: false
      }
    ],
    outputs: [
      {
        key: 'downloadTime',
        label: 'Download Time',
        format: 'text',
        description: 'Time to complete',
        highlight: true
      },
      {
        key: 'downloadTimeSeconds',
        label: 'Time in Seconds',
        format: 'number',
        decimals: 1,
        unit: 'seconds',
        description: 'Exact duration'
      },
      {
        key: 'effectiveSpeed',
        label: 'Effective Speed',
        format: 'number',
        decimals: 2,
        unit: 'MB/s',
        description: 'Actual transfer rate'
      },
      {
        key: 'dataPerMinute',
        label: 'Data per Minute',
        format: 'number',
        decimals: 2,
        unit: 'MB',
        description: 'Transfer rate'
      },
      {
        key: 'progressEstimate',
        label: 'Progress Timeline',
        format: 'text',
        description: 'Download milestones'
      }
    ],
    formulas: [
      {
        key: 'calculate',
        expression: `
          // Set speed based on connection type
          let actualSpeed = connectionSpeed;
          
          if (connectionType === 'dialup') actualSpeed = 0.056;
          else if (connectionType === '3g') actualSpeed = 2;
          else if (connectionType === '4g') actualSpeed = 20;
          else if (connectionType === '5g') actualSpeed = 100;
          else if (connectionType === 'fiber') actualSpeed = 1000;
          
          // Apply overhead
          const effectiveSpeedMbps = actualSpeed * (1 - overhead / 100);
          
          // Account for simultaneous downloads
          const speedPerDownload = effectiveSpeedMbps / simultaneousDownloads;
          
          // Convert to MB/s (divide by 8 for bits to bytes)
          const effectiveSpeed = speedPerDownload / 8;
          
          // Calculate download time in seconds
          const downloadTimeSeconds = fileSize / effectiveSpeed;
          
          // Format download time
          let downloadTime = '';
          if (downloadTimeSeconds < 1) {
            downloadTime = 'Less than 1 second';
          } else if (downloadTimeSeconds < 60) {
            downloadTime = Math.round(downloadTimeSeconds) + ' seconds';
          } else if (downloadTimeSeconds < 3600) {
            const minutes = Math.floor(downloadTimeSeconds / 60);
            const seconds = Math.round(downloadTimeSeconds % 60);
            downloadTime = minutes + ' min ' + seconds + ' sec';
          } else if (downloadTimeSeconds < 86400) {
            const hours = Math.floor(downloadTimeSeconds / 3600);
            const minutes = Math.round((downloadTimeSeconds % 3600) / 60);
            downloadTime = hours + ' hours ' + minutes + ' min';
          } else {
            const days = Math.floor(downloadTimeSeconds / 86400);
            const hours = Math.round((downloadTimeSeconds % 86400) / 3600);
            downloadTime = days + ' days ' + hours + ' hours';
          }
          
          // Data per minute
          const dataPerMinute = effectiveSpeed * 60;
          
          // Progress timeline
          let progressEstimate = '';
          if (downloadTimeSeconds < 60) {
            progressEstimate = '25% in ' + Math.round(downloadTimeSeconds * 0.25) + 's, 50% in ' + 
                              Math.round(downloadTimeSeconds * 0.5) + 's, 75% in ' + 
                              Math.round(downloadTimeSeconds * 0.75) + 's';
          } else if (downloadTimeSeconds < 3600) {
            progressEstimate = '25% in ' + Math.round(downloadTimeSeconds * 0.25 / 60) + ' min, 50% in ' + 
                              Math.round(downloadTimeSeconds * 0.5 / 60) + ' min, 75% in ' + 
                              Math.round(downloadTimeSeconds * 0.75 / 60) + ' min';
          } else {
            progressEstimate = '25% in ' + (downloadTimeSeconds * 0.25 / 3600).toFixed(1) + ' hrs, 50% in ' + 
                              (downloadTimeSeconds * 0.5 / 3600).toFixed(1) + ' hrs, 75% in ' + 
                              (downloadTimeSeconds * 0.75 / 3600).toFixed(1) + ' hrs';
          }
          
          return {
            downloadTime,
            downloadTimeSeconds,
            effectiveSpeed,
            dataPerMinute,
            progressEstimate
          };
        `,
        description: 'Calculate file download time based on connection speed'
      }
    ],
    localizedContent: {
      en: {
        title: 'Download Time Calculator',
        description: 'Calculate how long it takes to download files based on internet speed',
        keywords: ['download time calculator', 'file download', 'internet speed', 'download calculator', 'transfer time'],
        faq: [
          {
            question: 'Why is actual speed lower than advertised?',
            answer: 'ISPs advertise maximum speeds. Actual speeds are affected by network congestion, distance from server, protocol overhead (10-30%), and WiFi limitations.'
          },
          {
            question: 'Mbps vs MB/s?',
            answer: 'Mbps = Megabits per second (ISP speed). MB/s = Megabytes per second (file transfer). 1 MB/s = 8 Mbps. Divide Mbps by 8 for MB/s.'
          },
          {
            question: 'How to speed up downloads?',
            answer: 'Use wired connection, close other apps, download during off-peak hours, use download manager, choose nearby servers, upgrade internet plan.'
          }
        ],
        article: {
          title: 'Understanding Download Speeds',
          introduction: 'Download time depends on file size, connection speed, and network conditions.',
          sections: [
            {
              heading: 'Speed Factors',
              content: 'ISP throttling, network congestion, server limitations, WiFi vs ethernet, device capabilities, concurrent usage all affect actual speeds.'
            },
            {
              heading: 'Optimizing Downloads',
              content: 'Schedule large downloads overnight, use download managers for resumability, choose optimal servers, consider compression for faster transfers.'
            }
          ],
          conclusion: 'Understanding real-world speeds helps set realistic expectations for download times.',
          wordCount: 280
        }
      }
    }
  }
];

// Export function to get all tech calculators
export function getTechCalculators(): Calculator[] {
  return techCalculators;
}

// Export function to get calculator by slug
export function getTechCalculatorBySlug(slug: string): Calculator | undefined {
  return techCalculators.find(calc => calc.slug === slug);
}
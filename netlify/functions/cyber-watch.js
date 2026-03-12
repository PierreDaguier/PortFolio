const CISA_KEV_URL = 'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json';
const NVD_RECENT_URL = 'https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=36';
const CYBER_MEDIA_FEEDS = [
  {
    source: 'The Hacker News',
    url: 'https://feeds.feedburner.com/TheHackersNews'
  },
  {
    source: 'BleepingComputer',
    url: 'https://www.bleepingcomputer.com/feed/'
  },
  {
    source: 'Krebs on Security',
    url: 'https://krebsonsecurity.com/feed/'
  }
];
const REQUEST_TIMEOUT_MS = 8000;

const fetchWithTimeout = async (url, responseType) => {
  const abortController = new AbortController();
  const timeout = setTimeout(() => abortController.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: abortController.signal,
      headers: {
        'User-Agent': 'pierredaguier-portfolio-cyber-watch'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    if (responseType === 'text') {
      return await response.text();
    }

    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
};

const toIsoDate = (value) => {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? '' : parsed.toISOString();
};

const decodeHtmlEntities = (text) => {
  if (!text) {
    return '';
  }

  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ');
};

const cleanText = (text) => {
  return decodeHtmlEntities(text)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const pickTagValue = (block, tagName) => {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = block.match(regex);
  return cleanText(match?.[1] || '');
};

const parseRssItems = (xml, source) => {
  const itemBlocks = xml.match(/<item\b[\s\S]*?<\/item>/gi) || [];

  return itemBlocks
    .map((itemBlock, index) => {
      const title = pickTagValue(itemBlock, 'title');
      const link = pickTagValue(itemBlock, 'link');
      const description = pickTagValue(itemBlock, 'description') || pickTagValue(itemBlock, 'content:encoded');
      const publishedRaw =
        pickTagValue(itemBlock, 'pubDate') ||
        pickTagValue(itemBlock, 'dc:date') ||
        pickTagValue(itemBlock, 'published');

      if (!title || !link) {
        return null;
      }

      const idBase = link || `${source}-${index}`;
      return {
        id: idBase,
        title,
        summary: description || 'No summary provided by source.',
        source,
        publishedAt: toIsoDate(publishedRaw),
        url: link
      };
    })
    .filter(Boolean);
};

const getRecentArticles = async () => {
  const feedResults = await Promise.allSettled(
    CYBER_MEDIA_FEEDS.map(async (feed) => {
      const xml = await fetchWithTimeout(feed.url, 'text');
      return parseRssItems(xml, feed.source).slice(0, 4);
    })
  );

  const merged = feedResults
    .filter((result) => result.status === 'fulfilled')
    .flatMap((result) => result.value);

  const byUrl = new Map();
  merged.forEach((item) => {
    if (!byUrl.has(item.url)) {
      byUrl.set(item.url, item);
    }
  });

  return Array.from(byUrl.values())
    .sort((first, second) => {
      const firstDate = first.publishedAt ? new Date(first.publishedAt).getTime() : 0;
      const secondDate = second.publishedAt ? new Date(second.publishedAt).getTime() : 0;
      return secondDate - firstDate;
    })
    .slice(0, 3);
};

const englishDescription = (cve) => {
  const descriptions = cve?.descriptions || [];
  const english = descriptions.find((item) => item.lang === 'en');
  return (english?.value || '').trim();
};

const nvdSeverity = (cve) => {
  const metrics = cve?.metrics || {};
  const metricGroups = ['cvssMetricV40', 'cvssMetricV31', 'cvssMetricV30', 'cvssMetricV2'];

  for (const group of metricGroups) {
    const entries = metrics[group];
    if (Array.isArray(entries) && entries.length > 0) {
      const firstEntry = entries[0];
      const severity = firstEntry?.cvssData?.baseSeverity || firstEntry?.baseSeverity;
      if (severity) {
        return String(severity).toUpperCase();
      }
    }
  }

  return 'UNKNOWN';
};

const mapNvdItems = (payload) => {
  const vulnerabilities = payload?.vulnerabilities || [];

  return vulnerabilities
    .map((entry) => {
      const cve = entry?.cve;
      const id = cve?.id;

      if (!id) {
        return null;
      }

      return {
        id,
        title: id,
        summary: englishDescription(cve) || 'No description provided by source.',
        source: 'NVD',
        severity: nvdSeverity(cve),
        publishedAt: toIsoDate(cve?.published),
        url: `https://nvd.nist.gov/vuln/detail/${id}`
      };
    })
    .filter(Boolean);
};

const mapKevItems = (payload) => {
  const vulnerabilities = payload?.vulnerabilities || [];

  return vulnerabilities
    .slice(0, 50)
    .map((entry) => {
      const id = entry?.cveID;
      if (!id) {
        return null;
      }

      const vendor = entry?.vendorProject || 'Unknown vendor';
      const product = entry?.product || 'Unknown product';
      const vulnName = entry?.vulnerabilityName || 'Known exploited vulnerability';
      const ransomwareUse = String(entry?.knownRansomwareCampaignUse || '').toLowerCase();

      return {
        id,
        title: `${vendor} ${product} · ${vulnName}`,
        summary: entry?.shortDescription || vulnName,
        source: 'CISA KEV',
        severity: ransomwareUse === 'known' ? 'CRITICAL' : 'EXPLOITED',
        publishedAt: toIsoDate(entry?.dateAdded),
        url: `https://nvd.nist.gov/vuln/detail/${id}`
      };
    })
    .filter(Boolean);
};

const mergeVulnerabilities = (kevItems, nvdItems) => {
  const byId = new Map();

  nvdItems.forEach((item) => {
    byId.set(item.id, item);
  });

  kevItems.forEach((kevItem) => {
    const previous = byId.get(kevItem.id);

    if (!previous) {
      byId.set(kevItem.id, kevItem);
      return;
    }

    byId.set(kevItem.id, {
      ...previous,
      ...kevItem,
      summary: kevItem.summary || previous.summary,
      source: 'CISA KEV + NVD',
      severity: kevItem.severity || previous.severity,
      publishedAt: kevItem.publishedAt || previous.publishedAt,
      url: kevItem.url || previous.url
    });
  });

  return Array.from(byId.values())
    .sort((first, second) => {
      const firstDate = first.publishedAt ? new Date(first.publishedAt).getTime() : 0;
      const secondDate = second.publishedAt ? new Date(second.publishedAt).getTime() : 0;
      return secondDate - firstDate;
    })
    .slice(0, 3);
};

export async function handler() {
  try {
    const [articles, kevResult, nvdResult] = await Promise.all([
      getRecentArticles(),
      fetchWithTimeout(CISA_KEV_URL, 'json').catch(() => null),
      fetchWithTimeout(NVD_RECENT_URL, 'json').catch(() => null)
    ]);

    const kevItems = mapKevItems(kevResult);
    const nvdItems = mapNvdItems(nvdResult);
    const vulnerabilities = mergeVulnerabilities(kevItems, nvdItems);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=900'
      },
      body: JSON.stringify({
        generatedAt: new Date().toISOString(),
        sourceHealth: {
          articleCount: articles.length,
          cisaKevCount: kevItems.length,
          nvdCount: nvdItems.length,
          cisaKevAvailable: Boolean(kevResult),
          nvdAvailable: Boolean(nvdResult)
        },
        articles,
        vulnerabilities
      })
    };
  } catch (error) {
    return {
      statusCode: 502,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store'
      },
      body: JSON.stringify({
        generatedAt: new Date().toISOString(),
        error: 'Cyber watch aggregation failed.',
        detail: error.message
      })
    };
  }
}

const CISA_KEV_URL = 'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json';
const NVD_RECENT_URL = 'https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=24';
const REQUEST_TIMEOUT_MS = 8000;

const withTimeout = async (url) => {
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

    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
};

const toIsoDate = (value) => {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? '' : parsed.toISOString();
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
    .slice(0, 40)
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

const mergeFeedItems = (kevItems, nvdItems) => {
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
    .slice(0, 14);
};

export async function handler() {
  try {
    const [kevPayload, nvdPayload] = await Promise.all([
      withTimeout(CISA_KEV_URL),
      withTimeout(NVD_RECENT_URL)
    ]);

    const kevItems = mapKevItems(kevPayload);
    const nvdItems = mapNvdItems(nvdPayload);
    const items = mergeFeedItems(kevItems, nvdItems);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=0, s-maxage=1800, stale-while-revalidate=21600'
      },
      body: JSON.stringify({
        generatedAt: new Date().toISOString(),
        sourceHealth: {
          cisaKevCount: kevItems.length,
          nvdCount: nvdItems.length
        },
        items
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

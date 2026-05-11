<?xml version="1.0" encoding="UTF-8"?>
<!--
  rss.xsl — browser-only styling for /rss.xml.

  Feed readers ignore this <?xml-stylesheet ?> directive and parse the raw
  RSS. Browsers that support XSLT (Chrome, Firefox, Safari, Edge) render
  this template, turning the feed into a styled HTML page.

  Design matches the site's dark theme (Inter + Playfair Display, accent
  green #34d399). Tokens are hardcoded — XSL has no access to the site's CSS.
-->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"
    doctype-system="about:legacy-compat" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title><xsl:value-of select="rss/channel/title" /> — RSS Feed</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Playfair+Display:wght@500;600&amp;display=swap" />
        <style>
          :root {
            --bg: #000000;
            --card: #0a0a0a;
            --border: #1f1f1f;
            --accent: #34d399;
            --accent-dim: rgba(52, 211, 153, 0.15);
            --text: #fafafa;
            --text-2: #a1a1aa;
            --text-3: #71717a;
            --serif: 'Playfair Display', Georgia, serif;
            --sans: Inter, -apple-system, sans-serif;
          }

          * { box-sizing: border-box; margin: 0; padding: 0; }

          body {
            background: var(--bg);
            color: var(--text);
            font-family: var(--sans);
            line-height: 1.6;
            min-height: 100vh;
            padding: 4rem 1.5rem;
          }

          .wrap {
            max-width: 720px;
            margin: 0 auto;
          }

          .pill {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.4rem 0.9rem;
            border-radius: 999px;
            background: var(--accent-dim);
            border: 1px solid var(--accent);
            color: var(--accent);
            font-size: 0.75rem;
            font-weight: 500;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            margin-bottom: 1.5rem;
          }

          .pill::before {
            content: '';
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            background: var(--accent);
            box-shadow: 0 0 8px var(--accent);
          }

          h1 {
            font-family: var(--serif);
            font-size: 2.5rem;
            font-weight: 600;
            letter-spacing: -0.02em;
            margin-bottom: 0.75rem;
            line-height: 1.1;
          }

          .lede {
            color: var(--text-2);
            font-size: 1.1rem;
            margin-bottom: 2rem;
            max-width: 60ch;
          }

          .subscribe {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 0.75rem;
            padding: 1.25rem 1.5rem;
            margin-bottom: 3rem;
          }

          .subscribe h2 {
            font-family: var(--sans);
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--text);
            margin-bottom: 0.5rem;
            letter-spacing: 0.02em;
          }

          .subscribe p {
            color: var(--text-2);
            font-size: 0.9rem;
            margin-bottom: 0.75rem;
          }

          .feed-url {
            display: block;
            font-family: ui-monospace, 'SF Mono', Monaco, monospace;
            font-size: 0.85rem;
            color: var(--accent);
            background: var(--bg);
            border: 1px solid var(--border);
            padding: 0.6rem 0.85rem;
            border-radius: 0.4rem;
            word-break: break-all;
            text-decoration: none;
          }

          .feed-url:hover { border-color: var(--accent); }

          .meta {
            color: var(--text-3);
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            margin-bottom: 1rem;
            padding-bottom: 0.75rem;
            border-bottom: 1px solid var(--border);
          }

          .post {
            padding: 1.5rem 0;
            border-bottom: 1px solid var(--border);
          }

          .post:last-child { border-bottom: none; }

          .post h3 {
            font-family: var(--serif);
            font-size: 1.5rem;
            font-weight: 500;
            margin-bottom: 0.5rem;
            line-height: 1.3;
          }

          .post h3 a {
            color: var(--text);
            text-decoration: none;
            transition: color 0.2s;
          }

          .post h3 a:hover { color: var(--accent); }

          .post .date {
            color: var(--text-3);
            font-size: 0.8rem;
            margin-bottom: 0.5rem;
          }

          .post .description {
            color: var(--text-2);
            font-size: 0.95rem;
          }

          .footer {
            margin-top: 4rem;
            padding-top: 2rem;
            border-top: 1px solid var(--border);
            color: var(--text-3);
            font-size: 0.85rem;
            text-align: center;
          }

          .footer a {
            color: var(--text-2);
            text-decoration: none;
          }

          .footer a:hover { color: var(--accent); }

          @media (max-width: 600px) {
            body { padding: 2rem 1rem; }
            h1 { font-size: 1.875rem; }
            .lede { font-size: 1rem; }
          }
        </style>
      </head>
      <body>
        <div class="wrap">
          <span class="pill">RSS Feed · Subscribe</span>

          <h1><xsl:value-of select="rss/channel/title" /></h1>

          <p class="lede"><xsl:value-of select="rss/channel/description" /></p>

          <div class="subscribe">
            <h2>This is a feed, not a webpage.</h2>
            <p>
              Paste the URL below into your feed reader (Feedly, NetNewsWire, Inoreader,
              or any reader that supports RSS) to get new posts delivered.
            </p>
            <a class="feed-url" href="/rss.xml">
              <xsl:value-of select="rss/channel/link" />/rss.xml
            </a>
          </div>

          <p class="meta">
            <xsl:value-of select="count(rss/channel/item)" /> posts
          </p>

          <xsl:for-each select="rss/channel/item">
            <article class="post">
              <h3>
                <a>
                  <xsl:attribute name="href"><xsl:value-of select="link" /></xsl:attribute>
                  <xsl:value-of select="title" />
                </a>
              </h3>
              <p class="date">
                <xsl:value-of select="substring(pubDate, 1, 16)" />
              </p>
              <p class="description"><xsl:value-of select="description" /></p>
            </article>
          </xsl:for-each>

          <div class="footer">
            <p>
              ← <a href="/">Back to drdavidreed.com</a> ·
              <a href="/blog/">Visit the writing index</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

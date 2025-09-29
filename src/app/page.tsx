'use client';
import React, { useEffect, useState } from 'react';

type Feed = {
  title: string;
  xmlUrl: string;
  htmlUrl?: string;
  notes?: string;
}

type Category = {
  category: string;
  feeds: Feed[];
}

export default function App() {
  const [data, setData] = useState<Category[]>([]);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [opml, setOpml] = useState('');

  useEffect(() => {
    fetch('/feeds.json')
      .then(res => {
        if (!res.ok) throw new Error('feeds.json not found');
        return res.json();
      })
      .then((json: Category[]) => setData(json))
      .catch(err => {
        console.error(err);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const feedKey = (c: string, f: Feed) => `${c}||${f.xmlUrl}`;

  const toggleFeed = (c: string, f: Feed) => {
    const k = feedKey(c, f);
    setSelected(s => ({ ...s, [k]: !s[k] }));
  };

  const selectAllCategory = (c: string, value: boolean) => {
    const updates: Record<string, boolean> = {};
    const category = data.find(x => x.category === c);
    if (!category) return;
    category.feeds.forEach(f => updates[feedKey(c, f)] = value);
    setSelected(s => ({ ...s, ...updates }));
  };

  const getSelectedFeeds = (): { category: string; feed: Feed }[] => {
    const out: { category: string; feed: Feed }[] = [];
    data.forEach(cat => {
      cat.feeds.forEach(f => {
        if (selected[feedKey(cat.category, f)]) out.push({ category: cat.category, feed: f});
      });
    });
    return out;
  };

  const generateOpml = () => {
    const picks = getSelectedFeeds();
    const header = `<?xml version="1.0" encoding="UTF-8"?>\n<opml version="1.0">\n  <head>\n    <title>rss-cse-picker export</title>\n    <dateCreated>${new Date().toUTCString()}</dateCreated>\n  </head>\n  <body>\n`;
    const footer = '  </body>\n</opml>\n';

    // group selected by category
    const grouped: Record<string, Feed[]> = {};
    picks.forEach(p => {
      if (!grouped[p.category]) grouped[p.category] = [];
      grouped[p.category].push(p.feed);
    });

    const body = Object.keys(grouped).map(cat => {
      const items = grouped[cat].map(f => {
        const esc = (s?: string) => (s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return `      <outline type="rss" text="${esc(f.title)}" title="${esc(f.title)}" xmlUrl="${esc(f.xmlUrl)}" htmlUrl="${esc(f.htmlUrl)}"/>`;
      }).join('\n');
      return `    <outline text="${cat}" title="${cat}">\n${items}\n    </outline>`;
    }).join('\n');

    const result = header + body + '\n' + footer;
    setOpml(result);
    return result;
  };

  const copyToClipboard = async () => {
    const text = opml || generateOpml();
    try {
      await navigator.clipboard.writeText(text);
      alert('OPML copied to clipboard');
    } catch (e) {
      alert('Failed to copy OPML: ' + e);
    }
  };

  const downloadOpml = () => {
    const text = opml || generateOpml();
    const blob = new Blob([text], { type: 'text/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rss-cse-picker.opml';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="p-6">Loading feeds...</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">rss-cse-picker</h1>
          <a href="#" className="text-sm underline">Edit feeds.xlsx → convert → commit</a>
        </header>

        <section>
          {data.map((cat) => (
            <div key={cat.category} className="mb-6 bg-slate-800 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold">{cat.category}</h2>
                <div className="space-x-2">
                  <button onClick={() => selectAllCategory(cat.category, true)} className="px-3 py-1 rounded bg-green-600 text-sm">Select all</button>
                  <button onClick={() => selectAllCategory(cat.category, false)} className="px-3 py-1 rounded bg-red-600 text-sm">Clear</button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {cat.feeds.map(f => {
                  const k = feedKey(cat.category, f);
                  return (
                    <label key={k} className={`flex items-start gap-3 p-2 rounded ${selected[k] ? 'bg-slate-700' : 'bg-slate-800'}`}>
                      <input type="checkbox" checked={!!selected[k]} onChange={() => toggleFeed(cat.category, f)} />
                      <div>
                        <div className="font-medium">{f.title || f.xmlUrl}</div>
                        <div className="text-xs text-slate-400">{f.htmlUrl || f.xmlUrl}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        <div className="mt-6 flex gap-3">
          <button onClick={generateOpml} className="px-4 py-2 bg-indigo-600 rounded font-semibold">Generate OPML</button>
          <button onClick={copyToClipboard} className="px-4 py-2 bg-blue-600 rounded">Copy OPML</button>
          <button onClick={downloadOpml} className="px-4 py-2 bg-emerald-600 rounded">Download OPML</button>
        </div>

        <div className="mt-6">
          <textarea value={opml} readOnly rows={14} className="w-full bg-slate-900 border border-slate-700 p-3 rounded font-mono"></textarea>
        </div>
      </div>
    </div>
  );
}

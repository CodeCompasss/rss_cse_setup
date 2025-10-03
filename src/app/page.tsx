'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
  const [filteredData, setFilteredData] = useState<Category[]>([]);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [opml, setOpml] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/feeds.json')
      .then(res => {
        if (!res.ok) throw new Error('feeds.json not found');
        return res.json();
      })
      .then((json: Category[]) => {
        setData(json);
        setFilteredData(json);
      })
      .catch(err => {
        console.error(err);
        setData([]);
        setFilteredData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter data based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredData(data);
    } else {
      const filtered = data.map(category => ({
        ...category,
        feeds: category.feeds.filter(feed =>
          feed.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          feed.xmlUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (feed.htmlUrl && feed.htmlUrl.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      })).filter(category => category.feeds.length > 0);
      setFilteredData(filtered);
    }
  }, [data, searchQuery]);

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

  const handleAddNew = () => {
    // Placeholder for Google Form integration
    window.open('https://forms.google.com', '_blank');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (loading) return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col">
      <Navbar title="RSS CSE Setup" onAddNew={handleAddNew} onSearch={handleSearch} />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg mb-2">Loading feeds...</div>
          <div className="animate-spin text-2xl">⏳</div>
        </div>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col transition-colors duration-300">
      <Navbar title="RSS CSE Setup" onAddNew={handleAddNew} onSearch={handleSearch} />
      
      <main className="flex-1 w-full px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-lg text-gray-400 mb-4">
            Select RSS feeds from various Computer Science and Engineering categories to generate your OPML file.
          </p>
          {searchQuery && (
            <p className="text-sm text-gray-500 mt-2">
              Showing results for: "{searchQuery}"
            </p>
          )}
        </div>

        <section>
          {filteredData.length === 0 && searchQuery ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No feeds found matching "{searchQuery}"</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your search terms</p>
            </div>
          ) : (
            filteredData.map((cat) => (
            <div key={cat.category} className="mb-6 bg-[var(--card-bg)] p-4 rounded-lg shadow-lg border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold text-[var(--foreground)]">{cat.category}</h2>
                <div className="space-x-2">
                  <button 
                    onClick={() => selectAllCategory(cat.category, true)} 
                    className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-colors"
                  >
                    Select all
                  </button>
                  <button 
                    onClick={() => selectAllCategory(cat.category, false)} 
                    className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
                {cat.feeds.map(f => {
                  const k = feedKey(cat.category, f);
                  return (
                    <label 
                      key={k} 
                      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        selected[k] 
                          ? 'bg-indigo-600/20 border border-indigo-500' 
                          : 'bg-[var(--button-bg)] hover:bg-gray-600 border border-transparent'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        checked={!!selected[k]} 
                        onChange={() => toggleFeed(cat.category, f)}
                        className="mt-1 w-4 h-4 accent-indigo-500"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-[var(--foreground)] truncate">{f.title || f.xmlUrl}</div>
                        <div className="text-xs text-gray-400 truncate">{f.htmlUrl || f.xmlUrl}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
            ))
          )}
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <button 
            onClick={generateOpml} 
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold rounded-full shadow-lg transition duration-300"
          >
            Generate OPML
          </button>
          <button 
            onClick={copyToClipboard} 
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-full shadow-lg transition duration-300"
          >
            Copy OPML
          </button>
          <button 
            onClick={downloadOpml} 
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-full shadow-lg transition duration-300"
          >
            Download OPML
          </button>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3 text-[var(--foreground)]">Generated OPML:</h3>
          <textarea 
            value={opml} 
            readOnly 
            rows={8} 
            className="w-full bg-[var(--card-bg)] text-[var(--foreground)] border border-gray-600 rounded-lg p-4 font-mono resize-none transition-colors duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Generated OPML will appear here..."
          />
        </div>
      </main>
      
      <Footer 
        githubUrl="https://github.com/your-username/rss-cse-setup"
        linkedinUrl="https://linkedin.com/in/your-profile"
        codeCompassUrl="https://codecompass.com/your-profile"
      />
    </div>
  );
}


# rss_cse_picker  

## Overview  

**rss_cse_picker** is a simple service that provides a ready-to-use OPML file containing curated RSS/Atom feeds.  
Users don’t need to worry about JSON, Excel, or conversions — they can directly **download the OPML file** and import it into any feed reader (like Feedly, Inoreader, or Thunderbird).  

For developers and contributors, feeds are maintained in an Excel file (`feeds.xlsx`) and converted into OPML using a Node.js script.  

## For Users  

- Just download the **OPML file** from the releases/download section.  
- Import it into your favorite RSS reader.  
- Done ✅ — you’re subscribed to all curated feeds.  

## For Contributors / Developers  

If you want to add or improve feeds:  

1. **Edit `feeds.xlsx`**  
   - Required columns:  
     - `category` – grouping label (e.g., AI, WebDev, CSE)  
     - `title` – name of the site/blog  
     - `xmlUrl` – RSS/Atom feed link  
   - *(optional)* `htmlUrl` – human-facing blog link  

2. **Run the Converter**  
   ```bash
   node convertExcelToJson.js
   ```  
   This produces a `feeds.json`.  

3. **Generate OPML**  
   Another script transforms `feeds.json` into an `feeds.opml` file that can be shared with end-users.  

📄 A separate `CONTRIBUTING.docx` is included with step-by-step instructions for developers.  

## Why This Project  

- **For users**: Instant OPML, no setup needed.  
- **For maintainers**: Easy feed management in Excel.  
- **For developers**: Simple contribution workflow via JSON/Excel.  

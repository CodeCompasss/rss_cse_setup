
# Contributing to RSS CSE Setup

Thank you for considering contributing to the **RSS CSE Setup** project! We're excited to have you help expand our curated collection of Computer Science and Engineering RSS feeds. This guide will walk you through the entire contribution process.

## Table of Contents

- [Contributing to RSS CSE Setup](#contributing-to-rss-cse-setup)
  - [Table of Contents](#table-of-contents)
  - [Quick Start for Contributors](#quick-start-for-contributors)
  - [How to Add New RSS Feeds](#how-to-add-new-rss-feeds)
    - [Step 1: Prepare Your Feed Information](#step-1-prepare-your-feed-information)
    - [Step 2: Edit the Excel File](#step-2-edit-the-excel-file)
    - [Step 3: Convert Excel to JSON](#step-3-convert-excel-to-json)
    - [Step 4: Test Your Changes](#step-4-test-your-changes)
    - [Step 5: Submit Your Contribution](#step-5-submit-your-contribution)
  - [Feed Quality Guidelines](#feed-quality-guidelines)
  - [Development Workflow](#development-workflow)
  - [Troubleshooting](#troubleshooting)

## Quick Start for Contributors

**New to RSS feed contribution?** Here's the fastest way to get started:

1. **Find a great engineering blog** with an RSS feed
2. **Open `public/feeds.xlsx`** in Excel or Google Sheets
3. **Add a new row** with the feed information
4. **Run `node convertExcelToJson.js`** to generate the JSON
5. **Test locally** with `npm run dev`
6. **Submit a Pull Request**

## How to Add New RSS Feeds

### Step 1: Prepare Your Feed Information

Before adding feeds to the Excel file, gather the following information:

**Required Information:**
- **RSS/Atom Feed URL**: The direct link to the XML feed (usually ends in `.xml`, `.rss`, or `/feed`)
- **Blog/Site Title**: The official name of the blog or publication
- **Category**: Which category best fits this feed (see [Category Guidelines](#category-guidelines))

**Optional Information:**
- **Website URL**: The main homepage of the blog
- **Description**: Brief note about the content focus

**How to Find RSS Feeds:**
- Look for RSS icons (📡) on websites
- Check common URLs: `/feed`, `/rss`, `/atom.xml`, `/feed.xml`
- Use browser extensions like "RSS Feed Finder"
- Check the website's footer or "Subscribe" sections

### Step 2: Edit the Excel File

1. **Open the file**: Navigate to `public/feeds.xlsx`
2. **Choose your editor**: 
   - Microsoft Excel
   - Google Sheets (upload the file)
   - LibreOffice Calc
   - Any spreadsheet application

3. **Add your feed data** in a new row:

| Column | Required | Description | Example |
|--------|----------|-------------|---------|
| `category` | ✅ Yes | Feed category | "Engineering Blogs" |
| `title` | ✅ Yes | Blog/site name | "Netflix Tech Blog" |
| `xmlUrl` | ✅ Yes | RSS/Atom feed URL | "https://netflixtechblog.com/feed" |
| `htmlUrl` | ❌ Optional | Website homepage | "https://netflixtechblog.com" |
| `notes` | ❌ Optional | Brief description | "Netflix engineering insights and culture" |

**Example Entry:**
```
category: Engineering Blogs
title: Spotify Engineering
xmlUrl: https://engineering.atspotify.com/feed/
htmlUrl: https://engineering.atspotify.com/
notes: Music streaming technology and engineering culture
```

### Step 3: Convert Excel to JSON

After editing the Excel file, convert it to JSON format:

```bash
# Navigate to the project root directory
cd rss_cse_setup

# Run the conversion script
node convertExcelToJson.js
```

**What this does:**
- Reads `public/feeds.xlsx`
- Converts data to structured JSON format
- Outputs `public/feeds.json`
- Groups feeds by category
- Validates required fields

**Expected output:**
```
Wrote public/feeds.json
```

### Step 4: Test Your Changes

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser** to `http://localhost:3000`

3. **Verify your additions:**
   - Check that new feeds appear in the correct category
   - Test the search functionality with your feed titles
   - Select your feeds and generate an OPML to ensure they work
   - Verify all links are clickable and functional

4. **Test OPML generation:**
   - Select some feeds including your new ones
   - Click "Generate OPML"
   - Download the OPML file
   - Try importing it into an RSS reader to confirm it works

### Step 5: Submit Your Contribution

1. **Fork the repository** on GitHub

2. **Clone your fork:**
   ```bash
   git clone https://github.com/yourusername/rss_cse_setup.git
   cd rss_cse_setup
   ```

3. **Create a feature branch:**
   ```bash
   git checkout -b add-feeds-[category-name]
   # Example: git checkout -b add-feeds-ai-blogs
   ```

4. **Make your changes** (Excel edit + JSON conversion)

5. **Commit your changes:**
   ```bash
   git add public/feeds.xlsx public/feeds.json
   git commit -m "Add [X] new feeds to [Category] category
   
   - Added [Feed Name 1]: [Brief description]
   - Added [Feed Name 2]: [Brief description]"
   ```

6. **Push to your fork:**
   ```bash
   git push origin add-feeds-[category-name]
   ```

7. **Create a Pull Request** with:
   - Clear title describing what you added
   - List of feeds added with brief descriptions
   - Any notes about the feeds or category choices

## Feed Quality Guidelines

### ✅ Good Feeds Include:
- **Regular updates** (at least monthly)
- **High-quality technical content**
- **Relevant to CS/Engineering** topics
- **Well-maintained** websites
- **Working RSS/Atom feeds**
- **English content** (primary focus)

### ✅ Preferred Content Types:
- Engineering team blogs from tech companies
- Individual developer blogs with consistent quality
- Open source project blogs
- Technical publications and magazines
- Conference and event feeds
- Educational institution CS departments

### ❌ Avoid These Feeds:
- Inactive blogs (no posts in 6+ months)
- Marketing-heavy content with little technical value
- Feeds that frequently break or change URLs
- Non-English content (unless exceptional quality)
- Personal blogs with inconsistent posting
- Feeds with paywalled content

### Category Naming Guidelines:
- Use clear, descriptive names
- Keep names concise (2-4 words max)
- Use title case (e.g., "Machine Learning", not "machine learning")
- Avoid overly specific categories (better to have broader categories with more feeds)

## Development Workflow

### Setting Up Development Environment

1. **Prerequisites:**
   - Node.js 18+ installed
   - Git installed
   - Text editor or IDE
   - Spreadsheet application (Excel, Google Sheets, etc.)

2. **Initial setup:**
   ```bash
   git clone https://github.com/yourusername/rss_cse_setup.git
   cd rss_cse_setup
   npm install
   ```

3. **Development commands:**
   ```bash
   npm run dev          # Start development server
   npm run build        # Build for production
   npm run lint         # Run code linting
   ```

### File Structure Understanding

```
rss_cse_setup/
├── public/
│   ├── feeds.xlsx          # 📊 Master feed database (EDIT THIS)
│   ├── feeds.json          # 🔄 Generated from Excel (DON'T EDIT DIRECTLY)
│   └── images/             # 🖼️ Static images and icons
├── src/
│   ├── app/
│   │   ├── page.tsx        # 🏠 Main application page
│   │   ├── layout.tsx      # 📐 App layout and metadata
│   │   └── globals.css     # 🎨 Global styles
│   ├── components/
│   │   ├── Navbar.tsx      # 🧭 Navigation component
│   │   └── Footer.tsx      # 🦶 Footer component
│   └── types/
│       └── index.ts        # 📝 TypeScript type definitions
├── convertExcelToJson.js   # 🔄 Excel to JSON converter script
├── package.json            # 📦 Dependencies and scripts
└── README.md              # 📖 Project documentation
```

## Troubleshooting

### Common Issues and Solutions

**❌ "Input file not found" error when running convertExcelToJson.js**
- **Solution**: Ensure `public/feeds.xlsx` exists and you're running the command from the project root

**❌ Feeds not appearing after adding them**
- **Solution**: Make sure you ran `node convertExcelToJson.js` after editing the Excel file
- **Check**: Verify the Excel file has the correct column names (case-sensitive)
- **Refresh**: Hard refresh the browser (Ctrl+F5 or Cmd+Shift+R)

**❌ Excel file won't open or appears corrupted**
- **Solution**: Try opening with a different spreadsheet application
- **Alternative**: Download a fresh copy from the repository

**❌ RSS feed URL doesn't work**
- **Check**: Verify the URL in a browser - it should show XML content
- **Test**: Use an online RSS validator tool
- **Alternative**: Look for alternative feed URLs on the website

**❌ Development server won't start**
- **Solution**: Ensure Node.js 18+ is installed
- **Check**: Run `npm install` to install dependencies
- **Port conflict**: Try `npm run dev -- --port 3001` to use a different port

**❌ JSON conversion produces empty or incorrect results**
- **Check**: Ensure Excel file has data in the correct columns
- **Verify**: Column names must match exactly: `category`, `title`, `xmlUrl`, `htmlUrl`, `notes`
- **Format**: Make sure there are no hidden characters or formatting issues


## Thank You!

Every contribution, no matter how small, helps make RSS CSE Setup more valuable for the developer community. Your efforts help thousands of developers stay updated with the latest in Computer Science and Engineering.

**Questions?** Feel free to open an issue or reach out to the maintainers.

**Happy contributing! 🚀**

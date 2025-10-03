# RSS CSE Setup

[![Next.js](https://img.shields.io/badge/Next.js-15.3.0-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Proprietary-red)](./LICENSE)

## Overview

**RSS CSE Setup** is a curated collection of RSS/Atom feeds from top Computer Science and Engineering blogs, companies, and thought leaders. The project provides both a modern web interface for feed selection and ready-to-use OPML files for instant import into any RSS reader.

### Key Features

- **Curated Content**: Hand-picked RSS feeds from leading engineering blogs and tech companies
- **Web Interface**: Modern, responsive UI for browsing and selecting feeds
- **Instant OPML Generation**: Generate custom OPML files with your selected feeds
- **Universal Compatibility**: Works with all major RSS readers (Feedly, Inoreader, Thunderbird, etc.)
- **Easy Maintenance**: Excel-based feed management for contributors

## For End Users

### Quick Start

1. **Visit the Web App**: Navigate to the RSS CSE Setup website
2. **Browse Categories**: Explore feeds organized by categories (Engineering Blogs, AI, Web Development, etc.)
3. **Select Feeds**: Check the boxes for feeds you want to subscribe to
4. **Generate OPML**: Click "Generate OPML" to create your custom feed collection
5. **Download**: Use "Download OPML" to save the file to your device
6. **Import**: Import the OPML file into your favorite RSS reader

### Supported RSS Readers

- **Feedly**: File → Import OPML
- **Inoreader**: Settings → Import/Export → Import from OPML
- **Thunderbird**: File → Import → Import from OPML file
- **NewsBlur**: Import → Upload OPML
- **The Old Reader**: Settings → Import → Choose OPML file
- **Most other RSS readers**: Look for "Import OPML" or "Import feeds" option

### Alternative: Direct OPML Download

If you prefer to get all curated feeds without selection:
- Download the complete OPML file from the [releases section](../../releases)
- Import directly into your RSS reader

## For Contributors & Developers

### Project Structure

```
rss_cse_setup/
├── public/
│   ├── feeds.xlsx          # Master feed database (Excel format)
│   ├── feeds.json          # Generated JSON from Excel
│   └── images/             # Static assets
├── src/
│   ├── app/                # Next.js app directory
│   ├── components/         # React components
│   └── types/              # TypeScript definitions
├── convertExcelToJson.js   # Excel to JSON converter script
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/rss_cse_setup.git
   cd rss_cse_setup
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Adding New Feeds

1. **Edit the Excel file** (`public/feeds.xlsx`)
   - **Required columns:**
     - `category` – Category name (e.g., "Engineering Blogs", "AI", "Web Development")
     - `title` – Blog/site name (e.g., "Netflix Tech Blog")
     - `xmlUrl` – RSS/Atom feed URL
   - **Optional columns:**
     - `htmlUrl` – Website homepage URL
     - `notes` – Additional notes or description

2. **Convert Excel to JSON**
   ```bash
   node convertExcelToJson.js
   ```
   This generates `public/feeds.json` from the Excel file.

3. **Test your changes**
   ```bash
   npm run dev
   ```
   Verify new feeds appear correctly in the web interface.

4. **Submit a Pull Request**
   See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

### Excel Format Example

| category | title | xmlUrl | htmlUrl | notes |
|----------|-------|--------|---------|-------|
| Engineering Blogs | Netflix Tech Blog | https://netflixtechblog.com/feed | https://netflixtechblog.com | Netflix engineering insights |
| AI | OpenAI Blog | https://openai.com/blog/rss.xml | https://openai.com/blog | Latest AI research and updates |

## Technical Details

### Feed Processing Pipeline

1. **Excel Source** (`feeds.xlsx`) → Contains all feed data in human-readable format
2. **JSON Conversion** (`convertExcelToJson.js`) → Transforms Excel to structured JSON
3. **Web Interface** → Displays feeds with category filtering and search
4. **OPML Generation** → Creates standard OPML format for RSS readers

### Scripts Available

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Custom CSS variables
- **Data Processing**: Node.js, xlsx library
- **Icons**: React Icons

### Getting Help

- 📝 [Open an issue](../../issues) for bugs or feature requests
- 💬 Check existing issues for similar problems
- 📧 Contact the maintainer for urgent matters

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines on:

- Adding new feeds and categories
- Improving the web interface
- Reporting bugs and suggesting features
- Code style and development workflow

## License

This project is proprietary software. See [LICENSE](./LICENSE) for details.

**For Contributors**: You may fork this repository and submit pull requests for the purpose of contributing code back to the project.

## Acknowledgments

- All the amazing engineering teams and bloggers who share their knowledge through RSS feeds
- The open-source community for the tools and libraries that make this project possible
- Contributors who help maintain and expand the feed collection

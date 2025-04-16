# Photo Gallery

A modern, responsive photo gallery application that allows users to search, view, and download high-quality images from the Pexels API. The app features a sleek lightbox for image previews, category filters, and a load-more functionality for seamless browsing.

## Table of Contents

- Features
- Installation
- Usage
- Technologies Used
- Project Structure
- Contributing
- License
- Contact

## Features

- **Search Functionality**: Search for images by keyword with real-time results.
- **Category Filters**: Browse images by predefined categories (Nature, City, Animals, Space) or custom search terms.
- **Responsive Gallery**: Displays images in a masonry-style grid, optimized for all screen sizes.
- **Lightbox Preview**: View images in a full-screen lightbox with zoom, download, copy link, and share-to-X options.
- **Infinite Scroll**: Load more images with a "Load More" button for continuous browsing.
- **Keyboard Navigation**: Navigate the lightbox using arrow keys and close with the Escape key.
- **No Results Handling**: Displays a friendly message when no images are found.
- **Loading Indicators**: Shows a spinner during image loading for better user experience.

## Installation

### Prerequisites

- Node.js (v14 or higher)
- A Pexels API Key

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/a7med-adel2002/photo-gallery.git
   cd photo-gallery
   ```

2. **Install Needed Packages**:

   ```bash
   npm install
   ```

   This installs the required dependencies (e.g., `express`, `cors`, `dotenv`, `node-fetch`) listed in `package.json`.

3. **Set Up Environment Variables**: Create a `.env` file in the root directory and add your Pexels API key:

   ```env
   PEXELS_API_KEY=your_pexels_api_key
   PORT=3000
   ```

4. **Run the Server**:

   ```bash
   node server.js
   ```

5. **Open the App**: Open your browser and navigate to `http://localhost:3000`.

## Usage

- **Search Images**: Enter a keyword in the search bar and press Enter or click the magnifying glass to find images.
- **Filter by Category**: Click on category buttons (e.g., Nature, City) to filter images or use a custom search term.
- **View Images**: Click an image to open it in the lightbox. Use the navigation arrows or keyboard (←/→) to browse.
- **Interact with Images**:
  - **Zoom**: Click the magnifying glass to zoom in/out.
  - **Download**: Click the download icon to save the image.
  - **Copy Link**: Copy the image URL to your clipboard.
  - **Share on X**: Share the image via a pre-filled post on X.
- **Load More**: Click the "Load More" button to fetch additional images.

## Technologies Used

- **Frontend**:
  - HTML5, CSS3, JavaScript (ES6+)
  - Font Awesome for icons
  - Poppins font (via Google Fonts)
- **Backend**:
  - Node.js
  - Express.js
  - Pexels API
  - CORS for cross-origin requests
  - node-fetch for API calls
- **Tools**:
  - Git for version control
  - npm for package management

## Project Structure

```
photo-gallery/
├── css/
│   ├── style.css         # Main stylesheet
│   ├── all.min.css       # Font Awesome icons
├── js/
│   ├── script.js         # Frontend JavaScript logic
├── images/
│   ├── search-img.jpg    # Search section background image
├── webfonts/
│   └── [font files]      # Font Awesome web fonts
├── server.js             # Backend server with Express
├── index.html            # Main HTML file
├── .env                  # Environment variables (not tracked)
├── .gitignore            # Git ignore rules for excluding files
├── package.json          # Node.js dependencies
├── LICENSE               # MIT License
└── README.md             # Project documentation
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

Please ensure your code follows the existing style and includes appropriate tests.

## License

None

## Contact

Created by Ahmed Adel

- GitHub: [a7med-adel2002](https://github.com/a7med-adel2002)
- Email: a7med.adel2002.business@gmail.com
- X: [@a7med_adel2002](https://x.com/a7med_adel2002)
- LinkedIn: [Ahmed Adel](https://www.linkedin.com/in/a7medadel2002/)

---

⭐ If you find this project useful, please give it a star on GitHub!

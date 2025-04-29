// This file provides fallback values for environment variables
// when deploying to static hosting like GitHub Pages

const config = {
  // Use environment variables if available, otherwise use these defaults
  // NOTE: For security, replace this placeholder with your actual API key only when building for production
  // Do not commit the actual API key to version control
  API_READ_ACCESS_TOKEN: import.meta.env.VITE_API_READ_ACCESS_TOKEN || "YOUR_DEFAULT_API_KEY_HERE"
};

export default config;

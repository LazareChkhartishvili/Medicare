const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Add support for vector icons and fonts
config.resolver.assetExts.push("ttf", "otf", "woff", "woff2");

// Exclude non-route files from being treated as routes
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

module.exports = config;

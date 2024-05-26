export function paddingZeroLeft(n) {
  return String(n).padStart(4, '0');
}

// https://stackoverflow.com/questions/66419471/vue-3-vite-dynamic-image-src
export function getIconAssetUrl(type) {
  const url = new URL(`../assets/icon-${type}.png`, import.meta.url).href;

  return url;
}
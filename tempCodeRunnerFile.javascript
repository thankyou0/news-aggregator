function extractBaseUrl(fullUrl) {
  const url = new URL(fullUrl);
  const params = new URLSearchParams(url.search);
  const baseUrl = params.get('url');
  return baseUrl ? new URL(baseUrl).origin : null;
}

const inputUrl = "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://timesofindia.indiatimes.com&client=NEWS_360&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL";
const baseUrl = extractBaseUrl(inputUrl);
console.log(baseUrl); // Output: https://timesofindia.indiatimes.com

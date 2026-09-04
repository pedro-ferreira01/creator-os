const APIFY_API_BASE_URL =
  "https://api.apify.com/v2";

export const apifyConfig = {
  apiBaseUrl: APIFY_API_BASE_URL,

  apiToken:
    process.env.APIFY_API_TOKEN ?? "",

  actors: {
    youtube:
      "streamers~youtube-video-downloader",

    tiktok:
      "api-ninja~tiktok-video-downloader",

    instagram:
      "eunit~instagram-video-and-reel-downloader",

    facebook:
      "easyapi~facebook-video-download",
  },
};
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/waitlist",
        destination: "/#waitlist",
        permanent: false,
      },
    ];
  },
  async headers() {
    // Digital Asset Links + Apple App Site Association must be application/json
    // (not text/html or octet-stream) for Play Console / iOS Universal Links.
    const wellKnownJsonHeaders = [
      {
        key: "Content-Type",
        value: "application/json",
      },
      {
        key: "Cache-Control",
        value: "public, max-age=300",
      },
    ];

    return [
      {
        source: "/.well-known/apple-app-site-association",
        headers: wellKnownJsonHeaders,
      },
      {
        source: "/.well-known/assetlinks.json",
        headers: wellKnownJsonHeaders,
      },
    ];
  },
};

export default nextConfig;

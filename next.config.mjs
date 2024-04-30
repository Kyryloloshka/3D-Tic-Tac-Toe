import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
};
 
export default withNextIntl(nextConfig);
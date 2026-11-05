const encabezados = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'same-origin' },
];

export default {
  poweredByHeader: false,
  serverExternalPackages: ['postgres', 'bcryptjs'],
  async headers() {
    return [{ source: '/:path*', headers: encabezados }];
  },
};

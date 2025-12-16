import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import type { Plugin } from 'vite';

function ehDevApi(): Plugin {
  return {
    name: 'eh-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';
        if (!url.startsWith('/api/eh-')) return next();
        const orgId = process.env.EH_ORG_ID;
        const token = process.env.EH_ATS_TOKEN;
        if (!orgId || !token) {
          res.statusCode = 500;
          res.setHeader('content-type', 'application/json');
          res.end(JSON.stringify({ error: 'Missing environment variables', missing: { EH_ORG_ID: !orgId, EH_ATS_TOKEN: !token } }));
          return;
        }
        try {
          const u = new URL(`http://localhost${url}`);
          if (url.startsWith('/api/eh-jobs')) {
            const pageIndex = u.searchParams.get('page_index') || '1';
            const countryCodes = (u.searchParams.get('country_codes') || '').split(',').map((x) => x.trim()).filter(Boolean);
            const departmentIds = (u.searchParams.get('department_ids') || '').split(',').map((x) => x.trim()).filter(Boolean);
            const sp = new URLSearchParams();
            if (pageIndex) sp.set('page_index', String(pageIndex));
            for (const c of countryCodes) sp.append('country_codes[]', c);
            for (const d of departmentIds) sp.append('department_ids[]', d);
            const target = `https://api.employmenthero.com/ats/api/v1/embedded/organisations/${orgId}/jobs${sp.toString() ? `?${sp.toString()}` : ''}`;
            const r = await fetch(target, { headers: { X_ATS_TOKEN: token, Accept: 'application/json' } });
            if (!r.ok) {
              res.statusCode = r.status;
              res.setHeader('content-type', 'application/json');
              res.end(JSON.stringify({ error: 'Failed to fetch jobs from Employment Hero' }));
              return;
            }
            const j = await r.json();
            const data = (j && j.data) || j;
            const out = {
              data: {
                items: data?.items ?? data?.results ?? [],
                page_index: data?.page_index ?? 1,
                item_per_page: data?.item_per_page ?? data?.items_per_page ?? 0,
                total_items: data?.total_items ?? 0,
                total_pages: data?.total_pages ?? 0,
              },
            };
            res.statusCode = 200;
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify(out));
            return;
          }
          if (url.startsWith('/api/eh-metadata')) {
            const base = 'https://api.employmenthero.com/ats/api/v1/embedded';
            const [cR, dR] = await Promise.all([
              fetch(`${base}/countries`, { headers: { X_ATS_TOKEN: token, Accept: 'application/json' } }),
              fetch(`${base}/departments`, { headers: { X_ATS_TOKEN: token, Accept: 'application/json' } }),
            ]);
            if (!cR.ok || !dR.ok) {
              const status = !cR.ok ? cR.status : dR.status;
              res.statusCode = status;
              res.setHeader('content-type', 'application/json');
              res.end(JSON.stringify({ error: 'Failed to fetch metadata from Employment Hero' }));
              return;
            }
            const countriesJson = await cR.json();
            const departmentsJson = await dR.json();
            const out = {
              countries: countriesJson?.data ?? countriesJson ?? [],
              departments: departmentsJson?.data ?? departmentsJson ?? [],
            };
            res.statusCode = 200;
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify(out));
            return;
          }
          next();
        } catch {
          res.statusCode = 500;
          res.setHeader('content-type', 'application/json');
          res.end(JSON.stringify({ error: 'Failed to fetch data' }));
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ehDevApi()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  base: process.env.BASE_PATH || '/',
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/react/')) return 'react';
          if (id.includes('/node_modules/react-dom/')) return 'react';
          if (id.includes('/node_modules/react-router-dom/')) return 'router';
          if (
            id.includes('/node_modules/i18next') ||
            id.includes('/node_modules/react-i18next') ||
            id.includes('/node_modules/i18next-browser-languagedetector') ||
            id.includes('/node_modules/i18next-http-backend')
          ) return 'i18n';
          if (id.includes('/node_modules/lucide-react/')) return 'ui';
          if (id.includes('/node_modules/framer-motion/')) return 'motion';
          if (id.includes('/node_modules/motion/')) return 'motion';
          if (id.includes('/node_modules/@radix-ui/')) return 'radix';
          if (
            id.includes('/node_modules/react-hook-form') ||
            id.includes('/node_modules/@hookform/resolvers') ||
            id.includes('/node_modules/zod')
          ) return 'forms';
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

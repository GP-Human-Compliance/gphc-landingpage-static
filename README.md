# gp-hc.de

Website of GP Human Compliance GmbH, served at [www.gp-hc.de](https://www.gp-hc.de).

Built with [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com) as a static export and deployed to GitHub Pages.

## Development

```bash
npm ci
npm run dev        # http://localhost:3000
npm run typecheck
```

## Deployment

Every push to `main` runs `.github/workflows/pages.yml`: `npm run build` writes the static site to `out/`, which is published to GitHub Pages. The custom domain `www.gp-hc.de` is configured in the repository's Pages settings (`public/CNAME` mirrors it).

## Content

- Landing page: `src/app/(main)/page.tsx`
- Impressum: `src/app/(main)/legal/page.tsx`
- Datenschutzerklärung: `src/app/(main)/privacy/page.tsx`

Legal texts are based on e-recht24.de; changes should be reviewed by our data protection consultant.

## License

Parts of the layout are based on a [Tailwind UI](https://tailwindui.com) template, see `LICENSE.md`.

**Microfrontend deployment flow:**
```sql
┌──────────────┐
│  Git Monorepo│
└───────┬──────┘
        │  (push code)
        ▼
┌──────────────┐
│   GitHub CI  │
│ (Check changes) │
└───────┬──────┘
        │ If changes detected
        ▼
┌──────────────┐
│   Webpack    │
│   (Build)    │
│  dist/ files │
└───────┬──────┘
        │ Upload build output
        ▼
┌──────────────┐
│   Amazon S3  │
│ (Static files) │
└───────┬──────┘
        │ Origin for CDN
        ▼
┌─────────────────┐
│ CloudFront CDN  │
│ (Edge Caching,  │
│ Global Delivery)│
└───────┬────────┘
        │
        ▼
┌──────────────┐
│   Browser /  │
│   End User   │
└──────────────┘
```

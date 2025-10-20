# Deployment Guide

This guide covers deploying SparkCraft IDE to Vercel and Netlify platforms.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Deploy to Vercel](#deploy-to-vercel)
- [Deploy to Netlify](#deploy-to-netlify)
- [Custom Domain Setup](#custom-domain-setup)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:

1. **Node.js 18+** installed
2. **Git repository** with your code pushed
3. **Supabase project** set up with:
   - Project URL
   - Anonymous API key
   - Database tables created
   - Edge Functions deployed
4. **Platform account** (Vercel or Netlify)

## Environment Variables

Both platforms require the following environment variables:

```bash
# Required
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anonymous_key_here

# Optional
VITE_ANALYTICS_ID=your_analytics_id
```

### Getting Supabase Credentials

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Settings** → **API**
4. Copy the **Project URL** and **anon/public** key

## Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Import Your Repository**
   ```bash
   # Push your code to GitHub
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the framework (Vite)

3. **Configure Environment Variables**
   - In project settings, go to "Environment Variables"
   - Add each variable from the [Environment Variables](#environment-variables) section
   - Apply to: Production, Preview, and Development

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (2-5 minutes)
   - Your site will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # For production
   vercel --prod
   
   # For preview
   vercel
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_ANON_KEY
   ```

### Vercel Configuration

The project includes `vercel.json` with optimized settings:

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vite (auto-detected)
- **Security Headers**: Pre-configured
- **SPA Routing**: Rewrites configured
- **Asset Caching**: Optimized for static files

### Vercel-Specific Features

- **Edge Functions**: Can be added to `api/` directory
- **Analytics**: Enable in project settings
- **Performance Insights**: Available in dashboard
- **Automatic HTTPS**: Included
- **Global CDN**: Built-in

## Deploy to Netlify

### Option 1: Deploy via Netlify Dashboard (Recommended)

1. **Import Your Repository**
   ```bash
   # Push your code to GitHub
   git push origin main
   ```

2. **Connect to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Select the branch to deploy (usually `main`)

3. **Build Settings** (Auto-detected from netlify.toml)
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions` (optional)

4. **Configure Environment Variables**
   - In **Site settings** → **Environment variables**
   - Add each variable from the [Environment Variables](#environment-variables) section

5. **Deploy**
   - Click "Deploy site"
   - Wait for the build to complete (2-5 minutes)
   - Your site will be live at `https://your-site.netlify.app`

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize Site**
   ```bash
   netlify init
   ```

4. **Deploy**
   ```bash
   # For production
   netlify deploy --prod
   
   # For preview
   netlify deploy
   ```

5. **Set Environment Variables**
   ```bash
   netlify env:set VITE_SUPABASE_URL "your_value"
   netlify env:set VITE_SUPABASE_ANON_KEY "your_value"
   ```

### Netlify Configuration

The project includes `netlify.toml` with optimized settings:

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 18
- **Security Headers**: Pre-configured
- **SPA Routing**: Redirects configured
- **Asset Caching**: Optimized

### Netlify-Specific Features

- **Edge Functions**: Add to `netlify/functions/` directory
- **Split Testing**: A/B testing support
- **Forms**: Built-in form handling
- **Analytics**: Enable in site settings
- **Automatic HTTPS**: Included
- **Global CDN**: Built-in

## Custom Domain Setup

### On Vercel

1. Go to your project → **Settings** → **Domains**
2. Add your custom domain
3. Configure DNS records as shown:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. Wait for DNS propagation (up to 48 hours)
5. Vercel will automatically provision SSL certificate

### On Netlify

1. Go to **Site settings** → **Domain management**
2. Add custom domain
3. Configure DNS records as shown:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```
4. Wait for DNS propagation (up to 48 hours)
5. Netlify will automatically provision SSL certificate

## CI/CD and Automatic Deployments

### Vercel

Automatic deployments are enabled by default:

- **Production**: Pushes to `main` branch trigger production deploys
- **Preview**: Pull requests trigger preview deploys
- **Rollback**: Previous deployments can be restored instantly

### Netlify

Automatic deployments configuration:

- **Production**: Configure in **Site settings** → **Build & deploy**
- **Deploy contexts**: Set different rules for branches
- **Deploy hooks**: Webhook URLs for manual triggers

## Performance Optimization

### Build Optimizations

Both platforms automatically apply:

- Code splitting
- Tree shaking
- Asset compression (gzip/brotli)
- Image optimization
- CSS minification

### Additional Optimizations

1. **Enable Caching**
   - Static assets cached with immutable headers
   - API responses should include appropriate cache headers

2. **Use CDN Features**
   - Both platforms use global CDNs
   - Assets served from edge locations near users

3. **Monitor Performance**
   - Use Vercel Analytics or Netlify Analytics
   - Set up Web Vitals monitoring
   - Configure performance budgets

## Troubleshooting

### Build Failures

**Issue**: Build fails with "Command not found"
```bash
Solution: Ensure package.json has correct scripts:
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

**Issue**: Out of memory during build
```bash
Solution: Increase Node.js memory limit
# In build command:
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Environment Variable Issues

**Issue**: Environment variables not accessible
```bash
Solution: Ensure variables are prefixed with VITE_
Vite only exposes VITE_* variables to client code
```

**Issue**: Variables work locally but not in production
```bash
Solution: Check platform dashboard
1. Go to Environment Variables settings
2. Ensure variables are set for Production environment
3. Redeploy after adding variables
```

### Routing Issues (404 on Refresh)

**Issue**: SPA routes return 404 on page refresh

**Solution**: Both platforms are configured with proper rewrites
- Vercel: Check `vercel.json` has the rewrite rule
- Netlify: Check `netlify.toml` has the redirect rule

If still failing:
```toml
# netlify.toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

```json
// vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Supabase Connection Issues

**Issue**: Can't connect to Supabase from deployed app

**Checklist**:
1. ✓ Environment variables set correctly
2. ✓ Supabase project not paused
3. ✓ RLS policies configured properly
4. ✓ CORS enabled in Supabase dashboard
5. ✓ Check browser console for specific errors

### Performance Issues

**Issue**: Slow initial load time

**Solutions**:
1. Enable code splitting
2. Lazy load routes and components
3. Optimize images (use WebP format)
4. Reduce bundle size (check with `vite-bundle-visualizer`)
5. Enable compression in platform settings

## Monitoring and Logs

### Vercel

- **Build Logs**: Available in deployment details
- **Function Logs**: Real-time logs in dashboard
- **Analytics**: Web Vitals and page views
- **Errors**: Integrated error tracking

### Netlify

- **Build Logs**: Available for each deploy
- **Function Logs**: Available in Functions tab
- **Analytics**: Page views and unique visitors
- **Error Tracking**: Deploy summaries show errors

## Security Best Practices

1. **Never commit `.env` files**
   - Use `.env.example` as template
   - Set actual values in platform dashboard

2. **Use environment-specific variables**
   - Different keys for development/production
   - Rotate keys regularly

3. **Enable security headers**
   - Already configured in both config files
   - Review Content Security Policy for your needs

4. **Set up rate limiting**
   - Configure in Supabase Edge Functions
   - Use platform-level rate limiting if available

5. **Regular updates**
   - Keep dependencies updated
   - Monitor security advisories
   - Use automated dependency updates (Dependabot)

## Cost Considerations

### Vercel Pricing

- **Hobby (Free)**:
  - 100 GB bandwidth/month
  - 6,000 build minutes/month
  - Serverless function executions: 100 GB-hours

- **Pro ($20/month)**:
  - 1 TB bandwidth
  - 24,000 build minutes
  - Priority support

### Netlify Pricing

- **Starter (Free)**:
  - 100 GB bandwidth/month
  - 300 build minutes/month
  - 125k serverless function invocations

- **Pro ($19/month)**:
  - 1 TB bandwidth
  - 25,000 build minutes
  - 2M function invocations

### Cost Optimization Tips

1. **Optimize build times**: Faster builds = fewer minutes used
2. **Cache dependencies**: Use caching layers
3. **Use CDN efficiently**: Leverage edge caching
4. **Monitor usage**: Set up alerts for quota limits

## Support and Resources

### Vercel

- Documentation: https://vercel.com/docs
- Community: https://vercel.com/community
- Discord: https://vercel.com/discord
- Status: https://vercel-status.com

### Netlify

- Documentation: https://docs.netlify.com
- Community: https://answers.netlify.com
- Discord: https://netlify.com/discord
- Status: https://netlifystatus.com

## Next Steps

After successful deployment:

1. ✓ Test all features in production
2. ✓ Set up custom domain
3. ✓ Configure analytics
4. ✓ Enable error tracking
5. ✓ Set up uptime monitoring
6. ✓ Configure backup strategy
7. ✓ Document deployment process for team

---

For additional help, refer to the [main README](../README.md) or open an issue in the repository.

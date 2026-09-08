# FindAPair Backend - Complete Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- Docker & Docker Compose (optional)

### 1. Clone and Install
```bash
cd backend
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Database Setup
```bash
# Create database
createdb findapair

# Run migrations
npm run db:migrate

# Seed demo data (optional)
npm run db:seed
```

### 4. Start Development Server
```bash
npm run dev
```

Server will be running at `http://localhost:3001`

---

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

This will start:
- PostgreSQL on port 5432
- Redis on port 6379
- Backend API on port 3001

### Manual Docker Deployment

```bash
# Build image
docker build -t findapair-backend .

# Run container
docker run -d \
  -p 3001:3001 \
  --env-file .env \
  --name findapair-backend \
  findapair-backend
```

---

## 🌐 Production Deployment

### Option 1: VPS/Cloud Server

1. **Setup Server**
   - Ubuntu 20.04+ recommended
   - 2GB RAM minimum
   - 20GB storage minimum

2. **Install Dependencies**
   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install PostgreSQL
   sudo apt-get install postgresql postgresql-contrib

   # Install Redis
   sudo apt-get install redis-server

   # Install PM2
   sudo npm install -g pm2
   ```

3. **Setup Database**
   ```bash
   sudo -u postgres createdb findapair
   sudo -u postgres psql
   # ALTER USER postgres PASSWORD 'your-password';
   ```

4. **Deploy Application**
   ```bash
   git clone <your-repo>
   cd backend
   npm install --production
   npm run db:migrate
   ```

5. **Start with PM2**
   ```bash
   pm2 start dist/server.js --name findapair-backend
   pm2 save
   pm2 startup
   ```

6. **Setup Nginx Reverse Proxy**
   ```nginx
   server {
       listen 80;
       server_name api.findapair.org;

       location / {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

7. **Setup SSL**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d api.findapair.org
   ```

### Option 2: Platform as a Service

#### Railway
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### Render
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on push

#### Heroku
```bash
heroku create findapair-backend
heroku addons:create heroku-postgresql:hobby-dev
heroku addons:create heroku-redis:hobby-dev
git push heroku main
```

---

## 🔧 Configuration

### Required Environment Variables

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/findapair

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_REFRESH_SECRET=your-super-secret-refresh-key

# Frontend URL
FRONTEND_URL=https://findapair.org

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (SendGrid recommended)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
EMAIL_FROM=noreply@findapair.org

# Stripe (for payments)
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

### Optional Environment Variables

```bash
# Server
NODE_ENV=production
PORT=3001

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Logging
LOG_LEVEL=info
```

---

## 📊 Database Management

### Run Migrations
```bash
npm run db:migrate
```

### Seed Demo Data
```bash
npm run db:seed
```

### Reset Database
```bash
npm run db:reset
```

### Backup Database
```bash
pg_dump findapair > backup_$(date +%Y%m%d).sql
```

### Restore Database
```bash
psql findapair < backup_20240101.sql
```

---

## 🔐 Security Checklist

- [ ] Change all default passwords
- [ ] Use strong JWT secrets (min 32 chars)
- [ ] Enable HTTPS/SSL
- [ ] Set up firewall rules
- [ ] Enable rate limiting
- [ ] Configure CORS properly
- [ ] Use environment variables for secrets
- [ ] Enable database encryption at rest
- [ ] Set up regular backups
- [ ] Monitor for suspicious activity
- [ ] Keep dependencies updated
- [ ] Use helmet.js for security headers
- [ ] Implement input validation
- [ ] Sanitize user inputs
- [ ] Use prepared statements (already done with Knex)

---

## 📈 Monitoring & Logging

### Application Logs
```bash
# View logs
pm2 logs findapair-backend

# Or with Docker
docker logs findapair-backend
```

### Database Monitoring
```bash
# Check connections
psql -c "SELECT count(*) FROM pg_stat_activity;"

# Check slow queries
psql -c "SELECT * FROM pg_stat_activity WHERE state = 'active';"
```

### Redis Monitoring
```bash
redis-cli info
redis-cli monitor
```

### Health Check
```bash
curl http://localhost:3001/health
```

---

## 🚨 Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Check connection
psql -U postgres -d findapair -c "SELECT 1;"
```

### Redis Connection Issues
```bash
# Check if Redis is running
sudo systemctl status redis

# Test connection
redis-cli ping
```

### Port Already in Use
```bash
# Find process using port
lsof -i :3001

# Kill process
kill -9 <PID>
```

### Out of Memory
```bash
# Increase Node.js memory
NODE_OPTIONS="--max-old-space-size=4096" npm start
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy Backend

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: cd backend && npm ci
      
      - name: Run tests
        run: cd backend && npm test
      
      - name: Build
        run: cd backend && npm run build
      
      - name: Deploy to server
        run: |
          ssh user@server "cd /app && git pull && npm install --production && npm run db:migrate && pm2 restart findapair-backend"
```

---

## 📞 Support

For deployment support:
- Email: support@findapair.org
- Documentation: See API_DOCUMENTATION.md
- Issues: GitHub Issues

---

## ✅ Deployment Verification Checklist

After deployment, verify:

- [ ] API is accessible at your domain
- [ ] Health check returns 200 OK
- [ ] Database migrations ran successfully
- [ ] Redis connection is working
- [ ] Email sending works
- [ ] File uploads work
- [ ] WebSocket connections work
- [ ] Rate limiting is active
- [ ] SSL certificate is valid
- [ ] Logs are being written
- [ ] Backups are configured
- [ ] Monitoring is set up

---

## 🎉 You're Live!

Your FindAPair backend is now deployed and ready to serve users!

**Next Steps:**
1. Deploy the frontend
2. Configure DNS
3. Set up monitoring
4. Configure backups
5. Test all features
6. Launch! 🚀

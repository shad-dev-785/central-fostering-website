# Packs the website into a "container": a sealed box that runs the same way on your laptop and on an AWS server.
# Built by docker-compose.prod.yml:  docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build

FROM node:22-bookworm-slim

WORKDIR /app

# Install dependencies first. Docker remembers this step, so rebuilding after a small code change is quick.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# NEXT_PUBLIC_* values are baked into the pages while they are built, so the address must be known here.
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
RUN npm run build

# Run as the unprivileged "node" user, not root. It needs to write to .next/cache (resized photos) and data/ (the database).
ENV NODE_ENV=production
RUN mkdir -p /app/data && chown -R node:node /app/.next /app/data
USER node

EXPOSE 3000
# -H 0.0.0.0 so the Caddy container can reach the site from outside this box.
CMD ["npm", "run", "start", "--", "-H", "0.0.0.0", "-p", "3000"]

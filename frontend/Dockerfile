########################
# 1) Build stage
########################
FROM node:22-bookworm AS build
WORKDIR /app

COPY package.json ./

RUN --mount=type=cache,target=/root/.npm \
    npm install --include=dev --package-lock=false --no-audit --no-fund

COPY . .

ARG BACKEND_ORIGIN
ARG PUBLIC_MAILTO
ENV BACKEND_ORIGIN=${BACKEND_ORIGIN} \
    PUBLIC_MAILTO=${PUBLIC_MAILTO}
RUN npm run build

########################
# 2) Prune to prod deps
########################
FROM node:22-bookworm AS prune
WORKDIR /app

COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules

RUN --mount=type=cache,target=/root/.npm \
    npm prune --omit=dev --no-audit --no-fund

COPY --from=build /app/build ./build

########################
# 3) Runtime stage
########################
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=prune /app/node_modules ./node_modules
COPY --from=prune /app/build ./build
COPY package.json ./

RUN addgroup --system nodejs && adduser --system --ingroup nodejs appuser

USER appuser

EXPOSE 3000
CMD ["node", "build"]
FROM node:latest AS builder
WORKDIR /app

ARG BACKEND_URL=backend
ARG MAILTO=silly

ENV PUBLIC_SERVER_URL=${BACKEND_URL}
ENV PUBLIC_MAILTO=${MAILTO}

COPY package.json .
RUN npm install

COPY ./public ./public
COPY ./src ./src
#COPY ./tests ./tests
COPY ./astro.config.mjs ./astro.config.mjs
COPY ./playwright.config.ts ./playwright.config.ts
COPY ./svelte.config.js ./svelte.config.js
COPY ./tailwind.config.js ./tailwind.config.js
COPY ./tsconfig.json ./tsconfig.json

RUN npx tailwindcss -i ./src/styles/main.css -o ./src/styles/generated.css

#RUN npx playwright install --with-deps && npx playwright test

RUN npm run build
RUN rm -rf node_modules src public tests

FROM nginx:stable-alpine
RUN addgroup --system nginxgroup && adduser --system --ingroup nginxgroup nginxuser
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .
COPY ./nginx.conf /etc/nginx/nginx.conf

RUN chown -R nginxuser:nginxgroup /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown nginxuser:nginxgroup /etc/nginx/nginx.conf && \
    chmod 644 /etc/nginx/nginx.conf

USER nginxuser
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]

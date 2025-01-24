FROM node:latest AS builder

# Add system group and user for nginx
RUN addgroup --system buildergroup && adduser --system --ingroup buildergroup builder

WORKDIR /app

# Copy the necessary files and install dependencies
COPY package.json .
RUN npm install

# Copy all source code, config files, etc.
COPY ./src ./src
COPY ./e2e ./e2e
COPY ./static ./static
COPY ./.npmrc ./.npmrc
COPY ./eslint.config.js ./eslint.config.js
COPY ./svelte.config.js ./svelte.config.js
COPY ./package.json ./package.json
COPY ./playwright.config.ts ./playwright.config.ts
COPY ./postcss.config.js ./postcss.config.js
COPY ./tailwind.config.ts ./tailwind.config.ts
COPY ./vite.config.ts ./vite.config.ts
COPY ./tsconfig.json ./tsconfig.json

ARG SERVER_URL
ARG PUBLIC_MAILTO
ARG PORT
ENV SERVER_URL=${SERVER_URL}
ENV PUBLIC_MAILTO=${PUBLIC_MAILTO}
ENV PORT=${PORT}

RUN npx tailwindcss -i ./src/app.css -o ./src/generated.css
RUN npm run build

# Ensure permissions are correct for the app directory and any files that need write access
RUN chown -R builder:buildergroup /app
RUN chmod -R 755 /app

# Create the test-results directory and ensure permissions for Playwright
RUN mkdir -p /app/test-results && chown -R builder:buildergroup /app/test-results
RUN mkdir -p /nonexistent && chown -R builder:buildergroup /nonexistent
RUN npx playwright install-deps

USER builder
# Install playwright and its dependencies
RUN npx playwright install


# Run Playwright tests
RUN npx playwright test

# Cleanup unnecessary files
RUN rm -rf node_modules src static e2e

# Nginx Stage
FROM nginx:stable-alpine
RUN addgroup --system nginxgroup && adduser --system --ingroup nginxgroup nginxuser

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/build .

COPY ./nginx.conf /etc/nginx/nginx.conf

RUN chown -R nginxuser:nginxgroup /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown nginxuser:nginxgroup /etc/nginx/nginx.conf && \
    chmod 644 /etc/nginx/nginx.conf

USER nginxuser

EXPOSE 80 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]
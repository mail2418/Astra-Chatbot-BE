# use the official Bun image
FROM oven/bun:1
WORKDIR /usr/src/app
COPY . .
RUN cd /usr/src/app && bun install --frozen-lockfile

# run the app
USER bun
EXPOSE 8080/tcp
ENTRYPOINT [ "bun", "run", "app.ts" ]
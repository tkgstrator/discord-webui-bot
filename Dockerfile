FROM oven/bun:1.0.28 AS build
WORKDIR /app
COPY . .
RUN bun install --frozen-lockfile --production --ignore-scripts

FROM oven/bun:1.0.28-distroless
WORKDIR /app
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/src /app/src
COPY --from=build /app/tsconfig.json /app/tsconfig.json
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/test/txt2img.json /app/test/txt2img.json

ENTRYPOINT [ "bun", "run", "src/index.ts" ]

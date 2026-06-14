FROM oven/bun:1

WORKDIR /app

COPY package.json package-lock.json* ./
RUN bun install

COPY . .

RUN bunx prisma generate --config prisma.config.ts

EXPOSE 3000

CMD ["bun", "src/index.ts"]
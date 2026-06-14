FROM oven/bun:1

WORKDIR /app

COPY package.json package-lock.json* ./
RUN bun install

COPY . .

EXPOSE 3000

CMD ["bun", "run", "start"]
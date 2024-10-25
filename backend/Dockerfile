# Stage 1: Build the NestJS app with Prisma Client
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

RUN npx prisma generate

RUN npm run build

# Stage 2: Create a lightweight production image
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/public /app/public

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package*.json /app/
COPY --from=builder /app/prisma /app/prisma

ENV PORT=8080
EXPOSE 8080

CMD ["npm", "run", "start:prod"]

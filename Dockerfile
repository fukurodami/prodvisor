FROM node:20.17.0-alpine AS builder

WORKDIR /app

# Устанавливаем pnpm без глобальной установки (чтобы не тащить лишние файлы)
RUN npm install -g pnpm@9.15.5

# Копируем только package.json и pnpm-lock.yaml для оптимизации кеша
COPY package.json pnpm-lock.yaml ./

# Устанавливаем зависимости (без хранения кеша)
#RUN pnpm install --frozen-lockfile --prod
RUN pnpm install --no-frozen-lockfile --prod
# Копируем оставшиеся файлы
COPY . .

# Собираем проект
RUN pnpm run build


# Шаг 2: Финальный легковесный образ
FROM node:20.17.0-alpine

WORKDIR /app

# Копируем билд из предыдущего слоя
COPY --from=builder /app/.output /app/.output
# Создаём пользователя nginx
RUN addgroup -g 984 -S nginx && adduser -u 984 -S nginx -G nginx

# Создаем директорию для сокета с нужными правами
RUN mkdir -p /app/socket && chmod 777 /app/socket

# Устанавливаем переменную окружения для сокета
ENV NITRO_UNIX_SOCKET=/app/socket/prodvisor.sock
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

USER root
# Экспортируем сокет (хоть это и не обязательно, но полезно)
EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]
# Запускаем сервер
#CMD mkdir -p /app/socket && chmod 777 /app/socket && node /app/.output/server/index.mjs
CMD ["node", "/app/.output/server/index.mjs"]
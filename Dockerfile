#FROM node:25.2.1-alpine AS builder
#
#WORKDIR /app
#
## Устанавливаем pnpm без глобальной установки (чтобы не тащить лишние файлы)
#RUN npm install -g pnpm@10.29.3
#
## Копируем только package.json и pnpm-lock.yaml для оптимизации кеша
#COPY package.json pnpm-lock.yaml ./
#
## Устанавливаем зависимости (без хранения кеша)
##RUN pnpm install --frozen-lockfile --prod
#RUN pnpm install --no-frozen-lockfile --prod
## Копируем оставшиеся файлы
#COPY . .
#
## Собираем проект
#RUN pnpm run build
#
#
## Шаг 2: Финальный легковесный образ
#FROM node:25.2.1-alpine
#
#WORKDIR /app
#
## Копируем билд из предыдущего слоя
#COPY --from=builder /app/.output /app/.output
## Создаём пользователя nginx
#RUN addgroup -g 984 -S nginx && adduser -u 984 -S nginx -G nginx
#
## Создаем директорию для сокета с нужными правами
#RUN mkdir -p /app/socket && chmod 777 /app/socket
#
## Устанавливаем переменную окружения для сокета
#ENV NITRO_UNIX_SOCKET=/app/socket/lk_prodvisor.sock
#COPY entrypoint.sh /entrypoint.sh
#RUN chmod +x /entrypoint.sh
#
#USER root
## Экспортируем сокет (хоть это и не обязательно, но полезно)
#EXPOSE 3000
#ENTRYPOINT ["/entrypoint.sh"]
## Запускаем сервер
##CMD mkdir -p /app/socket && chmod 777 /app/socket && node /app/.output/server/index.mjs
#CMD ["node", "/app/.output/server/index.mjs"]



# Этап 1: Сборка (builder)
FROM node:25.2.1-alpine AS builder

WORKDIR /app


RUN npm install -g pnpm@10.29.3


COPY package.json pnpm-lock.yaml ./


RUN pnpm install --frozen-lockfile


COPY . .


RUN yes n | pnpm run build


FROM node:25.2.1-alpine

WORKDIR /app


COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package.json ./package.json


RUN addgroup -g 984 -S nginx && \
    adduser -u 984 -S nginx -G nginx

# Создаём директорию для сокета и даём права
RUN mkdir -p /app/socket && \
    chown nginx:nginx /app/socket && \
    chmod 770 /app/socket

# Переключаемся на пользователя nginx


# Устанавливаем переменную для unix-сокета (Nuxt/Nitro её понимает)
ENV NITRO_UNIX_SOCKET=/app/socket/lk_prodvisor.sock

# Копируем entrypoint (если он у тебя есть)
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
USER root
# Запускаем через entrypoint
ENTRYPOINT ["/entrypoint.sh"]



#FROM node:25.2.1-alpine
#
#WORKDIR /app
#
## Копируем только то, что нужно для запуска (уже собранное в CI)
#COPY .output ./.output
#COPY package.json ./package.json
#
## Создаём пользователя nginx
#RUN addgroup -g 984 -S nginx && \
#    adduser -u 984 -S nginx -G nginx
#
## Директория сокета
#RUN mkdir -p /app/socket && \
#    chown nginx:nginx /app/socket && \
#    chmod 770 /app/socket
#
#USER root
#
#ENV NITRO_UNIX_SOCKET=/app/socket/lk_prodvisor.sock
#
## Запускаем приложение
#CMD ["node", ".output/server/index.mjs"]
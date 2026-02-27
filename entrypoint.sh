#!/bin/sh

set -x  # Включаем отладку

cleanup() {

    echo "Контейнер завершает работу, удаляем сокет..."

    rm -f /app/socket/lk_prodvisor.sock

}

trap cleanup EXIT INT TERM


rm -f /app/socket/lk_prodvisor.sock

# Запускаем приложение в фоне

node /app/.output/server/index.mjs &


# Ждём, пока приложение запустится

sleep 3


# Ожидаем появления сокета и меняем права

while [ ! -S /app/socket/lk_prodvisor.sock ]; do

    echo "Ожидаем создание сокета..."

    sleep 1

done


echo "Сокет найден, меняем владельца и права..."

chown root:nginx /app/socket/lk_prodvisor.sock

chmod 660 /app/socket/lk_prodvisor.sock

ls -lah /app/socket/


# Не даём скрипту завершиться, следим за процессами

wait -n
# Получаем и выводим весь список контактов в виде таблицы (console.table)

node index.js --action list

![list](/images/list.png)

# Получаем контакт по id - выводим в консоль объект контакта или null, если контакта с таким id не существует.

node index.js --action get --id drsAJ4SHPYqZeG-83QTVW

![findById](/images/getById.png)

# Добавляем контакт и выводим в консоль созданный контакт

node index.js --action add --id 1235 --name Mango1 --email mang1o@gmail.com --phone 322-22-23

![add](/images/add.png)

# Удаляем контакт и выводим в консоль удаленный контакт или null, если контакта с таким id не существует.

node index.js --action remove --id 1235

![removecntct](/images/remove.png)

# Как запустить приложение

## Перед запуском необходимо создать env файл в папке backend:

```
cd backend
```
### Пример env файла - `.backend.env.example` - находится в папке backend

## Для запуска приложения необходимо поочередно в папках:

 - frontend:
```
  cd frondend
```

 - backend:
```
  cd backend
```

## Запустить следующие команды:

```
npm run buildDocker
```

```
docker compose -f docker-compose.stage.yml up -d 
```

## После запуска приложение будет доступно по адресу:
```
http://localhost:5173
```

# Заполнение базы данных моковыми записями

## Для заполнения баз данных пользователей, тренировок и отзывов моковыми записями необходимо в папке `backend` выполнить команду:
```
npm run seed <usersCount> <trainingsCount> <reviewsCount>
```
где:
usersCount - количество записей пользователей;
trainingsCount - количество записей тренировок;
reviewsCount - количество записей пользователей;

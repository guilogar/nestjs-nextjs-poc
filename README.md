# PoC

Example application with next.js in front and nest.js in back.

## Run Front-End

1. cd my-app-frontend
2. create the file .env.local as

```
NEXT_PUBLIC_BACKEND_HOST=http://localhost:3000
```

3. npm run dev

## Run Back-End

1. cd my-app-backend
2. create the file .env.local as

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=test
DB_USERNAME=test
DB_PASSWORD=test
```

2. docker-compose up -d
3. npm run start:dev

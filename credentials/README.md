# Credentials Folder

- **Server**:
  - **URL**:  [saferity.quartz.technology/](https://saferity.quartz.technology/)
  - **IP**: 51.158.98.184
- **SSH username**: root
- **SSH key**: id_ed25519_scw_sfsu
- **Database IP and port used**: 51.158.98.184:3306
- **Database Environment**:
```
# MYSQL Configuration
export DB_ROOT_PASSWORD="7kS3ejtlMs!jMX9&kL4x"
export DB_NAME=prod_db
export DB_USER=user
export DB_PASSWORD="99X!KG4dp6BH!!avuqal"
export DB_HOST=127.0.0.1
export DB_PORT=3306

export DATABASE_URL=mysql://root:${DB_ROOT_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}

# Redis Configuration
export REDIS_HOST=127.0.0.1
export REDIS_PORT=6379
export REDIS_PASSWORD="U&JieoIM9y4nk5JZrL58"
export REDIS_URL=redis://:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}
export SESSION_SECRET="ftO6oui&U7Y&Y7OD1ScJ"
```
- **Connection ssh**: `ssh root@51.158.98.184 -i id_ed25519_scw_sfsu`

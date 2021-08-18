## Setting

---

### .env

NODE_ENV=development  
APP_PORT=3000

MYSQL_ROOT_PASSWORD=  
MYSQL_DATABASE=  
MYSQL_HOST=db

TYPEORM_CONNECTION=mysql  
TYPEORM_HOST=localhost  
TYPEORM_USERNAME=root  
TYPEORM_PASSWORD=  
TYPEORM_DATABASE=  
TYPEORM_PORT=3306  
TYPEORM_SYNCHRONIZE=true  
TYPEORM_ENTITIES=build/entity/\*.js  
TYPEORM_MIGRATIONS=build/migration/\*.js  
TYPEORM_ENTITIES_DIR=src/entity  
TYPEORM_MIGRATIONS_DIR=src/migration

### .env.prod

NODE_ENV=production  
APP_PORT=3000

### TypeORM Migration

1. Create the TS entity file in src/entity folder
2. Run `yarn build` command to build JS entity file in build/entity folder
3. Run `yarn generate` command to generate TS migration file in src/migration folder
4. (Check the TS entity file and add some eslint-disable)
5. Run `yarn build` command again to build JS migration file in build/migration folder
6. Run `typeorm migration:run` to run migration

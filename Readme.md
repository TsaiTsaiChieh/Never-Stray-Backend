## Setting

---

### .env

NODE_ENV=development<br>
APP_PORT=3000<br>

MYSQL_ROOT_PASSWORD=<br>
MYSQL_DATABASE=<br>
MYSQL_HOST=db<br>

TYPEORM_CONNECTION=mysql<br>
TYPEORM_HOST=db<br>
TYPEORM_USERNAME=root<br>
TYPEORM_PASSWORD=<br>
TYPEORM_DATABASE=<br>
TYPEORM_PORT=3306<br>
TYPEORM_SYNCHRONIZE=true<br>
TYPEORM_ENTITIES = src/entity//*.{ts.js}<br>
TYPEORM_MIGRATIONS = src/migration//*.{ts.js}<br>
TYPEORM_ENTITIES_DIR = src/entity<br>
TYPEORM_MIGRATIONS_DIR = src/migration<br>
### .env.prod

NODE_ENV=production<br>
APP_PORT=3000

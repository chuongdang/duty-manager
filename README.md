### 1. Overview

This project is a simple project to automate scheduling for staffs

#### Techniques
* PHP 7
* SQLite
* PhalconPHP (https://phalconphp.com)
* React
* Redux
* Material UI (https://material-ui.com)

### 2. Local test

#### Start Docker containers

```bash
cd docker
./run.sh
```

Open [http://localhost](http://localhost)

#### Sync code to containers

```bash
cd docker
./sync
```

#### Stop docker containers

```bash
./run.sh down
```

### 3. Frontend development and debug

```bash
cd public/dev
yarn start
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Deploy to AWS

* Create ECS service
* Run deploy command

```bash
cd docker
./deploy.sh
```
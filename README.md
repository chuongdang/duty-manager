### Overview

This project is a simple project to automate scheduling for staffs

#### Techniques
* PHP 7
* PhalconPHP (https://phalconphp.com)
* React
* Redux
* Material UI (https://material-ui.com)

### Local test

Start Docker containers

```bash
cd docker
./run.sh
```

Open http://localhost

To stop docker containers

```bash
./run.sh down
```

### Frontend development and debug

```bash
cd public/dev
yarn start
```

Open http://localhost:3000

### Deploy to AWS

* Create ECS service
* Run deploy command

```bash
cd docker
./deploy.sh
```
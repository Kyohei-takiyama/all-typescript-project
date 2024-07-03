# all-typescript-project

## Overview

Frontend , Backend , できれば Infra も全て Typescript で開発して、モノリスアーキテクチャを体験してみる

## Architecture

WIP

## CI/CD

WIP

## How to Linking Issue

- Refference:https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue

```sh
# commit
 git commit -m "someting commit message {issue No}"

 # PR
 Someting PR title {Closes #{issue No}}
```

## How to Development

### Backend

#### Docker

```sh
# move /backend directory
docker-compose up --build
# or
docker compose build # build
docker compose up # build and run when first run 2回目からはrunのみ

# container down
docker-compose down

# delete volume
docker volume ls
# example
docer volume rm backend_db-data

# check environment variables in container
docker exec -it { container_name } sh
printenv
```

#### DB Migrate

```sh
# connect docker app container
docker exec -it ts-all-app-backend sh
# run npm command migration
npm run migrate:init
```

#### Redis

```sh
# connect redis server
docker exec -it {conatainer name} sh

# connected redis server , use `redis cli`
redis-cli

# Get Value by Key
GET {key name}

# Set Value
SET {key name} value
# if success set key-value , print 'OK'

# example
127.0.0.1:6379> SET example 123
OK
127.0.0.1:6379> GET example
"123"
```

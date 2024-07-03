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
docker compose build
docker compose up
```

#### Redis

```sh
# connect redis server
docker exec -it {conatainer name} bin sh

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

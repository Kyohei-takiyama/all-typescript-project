# all-typescript-project

## Overview

Frontend , Backend , できれば Infra も全て Typescript で開発して、モノリスアーキテクチャを体験してみる

## Infra

![Infra](docs/構成図2.png)

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

# delete unnecessary image
docker image prune -f

# delete unnecessary container
docker container prune -f

# delete unnecessary container
docker volume prune -f

# イメージ、コンテナ、ネットワーク、ボリュームの全部消し
docker system prune --volumes -f
```

#### DB

- Migration

```sh
# connect docker app container
docker exec -it ts-all-app-backend sh
# run npm command migration
npm run migrate:init
```

- Connection

```sh
psql --host=<db-endpoint> --port=5432 --username=<db-username> --password --dbname=<db-name>
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

#### Tips

- aws command

```sh
# chekc db engine version aurora-postgress
aws rds describe-db-engine-versions --engine aurora-postgresql --query '*[].[EngineVersion]' --output text --region us-east-2
```

#### What I learned

- Systems manager のセッションマネージャー接続ができなかった

  - 解決
    - EC2 に IAM ロールをアタッチする
      - IAM ロールに「AmazonSSMManagedInstanceCore」ポリシーを付与する
      - IAM ロールを付与するためには、インスタンスプロファイルを作成して、IAM ロールとインスタンスプロファイルを紐づけた後に EC2 にアタッチする
    - EC2 を配置するサブネットに出入りするための口を用意してあげる
      - public サブネット
        - パブリック IP アドレスを付与する
      - private サブネット
        - Nat Gateway または VPC エンドポイントなどを設定する

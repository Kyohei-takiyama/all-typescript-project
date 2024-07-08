# ベースイメージを指定
FROM node:20

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./
RUN npm install

# ソースコードをコピー
COPY . .

# TypeScriptのビルド
RUN npm run build

# ポートを指定
EXPOSE 80

# コンテナ起動時のコマンドを指定
CMD ["npm", "start"]

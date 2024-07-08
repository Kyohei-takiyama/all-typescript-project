# ベースイメージを指定
FROM node:20

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# ソースコードをコピー
COPY . .

RUN npm install

# TypeScriptのビルド
RUN npm run build

# ポートを指定
EXPOSE 80

# コンテナ起動時のコマンドを指定
CMD ["npm", "start"]

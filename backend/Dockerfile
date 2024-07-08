# ベースイメージを指定
FROM node:20

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# パッケージマネージャのファイルをコピーし、依存関係をインストール
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

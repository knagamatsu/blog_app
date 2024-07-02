# ブログ投稿アプリケーション

このプロジェクトは、FastAPIをバックエンド、Reactをフロントエンドとして使用した、シンプルなブログ投稿アプリケーションです。ユーザーは投稿の作成、閲覧、更新、削除（CRUD操作）を行うことができます。

## デモ

![アプリケーションデモ](blog_app.gif)

上記のGIFは、アプリケーションの主要な機能を示しています：
- ホームページの表示
- 投稿一覧の閲覧
- 新規投稿の作成
- 投稿の更新と削除

## 機能

- 投稿一覧の表示
- 新規投稿の作成
- 個別投稿の表示
- 投稿の更新
- 投稿の削除

## 技術スタック

### バックエンド
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic

### フロントエンド
- React
- React Router
- Axios (APIリクエスト用)
- Tailwind CSS (スタイリング)

## セットアップ

### バックエンド

1. プロジェクトのルートディレクトリに移動します。
2. 仮想環境を作成し、アクティベートします：
   ```
   python -m venv venv
   source venv/bin/activate  # Windowsの場合: venv\Scripts\activate
   ```
3. 必要なパッケージをインストールします：
   ```
   pip install fastapi uvicorn sqlalchemy databases
   ```
4. バックエンドサーバーを起動します：
   ```
   uvicorn main:app --reload
   ```

バックエンドサーバーは `http://localhost:8000` で実行されます。

### フロントエンド

1. 別のターミナルウィンドウを開き、`frontend` ディレクトリに移動します。
2. 必要なパッケージをインストールします：
   ```
   npm install
   ```
3. フロントエンド開発サーバーを起動します：
   ```
   npm start
   ```

フロントエンド開発サーバーは `http://localhost:3000` で実行されます。

## 使用方法

1. ブラウザで `http://localhost:3000` にアクセスします。
2. ナビゲーションバーを使用して、投稿一覧の表示、新規投稿の作成、個別投稿の表示などの操作を行います。

## API エンドポイント

- GET `/posts`: すべての投稿を取得
- POST `/posts`: 新規投稿を作成
- GET `/posts/{post_id}`: 特定の投稿を取得
- PUT `/posts/{post_id}`: 特定の投稿を更新
- DELETE `/posts/{post_id}`: 特定の投稿を削除

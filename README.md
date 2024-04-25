# bbs-test

- [bbs-test](#bbs-test)
  - [技術構成](#技術構成)
- [使い方](#使い方)
  - [URL](#url)
  - [パッケージのインストール](#パッケージのインストール)
  - [コンテナの立ち上げ](#コンテナの立ち上げ)
  - [pnpm prisma generate](#pnpm-prisma-generate)
  - [DB Migrate](#db-migrate)
  - [DB seed](#db-seed)
  - [開発環境起動](#開発環境起動)
  - [ユーザー情報登録(手動 :bow:)](#ユーザー情報登録手動-bow)
  - [テスト](#テスト)
  - [以上](#以上)
    - [できていないこと](#できていないこと)
    - [やっておきたいこと](#やっておきたいこと)

## 技術構成

- 言語

  - Typescript

- Frontend

  - Next.js v14
  - React v18
  - tailwind v3.4.3
  - firebase v10
  - URQL v4
  - Zod v23
  - ReactHookForm v7

- Backend

  - NestJS v10
  - Firebase Admin
  - class-alidator
  - class-transfomer
  - jest

- DB

  - PostgreSQL16

- ORM

  - Prisma

- API

  - GraphQL v16.8

- 構成

  - Turborepo

- 認証
  - firebase emulator

# 使い方

### URL

frontend: http://localhost:3000

firebase emulator: http://localhost:4000

## パッケージのインストール

```shell
> pnpm i
```

## コンテナの立ち上げ

```shell
> docker compose up
```

## pnpm prisma generate

```shell
> pnpm prisma:generate
```

## DB Migrate

```shell
> pnpm db:migrate
```

## DB seed

```shell
> pnpm db:seed
```

## 開発環境起動

```shell
> pnpm dev
```

## ユーザー情報登録(手動 :bow:)

- firebase emulato に入ってユーザーを登録します。

1. http://localhost:4000 にアクセス
2. 丸にアクセス
   ![alt text](./images/image.png)
3. Add user
   ![alt text](./images/image-1.png)
4. Email, Password を入力して Save
   ![alt text](./images/image-2.png)

## テスト

```shell
> pnpm test
```

## 以上

### できていないこと

- 全文検索
- フロントエンドのテスト

### やっておきたいこと

- バックエンドのエラー戦略

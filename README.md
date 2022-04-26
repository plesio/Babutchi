# 育児イベント記録装置 Babu Client 「ばぶっち」

<img width="400" alt="image" src="https://user-images.githubusercontent.com/10129511/163509688-79d3895e-337e-4536-91fe-e006facfadec.png">

スマホアプリに依存しない、React ベースの育児イベント記録装置。

## 簡単な仕組み

1. ばぶっちで展開したイベントボタンを押す。
2. ばぶっち上でイベントデータを生成して、指定した GAS の POST URL に投げる。
3. GAS で処理をして、スプレッドシートに記録される。

## 要求環境

- Http サーバー
  - PC を常駐しても良いし、家の中に Apache2 を立てても良い。
  - 私は、用途を終えた Android に nanohttpd を内包した自作 App を立ち上げて常駐している。
- Google Spreadsheet
  - イベントの記録用。
- GAS(Google Apps Script)
  - イベントデータを POST で受け付ける URL をこいつで制御する。

## 制限事項

- 記録系を Google に依存している。
  - この部分は、他サービスでもかまわない。
- POST URL へのアクセスについて、セキュリティを無視しているので、可能な限りローカルで運用するべき。
  - アクセスが容易ではない URL であれば、AWS EC2 の無料枠にデプロイするなどでも良いかもしれない。
- 実際に育児が始まって、使いながら不便なところを直そうと思ったら、育児は自分の時間が取れない。直せない。仕方ないから公開までして放置する。

## 最短運用方法

### SpreadSheet の用意

Google Spreadsheet の記録したいシートを用意。

### GAS の用意

作った SpreadSheet から「拡張機能」→「GAS」で、GAS を関連付けた状態で開く。

新規の.gs を起こして、

> ext_src/babu_report.js

の中身をコピーする。 ついでにその中の SHEET_NAME の定数を記録したいシート名に書き換える。

その gs ファイルをデプロイして、URL を生成する。 デプロイする際、実行ユーザーは自分自身にしないと、POST 要求時にログインを要求されてばぶっち上から気軽に使えない。

### ばぶっちの修正

> post_url.json

の "url" を GAS でデプロイした URL に書き換える。

### 使い方

- npm i
- npm run export
- npm run serve

export で HTML が out ディレクトリに格納されるので、それをつかってよしなに。

# MEMO: vite(build SPA) -> nextjs(build Static HTML export)

ビルド結果を表示するときに使用する転送量

- vite : 要求 7 件 / 548.85 KB / 549.90 KB 転送済み
- nextjs : 要求 12 件 / 530.13 KB / 150.14 KB 転送済み

となって、総サイズ量が減ったので乗り換えてみた。（どのみち nanoHttpd 使うとキャッシュの概念がないから、常に全ファイル取ってくる挙動になるけど）

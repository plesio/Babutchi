# 育児イベント記録装置 Babu Client 「ばぶっち」

<img width="400" alt="image" src="https://user-images.githubusercontent.com/10129511/163509688-79d3895e-337e-4536-91fe-e006facfadec.png">

スマホアプリに依存しない、Reactベースの育児イベント記録装置。

## 簡単な仕組み

1. ばぶっちで展開したイベントボタンを押す。
2. ばぶっち上でイベントデータを生成して、指定したGASのPOST URLに投げる。
3. GASで処理をして、スプレッドシートに記録される。

## 要求環境

- Httpサーバー
    - PCを常駐しても良いし、家の中にApache2を立てても良い。
    - 私は、用途を終えたAndroidにnanohttpdを内包した自作Appを立ち上げて常駐している。
- Google Spreadsheet
    - イベントの記録用。
- GAS(Google Apps Script)
    - イベントデータをPOSTで受け付けるURLをこいつで制御する。

## 制限事項

- 記録系をGoogleに依存している。
    - この部分は、他サービスでもかまわない。
- POST URL へのアクセスについて、セキュリティを無視しているので、可能な限りローカルで運用するべき。
    - アクセスが容易ではないURLであれば、AWS EC2の無料枠にデプロイするなどでも良いかもしれない。
- 実際に育児が始まって、使いながら不便なところを直そうと思ったら、育児は自分の時間が取れない。直せない。仕方ないから公開までして放置する。

## 最短運用方法

### SpreadSheetの用意

Google Spreadsheet の記録したいシートを用意。

### GASの用意

作ったSpreadSheetから「拡張機能」→「GAS」で、GASを関連付けた状態で開く。

新規の.gsを起こして、

> ext_src/babu_report.js

の中身をコピーする。 ついでにその中の SHEET_NAME の定数を記録したいシート名に書き換える。

そのgsファイルをデプロイして、URLを生成する。 デプロイする際、実行ユーザーは自分自身にしないと、POST要求時にログインを要求されてばぶっち上から気軽に使えない。

### ばぶっちの修正

> post_url.json

の "url" をGASでデプロイしたURLに書き換える。

### 使い方

- npm i
- npm run export
- npm run serve

export で HTMLが out ディレクトリに格納されるので、それをつかってよしなに。

# Fixme / Todo

## vite(build SPA) -> nextjs(build Static HTML export)

ビルド結果を表示するときに使用する転送量
- vite : 要求 7 件 / 548.85 KB / 549.90 KB 転送済み
- nextjs : 要求 12 件 / 530.13 KB / 150.14 KB 転送済み

となって、少し速くなったので乗り換えてみた。
# 育児イベント記録装置 Babu Client 「ばぶっち」

![image_shot](https://user-images.githubusercontent.com/10129511/165226971-7c09bd3b-0daa-421b-8f53-ddb0ed3da17b.png)

スマホアプリに依存しない、React ベースの育児イベント記録装置。

## Vercel App の使い方

とりあえず、ext_srcのソースをGAS上にデプロイして実行URLをばぶっちに登録すれば動作する。

## 簡単な動作の概要

1. ばぶっちで展開したイベントボタンを押す。
2. ばぶっち上でイベントデータを生成して、指定した GAS の POST URL に投げる。
3. GAS で処理をして、スプレッドシートに記録される。

## 要求環境（ローカル運用時）

- Http サーバー
  - PC を常駐しても良いし、家の中に Apache2 を立てても良い。
  - 私は、用途を終えた Android に nanohttpd を内包した自作 App を立ち上げて常駐している。
- Google Spreadsheet
  - イベントの記録用。
- GAS(Google Apps Script)
  - イベントデータを POST で受け付ける URL をこいつで制御する。

## 制限事項

- 記録系を Google の スプレッドシート／GAS に依存している。
  - この部分は、他サービスでもかまわないが、実行URLの仕様と挙動に応じて修正が必要。
- GASの実行URLをばぶっちが知るために、LocalStorageに保存する挙動にしている。
  - こういう実装が嫌なら、ローカル運用にして。
- 実際に育児が始まって、使いながら不便なところを直そうと思ったら、育児は自分の時間が取れない。直せない。仕方ないから公開までして放置する。
  - 育児って大変ね。

## 運用までの流れ

### SpreadSheet の用意

Google Spreadsheet の記録したいシートを用意。

### GAS の用意

作った SpreadSheet から「拡張機能」→「GAS」で、GAS を関連付けた状態で開く。

新規の.gs を起こして、ソースに含まれている。

> ext_src/babu_report.js

の中身をコピーする。 ついでにその中の SHEET_NAME の定数を記録したいシート名に書き換える。

その gs ファイルをデプロイして、URL を生成する。 デプロイする際、実行ユーザーは自分自身にしないと、POST 要求時にログインを要求されてばぶっち上から気軽に使えない。

### 実行URLの設定


1. ばぶっちの右上の歯車を押す
2. ONLINEに色が付いていることを確認する。(LOCALに変えない)
3. テキストフィールドが置いてあるのでそこに先のURLをペーストして、保存ボタンを押す。

念のためリロードしたら、メインのイベントボタンが動作するはず。

## ローカルで運用する場合の流れ

### release.zip の DL

リリースから最新を落として、各種 html,js と post_url.json が入っていることを確認する。
これらは、static exportの結果を格納しているので、通常のHTMLサーバーがあれば動作する。

post_url.json は後述するが、中身を修正する必要がある。

### 利用するためのファイル修正

> post_url.json

の "url" を GAS でデプロイした URL に書き換える。

### どこかにデプロイする

単純にVS CODEとかを使って簡単なHTTPサーバーを建てる程度でいいと思っている。

前述の通り、セキュリティ無視した設計になっているので、配置したjson直接盗られると、変なPostがスプレッドシートに記録されうる。

ちなみに、一度ブラウザに展開してリロードされない限りは、外出先でもボタンは動く。

### ばぶっちの設定

歯車で出てくる設定の「LOCAL」に色が付いている状態にする。
LOCALモードは、post_url.jsonを取りに行く挙動となる。（面倒なら、実装レベルでLOCAL状態を強制してビルドしても良いとおもう、私はそうしている）

以上

# ビルド方法

- npm i
- npm run export

export で HTML が out ディレクトリに格納されるので、それをつかってよしなに。

- npm run serve

や

- npm run dev

で動作を見ることが可能。ここらへんは nextjs の挙動のまま。

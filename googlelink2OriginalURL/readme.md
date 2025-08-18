## googlelink2OriginalURL
Google検索画面から直接ページリンクをコピーしようとすると、Googleによるリダイレクトがついてきて恐ろしく長いURLになります。

たとえば、

> https://dic.pixiv.net/a/君はじつに馬鹿だな

をGoogle検索画面から直接コピーしようとすると、

> https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiW-M6025SPAxVAsFYBHV5oLDMQFnoECCAQAQ&url=https%3A%2F%2Fdic.pixiv.net%2Fa%2F%25E5%2590%259B%25E3%2581%25AF%25E3%2581%2598%25E3%2581%25A4%25E3%2581%25AB%25E9%25A6%25AC%25E9%25B9%25BF%25E3%2581%25A0%25E3%2581%25AA&usg=AOvVaw0Mts-6YTTiT3kA1RxNFqeJ&cshid=1755532367673185&opi=89978449

のようにとても長くなってしまいます。

このツールを使うと、このように検索エンジンによる冗長なリンクを復元し、元のURLを出力してくれます。

yt-dlpやwgetのようなコマンドラインへの入力など、確実に元のリンクが必要になってくるようなシチュエーションに役立つと思います(想像)。

## How to Use
テキストボックスにURLを入力し、復元ボタンを押すだけです。

なお、テキストボックスの先頭に空白が入ってしまったりすると正しく検出できません

## 対応エンジン
- Google

現在はGoogleのみですが、今後より対応させる予定です。

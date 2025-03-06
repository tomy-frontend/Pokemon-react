// ************
// ポケモンAPIからポケモンのデータを取得する関数
// ************

// APIエンドポイントURLにfetchしてデータを取得する関数
export const getAllPokemon = async (url) => {
  try {
    const res = await fetch(url); // 引数で渡ってきたurlに接続して変数resに格納する
    const data = await res.json(); // 渡ってきたurlから取得したデータをjson形式に変換したものを変数dataに格納する
    return data; //そのdataを返す

    // エラーが発生した場合の処理
  } catch (e) {
    console.log("データ取得中にエラーが発生しました。", e);
    throw e; // エラーを再度投げることで、関数を呼び出した側にもエラーを伝えることができる
  }
};

// 取得したjson形式のポケモンデータの詳細データを取得する関数
// getPokemon.urlがurlに入る
export const getPokemon = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (e) {
    console.log("ポケモンの詳細データ取得中にエラーが発生しました。", e);
    throw e;
  }
};

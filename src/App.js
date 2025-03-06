import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon } from "./utils/pokemon";

function App() {
  // pokeAPIの基本のURLを変数に格納
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true); // ローディング状態の管理

  // useEffectの第二引数を[]にすることで、初回レンダリング時のみ発火
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        // すべてのポケモンデータを取得
        let res = await getAllPokemon(initialURL);
        console.log(res);
        setLoading(false); // データ取得完了でfalse
      } catch (e) {
        console.error("App.jsでエラーをキャッチしました", e);
      }
    };
    fetchPokemonData();
  }, []);

  return (
    <div className="App">
      <h1>ポケモン図鑑アプリ</h1>
      {loading ? (
        <h2>ロード中・・・</h2>
      ) : (
        <h2>ポケモンデータを取得しました。</h2>
      )}
    </div>
  );
}

export default App;

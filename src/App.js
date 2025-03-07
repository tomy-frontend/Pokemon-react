import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import Card from "./components/Card/Card";
import { Navbar } from "./components/Navbar/Navbar";

function App() {
  // pokeAPIの基本のURLを変数に格納
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true); // ローディング状態の管理
  const [pokemonData, setPokemonData] = useState([]);

  // useEffectの第二引数を[]にすることで、初回レンダリング時のみ発火
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        // すべてのポケモンデータを取得
        let res = await getAllPokemon(initialURL);

        // 各ポケモンの詳細なデータを取得
        loadPokemon(res.results);
        console.log(res);
        setLoading(false); // データ取得完了でfalse
      } catch (e) {
        console.error("App.jsでエラーをキャッチしました", e);
      }
    };
    fetchPokemonData();
  }, []);

  // 詳細なポケモンデータを取得する
  // Promise.all([])の形で _pokemonDataには[]の形でデータが入る、
  // それをさらにsetPokemonData([])のように配列を入れてpokemonDataを更新する。
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url); // 一つ一つのポケモンのURL
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  // ページ遷移
  const handlePrevPage = () => {};
  const handleNextPage = () => {};

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h2>ロード中・・・</h2>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;

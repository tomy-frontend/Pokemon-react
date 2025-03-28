import { useEffect, useState } from "react";
import "./App.css";
import {
  getAllPokemon,
  getPokemon,
  PokemonDetail,
  PokemonBasic,
} from "./utils/pokemon";
import Card from "./components/Card/Card";
import { Navbar } from "./components/Navbar/Navbar";

function App() {
  // pokeAPIの基本のURLを変数に格納
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState<boolean>(true); // ローディング状態の管理,trueの場合はローディング中
  const [pokemonData, setPokemonData] = useState<PokemonDetail[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);

  // useEffectの第二引数を[]にすることで、初回レンダリング時のみ発火
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        // すべてのポケモンデータを取得
        let res = await getAllPokemon(initialURL);

        // 各ポケモンの詳細なデータを取得
        loadPokemon(res.results);
        setNextUrl(res.next); // 次のポケモンのURLが入る
        setPrevUrl(res.previous); // 前のポケモンのURLが入る(1ページ目はnull)
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
  const loadPokemon = async (data: PokemonBasic[]) => {
    try {
      let _pokemonData = await Promise.all(
        data.map((pokemon) => {
          let pokemonRecord = getPokemon(pokemon.url); // 一つ一つのポケモンのURL
          return pokemonRecord;
        }),
      );
      setPokemonData(_pokemonData);
    } catch (e) {
      console.error("ポケモンデータの読み込み中にエラーが発生しました", e);
      setLoading(false); // エラー時にローディング状態を解除
    }
  };

  // ページ遷移
  // 次のページへ
  const handleNextPage = async () => {
    if (!nextUrl) return;

    setLoading(true);
    let data = await getAllPokemon(nextUrl); // 取得したデータの中に次のポケモン20匹のデータURLが入っているのでそれがnextUrlに入っている
    await loadPokemon(data.results); // 新しいポケモンデータのresultsの中にそれぞれのポケモンのデータが入っているのでそれを引数に渡すと、ポケモンの詳細データを出力することができる
    setNextUrl(data.next); // 取得したデータの中のnextというパラメーターの中にさらに次のページの情報があるのでそれでnextUrlを更新してあげる
    setPrevUrl(data.previous);
    setLoading(false);
  };

  // 前のページへ
  const handlePrevPage = async () => {
    if (!prevUrl) return; // 1ページ目はnullのため終了させる

    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <div className="loading">
            <h2>ロード中・・・</h2>
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            <div className="btn">
              <button onClick={handlePrevPage} disabled={!prevUrl}>
                prev
              </button>
              <button onClick={handleNextPage} disabled={!nextUrl}>
                next
              </button>
            </div>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon) => {
                return <Card key={pokemon.id} pokemon={pokemon} />;
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;

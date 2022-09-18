import { useState, useEffect} from 'react';
import './styles/main.css';
import logoImage from './assets/logo-nlw-esports.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import * as Dialog from '@radix-ui/react-dialog'
import { CreateAdModal } from './components/CreateAdModal';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

/**
 *  <Game[]> é proprio do Typescript, está falando que o state tem como parâmetro
 *  um array de games
 *  Map no JS percorre o array e retorna alguma coisa deste array de games
 *  React pede uma key quando percorre um map
 *  fetch() method that provides an easy, logical way to fetch resources 
 *  asynchronously across the network.
 *  Shift+alt+i seleciona todas as linhas ao mesmo tempo
 *  Next Steps--------------
 *  Deixar responsivo 
 *  Criar uma validação melhor 
 *  Keen Slider => Carrousel
 *  React-Hook Form => Validation
 *  Autenticação usando o discord dela
 */
function App() {
  const [ games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/games')
    .then(response => response.json())
    .then(data=>{
      setGames(data)
    })
  },[]);


  return (


    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImage} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui!
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game => {
          return (
            <GameBanner 
            key={game.id}
            bannerUrl={game.bannerUrl} 
            title={game.title} 
            adsCount={game._count.ads}
            />
          )
        })}
      </div>

      <Dialog.Root>
        
      <CreateAdBanner/>
      <CreateAdModal/>

      </Dialog.Root>

    </div>
  )


}

export default App

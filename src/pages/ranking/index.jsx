// React
import { useEffect, useState } from 'react';
// Services
import { getRanking } from '../../services/firebase';
// Components
import RankingTable from '../../components/ranking-table';
import Loading from '../../components/loading';

export default function Ranking() {
  const [rankingList, setRankingList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const response = await getRanking();
      setRankingList(response);
      setLoading(false);
    })();
  }, []);

  const thead = ['SIRA', 'İSİM', 'KATEGORİ', 'PUAN'];
  const tbody = rankingList;
  const title = 'Oyuncu Sıralaması';

  return (
    <div className='ranking-page'>
      <span></span>
      {loading && <Loading />}
      {!loading && <RankingTable title={title} thead={thead} tbody={tbody} />}
    </div>
  );
}

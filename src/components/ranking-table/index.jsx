import style from './style.module.css';

export default function RankingTable({ title, thead, tbody }) {
  const categoryConvert = (cat) => {
    let array = cat.split('-')
    let newCategory = array[0];
    let newOrigin = array[array.length-1];
    newCategory = newCategory === 'movies' ? 'Filmler' : newCategory === 'tv' ? 'Diziler' : 'Karışık';
    newOrigin = newOrigin === 'local' ? 'Yerli' : 'Global';
    return `${newCategory} / ${newOrigin}`;
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>{title}</h2>
      <table>
        <thead>
          <tr>
            {thead.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tbody.map(({ name, category, score }, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{name}</td>
              <td>{categoryConvert(category)}</td>
              <td>{score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

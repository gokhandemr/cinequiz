import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className='not-found-page'>
      <span></span>
      <div>
        <h2>404</h2>
        <p>Aradığın Sayfayı Bulamadık!</p>
        <Link to='/'>Anasayfa</Link>
      </div>
    </div>
  );
}

import React from 'react';

export default function HowToPlay() {
  return (
    <div className='how-to-play-page'>
      <span></span>
      <h2>NASIL OYNANIR?</h2>
      <p>Film ve dizi dünyasına hoş geldin! Bu eğlenceli oyunda amacın, sana gösterilen karelerin hangi film veya diziye ait olduğunu tahmin etmek. Unutma, ne kadar hızlı ve doğru tahmin edersen, o kadar çok puan kazanırsın!</p>

      <div>
        <h3>Kurallar</h3>
        <p>
          <strong>Can (5 adet):</strong> Her yanlış tahminde bir canın azalır. Canların bittiğinde oyun sona erer. Doğru tahminler yaparak canlarını koru!
        </p>
        <p>
          <strong>Pas Hakkı (3 adet):</strong> Tahmin etmekte zorlanıyor musun? Üç kereye mahsus pas hakkını kullanarak bir sonraki kareye geçebilirsin. Ama unutma, pas hakkını dikkatli kullan!
        </p>
        <p>
          <strong>Farklı Bir Kare (Joker):</strong> Takıldın mı? Bu joker hakkını kullanarak film veya diziye ait farklı bir kare daha görebilirsin.
        </p>
        <p>
          <strong>Karmakarışık Ad (Joker):</strong> Cevabı biliyorsun ama tam çıkaramıyor musun? Bu joker hakkı, film veya dizi isminin harflerini karıştırarak sana yardımcı olabilir.
        </p>
      </div>

      <div>
        <h3>Puan Sistemi</h3>
        <p>
          <strong>Doğru Tahmin:</strong> Her doğru tahmin için, ekstra puandan bağımsız olarak, skor tabelana +10 puan eklenir.
        </p>
        <p>
          <strong>Ekstra Puan:</strong> Her yeni soruyla beraber sayaçta başlar ve doğru tahmini ne kadar kısa sürede yaparsan, ekstra puan kazanırsın. İlk 5 saniye içinde doğru tahmine +10, 5-10 saniye arasında doğru tahmin: +5 ekstra puan kazanırsın. 10 saniyeden sonrasıiçin ekstra puan yok, ama yine de doğru bildin!
        </p>
      </div>
    </div>
  );
}

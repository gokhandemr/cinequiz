import React from "react";
// Images
import image from "../../assets/home-page-image.jpg";
// Components
import Header from "../../components/header";
import Footer from "../../components/footer";
import PagesBackground from "../../components/pages-background";

export default function HowToPlay() {
  const language = localStorage.getItem("language") || "tr";

  return (
    <>
      <PagesBackground image={image} />
      <Header />
      <div className="wrapper text-page">
        <h2>{language === "tr" ? "Nasıl Oynanır ?" : "How to play?"}</h2>

        {language === "tr" ? (
          <div>
            <div style={{width: "45%"}}>
              <h3>Amaç</h3>
              <p>Verilen bilgiler aracılığıyla doğru filmleri veya dizileri tahmin etmek.</p>
              <h3>Can ne işe yarar ?</h3>
              <p>Oyun başlarken toplamda 100 can puanı ile başlarsınız. Her yanlış tahminde veya ipuçları kullanımında canınız düşer. Can "0" olduğunda oyun bitmiş olur.</p>
              <h3>Puan Sistemi</h3>
              <p>Doğru tahmininizde "Toplam Skor" alanına +1 puan olarak eklenirken, yanlış tahminler canınızdan -5 puan götürür.</p>
            </div>

            <div style={{width: "45%"}}>
              <h3>İpuçları Kullanımı ve Maliyetleri</h3>
              <p>
                Toplamda 3 adet ipucu verilmektedir. Bu ipuçlarını kullanmanın maliyetleri bulunur.
                <br />
                <strong>"İpucu Göster"</strong> butonu sırasıyla film/diziye ait "Yapım yılı, Yönetmen, Oyuncular ve Etiketler" bilgisini verir. Unutmayın her kullanımda canınızdan -2 puan alır.
                <br />
                <strong>"Resmi Değiştir"</strong> butonu ekrandaki film/diziye ait resimi yenisiyle değiştirir fakat canınızdan -3 puanın düşmesine neden olur.
                <br />
                <strong>"Klibi Oynat"</strong> butonu eğer film/diziye ait bir klip bulunuyorsa izlemenizi sağlar fakat canınızdan -5 puanın düşmesine neden olur.
              </p>

              <h3>Pas Hakkı</h3>
              <p>Oyuncunun zorlandığı bir durumda maksimum 5 defa kullanabileceği Pas butonu bulunur. Pas hakkı can götürmez!</p>
            </div>
          </div>
        ) : (
          <div>
            <div style={{width: "45%"}}>
              <h3>Purpose</h3>
              <p>To guess the correct movies or series based on the given information.</p>
              <h3>What Does Life Do?</h3>
              <p>You start the game with a total of 100 life points. With each incorrect guess or use of a hint, your life points decrease. When your life points reach "0," the game ends.</p>
              <h3>Scoring System</h3>
              <p>Each correct guess adds +1 point to the "Total Score" field, while incorrect guesses deduct -5 points from your life.</p>
            </div>

            <div style={{width: "45%"}}>
              <h3>Hints and Costs</h3>
              <p>
                You are given a total of 3 hints. Using these hints comes at a cost.
                <br />
                <strong>The "Show Hint" button</strong> reveals information about the movie/series in order: "Release Year, Director, Cast, and Tags." Each hint usage costs -2 life points.
                <br />
                <strong>The "Change Image" button</strong> replaces the current image of the movie/series with a new one but costs -3 life points.
                <br />
                <strong>The "Play Clip" button</strong>, if available, plays a clip from the movie/series, costing -5 life points.
              </p>
              <h3>Pass Option</h3>
              <p>If the player encounters a difficult guess, they have a maximum of 5 pass options available. Using a pass does not cost any life points!</p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

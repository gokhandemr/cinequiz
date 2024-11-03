import React from "react";
// Images
import image from "../../assets/home-page-image.jpg";
// Components
import PagesBackground from "../../components/pages-background";
import PagesText from "../../components/pages-text";
import PlayButton from "../../components/home-play-button";
import Header from "../../components/header";
import Footer from "../../components/footer";

export default function Home() {
  const language = localStorage.getItem("language") || "tr";

  const title = {tr: "Film / Dizi Dünyasına Hoş Geldiniz! 🎬", eng: "Welcome to the Movie / TV Series World! 🎬"};
  const description = {
    tr: "Film ve dizi dünyasında ne kadar iyi olduğunuzu kanıtlamaya hazır mısınız? Karelere dikkatlice bakın, tahmininizi yapın ve en yüksek puanı kazanmaya çalışın. Her doğru tahmin sizi zirveye bir adım daha yaklaştıracak, ipuçlarını stratejik kullanmayı unutmayın! İyi şanslar ve bol eğlenceler!",
    eng: "Are you ready to prove how well you know the world of movies and series? Look carefully at each frame, make your guess, and try to score the highest points. Each correct guess brings you one step closer to the top, so don’t forget to use hints strategically! Good luck and have fun!",
  };

  return (
    <>
      <PagesBackground image={image} />
      <Header />
      <div className="wrapper" style={{justifyContent: "center"}}>
        <PagesText isHomePage={true} title={language === "tr" ? title.tr : title.eng} description={language === "tr" ? description.tr : description.eng} />
        <PlayButton />
      </div>
      <Footer />
    </>
  );
}

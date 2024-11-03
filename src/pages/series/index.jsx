import {useEffect, useState} from "react";
// Image
import image from "../../assets/series-page-image.jpg";
import image2 from "../../assets/tv-series-image-2-min.jpg";
import image3 from "../../assets/tv-series-image-3-min.jpg";

// Services
import {getCategories} from "../../services";
// Components
import PagesBackground from "../../components/pages-background";
import PagesText from "../../components/pages-text";
import Categories from "../../components/categories";
import Loading from "../../components/loading";
import Header from "../../components/header";
import Footer from "../../components/footer";

export default function Series() {
  let randomCount = Math.floor(Math.random() * 3);
  const language = localStorage.getItem("language") || "tr";

  const [categories, setCategories] = useState([]);
  const title = {tr: "Kategoriler", eng: "Categories"};
  const description = {
    tr: "Hoş geldiniz! Bu oyunda dizi kategorileri arasından birini seçip, diziyi görsellerinden ve diğer ipuçlarından tahmin etmeye çalışacaksınız. Her doğru tahmin size puan kazandırırken, yanlış tahminler canlarınızı tüketecek. Tüm film tutkunları arasında en iyisi olup olmadığınızı kanıtlayabilirsiniz. Hazır mısınız? İyi şanslar!",
    eng: "Welcome! In this game, you’ll choose a TV series category and try to guess the show from its images and other clues. Each correct guess will earn you points, while incorrect guesses will cost you lives. Prove if you're the best among all TV show enthusiasts. Are you ready? Good luck!",
  };

  useEffect(() => {
    (async () => {
      const response = await getCategories("tv");
      response.genres && setCategories(response.genres);
    })();
  }, []);

  return (
    <>
      <PagesBackground image={randomCount === 0 ? image : randomCount === 1 ? image2 : image3} />

      <Header />
      <div className="wrapper">
        {categories.length > 0 ? (
          <>
            <PagesText title={language === "tr" ? title.tr : title.eng} description={language === "tr" ? description.tr : description.eng} />
            <Categories categories={categories} isMovie={false} />
          </>
        ) : (
          <Loading />
        )}
      </div>
      <Footer />
    </>
  );
}

import {useEffect, useState} from "react";
// Services
import {getCategories} from "../../services";
// Image
import image from "../../assets/movies-page-image-3.jpg";
import image2 from "../../assets/movie-page-image-2-min.jpg";
import image3 from "../../assets/movie-page-image-3-min.jpg";
// Components
import PagesBackground from "../../components/pages-background";
import Categories from "../../components/categories";
import PagesText from "../../components/pages-text";
import Loading from "../../components/loading";
import Header from "../../components/header";
import Footer from "../../components/footer";

export default function Movies() {
  let randomCount = Math.floor(Math.random() * 3);
  const language = localStorage.getItem("language") || "tr";

  const [categories, setCategories] = useState([]);
  const title = {tr: "Kategoriler", eng: "Categories"};
  const description = {
    tr: "Hoş geldiniz! Bu oyunda film kategorileri arasından birini seçip, film karelerini tahmin etmeye çalışacaksınız. Her doğru tahmin size puan kazandırırken, yanlış tahminler canlarınızı tüketecek. Tahminlerinizi hızlı yaparak ek puan kazanabilir, tüm film tutkunları arasında en iyisi olup olmadığınızı kanıtlayabilirsiniz. Hazır mısınız? İyi şanslar!",
    eng: "Welcome! In this game, you’ll choose a film category and try to guess the movie scenes. Every correct guess will earn you points, while incorrect guesses will cost you lives. By making quick guesses, you can earn bonus points and prove if you're the best among all movie enthusiasts. Are you ready? Good luck!",
  };

  useEffect(() => {
    (async () => {
      const response = await getCategories("movie");
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
            <Categories categories={categories} isMovie={true} />
          </>
        ) : (
          <Loading />
        )}
      </div>
      <Footer />
    </>
  );
}

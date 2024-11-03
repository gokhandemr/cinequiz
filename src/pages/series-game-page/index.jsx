import React, {useEffect, useState} from "react";
// Router DOM
import {useNavigate, useParams} from "react-router-dom";
// Services
import {getProductionCredits, getProductionDetails, getProductionImages, getProductions, getProductionsByCountry, getProductionsByTopRated} from "../../services";
// Components
import Loading from "../../components/loading";
import GameButtons from "../../components/game-buttons";
import GameRemainingLives from "../../components/game-remaining-lives";
import EndGameBox from "../../components/end-game-box";
import ProductionImage from "../../components/production-image";
import ProductionDetails from "../../components/production-details";
import ProductSearchForm from "../../components/product-search-form";
import Header from "../../components/header";

export default function SeriesGamePage() {
  const navigate = useNavigate();
  const params = useParams();
  const bestScore = localStorage.getItem(`series/${params.category}`) ? localStorage.getItem(`series/${params.category}`) : 0;

  const pageContainer = {
    justifyContent: "space-between",
    background: "#212122",
    padding: "12px",
    width: "100%",
    maxWidth: "990px",
    height: "auto",
    minHeight: "auto",
    borderRadius: "4px",
  };

  const [productions, setProductions] = useState([]);
  const [production, setProduction] = useState(null);

  const [pageCount, setPageCount] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [productionCount, setProductionCount] = useState(0);
  const [productionTips, setProductionTips] = useState(false);
  const [productionImageCount, setProductionImageCount] = useState(0);

  const [gameScore, setGameScore] = useState(0);
  const [remainingGameLives, setRemainingGameLives] = useState(100);
  const [remainingPassLives, setRemainingPassLives] = useState(5);

  const [inputValue, setInputValue] = useState("");

  productions.length > 0 && productionCount >= productions.length && (setPageCount((prev) => prev + 1), setProductionCount(0));
  production && productionImageCount >= production.filteredImages.length - 1 && (setProductionImageCount(0), alert("Hepsini gördünüz.."));

  useEffect(() => {
    (async () => {
      setProduction(null);
      let responseSeries = [];
      if (params.category === "tr") {
        responseSeries = await getProductionsByCountry(false, pageCount);
      } else if (params.category === "top-rated") {
        responseSeries = await getProductionsByTopRated(false, pageCount);
        let filteredSeries = responseSeries && responseSeries.results.filter((product) => product.original_language !== "ja" && product.original_language !== "ko" && product);
        responseSeries.results = filteredSeries;
      } else {
        responseSeries = await getProductions(false, pageCount, params.category);
      }
      setTotalPage(responseSeries && responseSeries.total_pages);
      setProductions(responseSeries && responseSeries.results);
      if (responseSeries.results.length > 0) {
        const responseDetails = await getProductionDetails(false, responseSeries.results[productionCount].id);
        if (responseDetails.id) {
          const responseCredits = await getProductionCredits(false, responseSeries.results[productionCount].id);
          if (responseCredits.id) {
            const responseImages = await getProductionImages(false, responseSeries.results[productionCount].id);
            console.log(responseImages);
            const filteredImages = responseImages && responseImages.backdrops.filter((image) => image.iso_639_1 === null && image);
            if (responseImages.backdrops && filteredImages.length > 1) {
              const responseAllDetails = {responseDetails, responseCredits, filteredImages};
              setProduction(responseAllDetails);
            } else {
              console.log("Error: responseImages");
              setProductionCount((prev) => prev + 1);
            }
          } else {
            console.log("Error: responseCredits");
            setProductionCount((prev) => prev + 1);
          }
        } else {
          console.log("Error: responseDetails");
          setProductionCount((prev) => prev + 1);
        }
      } else {
        console.log("Error: responseSeries");
        navigate("/404");
      }
    })();
  }, [productionCount, params]);

  useEffect(() => {
    if (remainingGameLives < 0) {
      alert("Game Over :(");
      setProduction(null);
    }
  }, [remainingGameLives]);

  console.log(totalPage);

  return (totalPage !== null && pageCount >= totalPage - 1) || remainingGameLives <= 0 ? (
    <EndGameBox gameScore={gameScore} bestScore={bestScore} categoryId={`series/${params.category}`} />
  ) : production ? (
    <>
      <Header isGamePage={true} />
      <div className="wrapper" style={pageContainer}>
        <GameRemainingLives gameScore={gameScore} remainingGameLives={remainingGameLives} bestScore={bestScore} />

        {productionTips ? (
          <ProductionDetails
            releaseDate={production.responseDetails.first_air_date}
            tagline={production.responseDetails.tagline}
            actors={production.responseCredits.cast.slice(0, 6)}
            productionTips={productionTips}
            setProductionTips={setProductionTips}
            productionTitle={production.responseDetails.name}
            image={production.filteredImages[productionImageCount].file_path}
          />
        ) : (
          <ProductionImage image={production.filteredImages[productionImageCount].file_path} />
        )}

        <GameButtons
          setGameScore={setGameScore}
          setRemainingGameLives={setRemainingGameLives}
          remainingGameLives={remainingGameLives}
          productionTips={productionTips}
          setProductionTips={setProductionTips}
          setProductionImageCount={setProductionImageCount}
          productionImagesLength={production.filteredImages.length}
          productionTitle={production.responseDetails.name}
          productionOriginalTitle={production.responseDetails.original_name}
          remainingPassLives={remainingPassLives}
          setRemainingPassLives={setRemainingPassLives}
          setInputValue={setInputValue}
          setProductionCount={setProductionCount}
        />

        <ProductSearchForm
          inputValue={inputValue}
          setInputValue={setInputValue}
          productTitle={production.responseDetails.name}
          productOriginalTitle={production.responseDetails.original_name}
          setProductionCount={setProductionCount}
          setGameScore={setGameScore}
          setRemainingGameLives={setRemainingGameLives}
          setProductionImageCount={setProductionImageCount}
          setProductionTips={setProductionTips}
          isMovie={false}
        />
      </div>
    </>
  ) : (
    <div className="wrapper">
      <Loading />
    </div>
  );
}

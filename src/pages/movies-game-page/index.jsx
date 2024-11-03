import React, {useEffect, useState} from "react";
// Router DOM
import {useNavigate, useParams} from "react-router-dom";
// Services
import {getProductionClips, getProductionCredits, getProductionDetails, getProductionImages, getProductions, getProductionsByCountry, getProductionsByTopRated} from "../../services";
// Components
import Loading from "../../components/loading";
import GameButtons from "../../components/game-buttons";
import GameRemainingLives from "../../components/game-remaining-lives";
import EndGameBox from "../../components/end-game-box";
import ProductionClip from "../../components/production-clip";
import ProductionImage from "../../components/production-image";
import ProductionDetails from "../../components/production-details";
import ProductSearchForm from "../../components/product-search-form";
import Header from "../../components/header";

export default function MoviesGamePage() {
  const navigate = useNavigate();
  const params = useParams();
  const bestScore = localStorage.getItem(`movies/${params.category}`) ? localStorage.getItem(`movies/${params.category}`) : 0;

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
  const [productionClipIsActive, setProductionClipIsActive] = useState(false);

  const [gameScore, setGameScore] = useState(0);
  const [remainingGameLives, setRemainingGameLives] = useState(100);
  const [remainingPassLives, setRemainingPassLives] = useState(5);

  const [inputValue, setInputValue] = useState("");

  productions.length > 0 && productionCount >= productions.length && (setPageCount((prev) => prev + 1), setProductionCount(0));
  production && productionImageCount >= production.filteredImages.length - 1 && (setProductionImageCount(0), alert("Hepsini gördünüz.."));

  useEffect(() => {
    (async () => {
      setProduction(null);
      let responseMovies = [];
      if (params.category === "tr") {
        responseMovies = await getProductionsByCountry(true, pageCount);
      } else if (params.category === "top-rated") {
        responseMovies = await getProductionsByTopRated(true, pageCount);
      } else {
        responseMovies = await getProductions(true, pageCount, params.category);
      }
      setTotalPage(responseMovies && responseMovies.total_pages);
      
      setProductions(responseMovies && responseMovies.results);
      if (responseMovies && responseMovies.results.length > 0) {
        const responseDetails = await getProductionDetails(true, responseMovies.results[productionCount].id);
        if (responseDetails.id) {
          const responseCredits = await getProductionCredits(true, responseMovies.results[productionCount].id);
          if (responseCredits.id) {
            const responseImages = await getProductionImages(true, responseMovies.results[productionCount].id);
            const filteredImages = responseImages && responseImages.backdrops.filter((image) => image.iso_639_1 === null && image);
            if (filteredImages.length > 1) {
              const responseClips = await getProductionClips(responseMovies.results[productionCount].id);
              if (responseClips.results && responseClips.results.length > 0) {
                const clips = responseClips.results.filter((clip) => clip.type === "Clip" && clip);
                const clip = clips.length > 0 ? clips[0] : responseClips.results ? responseClips.results[0] : {};
                const responseAllDetails = {responseDetails, responseCredits, filteredImages, clip};
                setProduction(responseAllDetails);
              } else {
                console.log("Error: responseClips");
                setProductionCount((prev) => prev + 1);
              }
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
        console.log("Error: responseMovies");
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
    <EndGameBox gameScore={gameScore} bestScore={bestScore} categoryId={`movies/${params.category}`} />
  ) : production ? (
    <>
      <Header isGamePage={true} />
      <div className="wrapper" style={pageContainer}>
        <GameRemainingLives gameScore={gameScore} remainingGameLives={remainingGameLives} bestScore={bestScore} />

        {!productionTips ? (
          productionClipIsActive ? (
            <ProductionClip productionClipKey={production.clip.key} setProductionClipIsActive={setProductionClipIsActive} />
          ) : (
            <ProductionImage image={production.filteredImages[productionImageCount].file_path} />
          )
        ) : (
          <ProductionDetails
            releaseDate={production.responseDetails.release_date}
            tagline={production.responseDetails.tagline}
            actors={production.responseCredits.cast.slice(0, 6)}
            directors={production.responseCredits.crew}
            setProductionTips={setProductionTips}
            productionTitle={production.responseDetails.title}
            image={production.filteredImages[productionImageCount].file_path}
          />
        )}

        <GameButtons
          setGameScore={setGameScore}
          setRemainingGameLives={setRemainingGameLives}
          remainingGameLives={remainingGameLives}
          setProductionTips={setProductionTips}
          setProductionImageCount={setProductionImageCount}
          productionClipIsActive={productionClipIsActive}
          setProductionClipIsActive={setProductionClipIsActive}
          productionClip={production.clip}
          productionTips={productionTips}
          productionImagesLength={production.filteredImages.length}
          productionTitle={production.responseDetails.title}
          productionOriginalTitle={production.responseDetails.original_title}
          remainingPassLives={remainingPassLives}
          setRemainingPassLives={setRemainingPassLives}
          setInputValue={setInputValue}
          setProductionCount={setProductionCount}
        />

        <ProductSearchForm
          isMovie={true}
          inputValue={inputValue}
          setInputValue={setInputValue}
          productTitle={production.responseDetails.title}
          productOriginalTitle={production.responseDetails.original_title}
          setProductionCount={setProductionCount}
          setGameScore={setGameScore}
          setRemainingGameLives={setRemainingGameLives}
          setProductionImageCount={setProductionImageCount}
          setProductionTips={setProductionTips}
          setProductionClipIsActive={setProductionClipIsActive}
        />
      </div>
    </>
  ) : (
    <div className="wrapper">
      <Loading />
    </div>
  );
}

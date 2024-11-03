import style from "./style.module.css";

export default function ProductionClip({productionClipKey, setProductionClipIsActive}) {

  return (
    <>
      <div className={style.closeClipContainer}>
        <button type="button" onClick={()=>{setProductionClipIsActive(false)}}>X</button>
      </div>
      <div className={style.container}>
        <iframe
          src={`https://www.youtube.com/embed/${productionClipKey}?autoplay=1&mute=1&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1&start=10&end=20`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>
    </>
  );
}

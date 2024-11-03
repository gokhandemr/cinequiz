import React from "react";
import gif from "../../assets/404-gif.gif";
import Header from "../../components/header";
import {useNavigate} from "react-router-dom";
import PagesText from "../../components/pages-text";
import PagesBackground from "../../components/pages-background";
import Footer from "../../components/footer";

export default function NotFoundPage() {
  const language = localStorage.getItem("language") || "tr";
  const navigate = useNavigate();

  const title = {tr: "404", eng: "404"};
  const description = {tr: "Aradığını Bulamadık.", eng: "This is not a page"};

  const button = {padding: "12px 36px", background: "#c6403f", color: "#fff", border: "0", borderRadius: "4px", letterSpacing: "4px", fontWeight: "bold"};

  return (
    <>
      <Header />
      <div className="wrapper" style={{justifyContent: "center", alignItems: "center"}}>
        <PagesText title={language === "tr" ? title.tr : title.eng} description={language === "tr" ? description.tr : description.eng} />
        <PagesBackground image={gif} />
        <button type="button" onClick={() => navigate("/")} style={button}>
          {language === "tr" ? "ANASAYFA" : "HOME PAGE"}
        </button>
      </div>
      <Footer />
    </>
  );
}

import React from "react";
import { makeStyles } from "@mui/styles";
import WrapperBox from "../Components/WrapperBox";
import AboutImage from "./../Images/aboutus.png";

const Aboutus = () => {
  const classes = useStyles();
  return (
    <WrapperBox>
      <React.Fragment>
        <div
          className={classes.section1}
          style={{ backgroundImage: `url(${AboutImage})` }}
        >
          <div className={classes.section2}>About us</div>
        </div>
        <div className={classes.section3}>
          <p className={classes.header}>Who We Are...</p>
          <p className={classes.note}>
            Lörem ipsum antelöras pofygt lårskav om kins. Kanat var. Monoskap
            presk. Åde monoskap att panade. Suprassade dis polig. Vede derora.
            Trer rir innan Stefan Lundin previs. Reav bese medat oaktat vabel.
            Gigagögt dekas, och töskap. Reviheten tesedyns egore även om neliga.
            Begen dagshandlare nytreras och dirosk. Pres omerad. Lörem ipsum
            antelöras pofygt lårskav om kins. Kanat var. Monoskap presk. Åde
            monoskap att panade. Suprassade dis polig. Vede derora. Trer rir
            innan Stefan Lundin previs. Reav bese medat oaktat vabel. Gigagögt
            dekas, och töskap. Reviheten tesedyns egore även om neliga. Begen
            dagshandlare nytreras och dirosk. Pres omerad. Lörem ipsum antelöras
            pofygt lårskav om kins. Kanat var. Monoskap presk. Åde monoskap att
            panade. Suprassade dis polig. Vede derora. Trer rir innan Stefan
            Lundin previs. Reav bese medat oaktat vabel. Gigagögt dekas, och
            töskap. Reviheten tesedyns egore även om neliga. Begen dagshandlare
            nytreras och dirosk. Pres omerad. Lörem ipsum antelöras pofygt
            lårskav om kins. Kanat var. Monoskap presk. Åde monoskap att panade.
            Suprassade dis polig. Vede derora. Trer rir innan Stefan Lundin
            previs. Reav bese medat oaktat vabel. Gigagögt dekas, och töskap.
            Reviheten tesedyns egore även om neliga. Begen dagshandlare nytreras
            och dirosk. Pres omerad.
          </p>
          <p className={classes.header}>Our Vision</p>
          <p className={classes.note}>
            Lörem ipsum antelöras pofygt lårskav om kins. Kanat var. Monoskap
            presk. Åde monoskap att panade. Suprassade dis polig. Vede derora.
            Trer rir innan Stefan Lundin previs. Reav bese medat oaktat vabel.
            Gigagögt dekas, och töskap. Reviheten tesedyns egore även om neliga.
            Begen dagshandlare nytreras och dirosk. Pres omerad.
          </p>
          <p className={classes.header}>Our Mission</p>
          <p className={classes.note}>
            Lörem ipsum antelöras pofygt lårskav om kins. Kanat var. Monoskap
            presk. Åde monoskap att panade. Suprassade dis polig. Vede derora.
            Trer rir innan Stefan Lundin previs. Reav bese medat oaktat vabel.
            Gigagögt dekas, och töskap. Reviheten tesedyns egore även om neliga.
            Begen dagshandlare nytreras och dirosk. Pres omerad.
          </p>
        </div>
      </React.Fragment>
    </WrapperBox>
  );
};

const useStyles = makeStyles((theme) => ({
  section1: {
    backgroundImage: `url("./../Images/aboutus.png")`,
    backgroundSize: "cover",
    width: "100%",
    height: 340,
    backgroundColor: "#102A5E",
    backgroundPosition: "center",
    "@media (max-width: 900px)": {},
  },
  section2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 340,
    fontSize: 65,
    fontWeight: 600,
    color: "#FFFFFF",
    "@media (max-width: 900px)": {},
  },
  section3: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "100px 130px 200px 130px",
    "@media (max-width: 900px)": {
      padding: "50px 30px 100px 30px",
    },
  },
  header: {
    fontWeight: 500,
    fontSize: 44,
  },
  note: {
    fontWeight: 300,
    fontSize: 22,
    marginBottom: 20,
  },
}));

export default Aboutus;

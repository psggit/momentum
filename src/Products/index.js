import React from "react";
import { makeStyles } from "@mui/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import WrapperBox from "../Components/WrapperBox";
import ProductImg from "./../Images/product-img.png";

const Products = () => {
  const classes = useStyles();

  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <WrapperBox>
      <div className={classes.section}>
        <div className={classes.section1}>
          <img src={ProductImg} alt="" />
        </div>
        <div>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "#1C85E8",

              display: "flex",
              width: "100%",
              margin: "20px 0",
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleChange}
              aria-label="icon tabs example"
            >
              <Tab
                classes={{ root: classes.tabRoot }}
                label="Highlights"
                aria-label="highlights"
              />
              <Tab
                classes={{ root: classes.tabRoot }}
                label="Module"
                aria-label="module"
              />
            </Tabs>
          </Box>
          {tabValue === 0 && (
            <div>
              <p className={classes.text}>
                Lörem ipsum antelöras pofygt lårskav om kins. Kanat var.
                Monoskap presk. Åde monoskap att panade. Suprassade dis polig.
                Vede derora. Trer rir innan Stefan Lundin previs. Reav bese
                medat oaktat vabel. Gigagögt dekas, och töskap. Reviheten
                tesedyns egore även om neliga. Begen dagshandlare nytreras och
                dirosk. Pres omerad.
              </p>
              <p className={classes.text}>
                Lörem ipsum antelöras pofygt lårskav om kins. Kanat var.
                Monoskap presk. Åde monoskap att panade. Suprassade dis polig.
                Vede derora. Trer rir innan Stefan Lundin previs. Reav bese
                medat oaktat vabel. Gigagögt dekas, och töskap. Reviheten
                tesedyns egore även om neliga. Begen dagshandlare nytreras och
                dirosk. Pres omerad.
              </p>
              <p className={classes.text}>
                Lörem ipsum antelöras pofygt lårskav om kins. Kanat var.
                Monoskap presk. Åde monoskap att panade. Suprassade dis polig.
                Vede derora. Trer rir innan Stefan Lundin previs. Reav bese
                medat oaktat vabel. Gigagögt dekas, och töskap. Reviheten
                tesedyns egore även om neliga. Begen dagshandlare nytreras och
                dirosk. Pres omerad.
              </p>
              <p className={classes.text}>
                Lörem ipsum antelöras pofygt lårskav om kins. Kanat var.
                Monoskap presk. Åde monoskap att panade. Suprassade dis polig.
                Vede derora. Trer rir innan Stefan Lundin previs. Reav bese
                medat oaktat vabel. Gigagögt dekas, och töskap. Reviheten
                tesedyns egore även om neliga. Begen dagshandlare nytreras och
                dirosk. Pres omerad.
              </p>
            </div>
          )}
          {tabValue === 1 && (
            <div>
              <p className={classes.text}>
                Lörem ipsum antelöras pofygt lårskav om kins. Kanat var.
                Monoskap presk. Åde monoskap att panade. Suprassade dis polig.
                Vede derora. Trer rir innan Stefan Lundin previs. Reav bese
                medat oaktat vabel. Gigagögt dekas, och töskap. Reviheten
                tesedyns egore även om neliga. Begen dagshandlare nytreras och
                dirosk. Pres omerad.
              </p>
              <p className={classes.text}>
                Lörem ipsum antelöras pofygt lårskav om kins. Kanat var.
                Monoskap presk. Åde monoskap att panade. Suprassade dis polig.
                Vede derora. Trer rir innan Stefan Lundin previs. Reav bese
                medat oaktat vabel. Gigagögt dekas, och töskap. Reviheten
                tesedyns egore även om neliga. Begen dagshandlare nytreras och
                dirosk. Pres omerad.
              </p>
              <p className={classes.text}>
                Lörem ipsum antelöras pofygt lårskav om kins. Kanat var.
                Monoskap presk. Åde monoskap att panade. Suprassade dis polig.
                Vede derora. Trer rir innan Stefan Lundin previs. Reav bese
                medat oaktat vabel. Gigagögt dekas, och töskap. Reviheten
                tesedyns egore även om neliga. Begen dagshandlare nytreras och
                dirosk. Pres omerad.
              </p>
              <p className={classes.text}>
                Lörem ipsum antelöras pofygt lårskav om kins. Kanat var.
                Monoskap presk. Åde monoskap att panade. Suprassade dis polig.
                Vede derora. Trer rir innan Stefan Lundin previs. Reav bese
                medat oaktat vabel. Gigagögt dekas, och töskap. Reviheten
                tesedyns egore även om neliga. Begen dagshandlare nytreras och
                dirosk. Pres omerad.
              </p>
            </div>
          )}
        </div>
      </div>
    </WrapperBox>
  );
};

const useStyles = makeStyles((theme) => ({
  section: {
    padding: "100px 130px 100px 130px",
    "@media (max-width: 900px)": {
      padding: "50px 30px 100px 30px",
    },
  },
  section1: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 900px)": {
      "& img": {
        width: 250,
        height: 250,
      },
    },
  },
  tabRoot: {
    color: "#1C85E8 !important",
    background: "rgba(28, 133, 232, 0.1)",
    borderRadius: "10px 10px 0px 0px !important",
    textTransform: "capitalize !important",
    fontSize: "28px !important",
    "&.Mui-selected": {
      background: "#1C85E8",
      color: "#FFFFFF !important",
      borderRadius: "10px 10px 0px 0px",
      textTransform: "capitalize",
      fontSize: 28,
    },
  },
  text: {
    fontSize: 22,
    fontWeight: 300,
    marginBottom: 20,
  },
}));

export default Products;

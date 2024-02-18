import React from 'react';
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
// Assuming TopBarProgress is a component you're importing
import TopBarProgress from "react-topbar-progress-indicator";

function TopBarProgressComponent(){
    const baseColor = getCSSVariableValue("--bs-primary");
    
    // Assuming this is how you configure it, but you may need to adjust based on the actual library
    TopBarProgress.config({
      barColors: {
        "0": baseColor,
      },
      barThickness: 1,
      shadowBlur: 5,
    });
    
    // Render the TopBar component, or adjust this based on your needs
    return <TopBarProgress />;
}

export {TopBarProgressComponent}

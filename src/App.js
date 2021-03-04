import React from "react";
import SilverRaptor from "./SilverRaptor";

function App({ window }) {
  return (
    <div>
      <div className="heading">SILVER RAPTORS</div>
      <SilverRaptor window={window} />
      <div className="text-line">There are 200 Silver Raptors</div>
      <div className="text-line">Some have been found</div>
      <div className="text-line">Others have not</div>
    </div>
  );
}

export default App;

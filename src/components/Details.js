import React from "react";
import { Segment, Image } from "semantic-ui-react";
import * as Images from "../services/Images";
import HostInfo from "./HostInfo";

function Details({selectedHost, changeStatus, changeArea}) {
  // We'll render the logo if no host is selected. But if a host does get selected....
  // Watch the video to see how this works in the app.

  if(selectedHost.length === 0){
    return <Segment id="details" className="HQComps">
     {true ? <Image size="medium" src={Images.westworldLogo} /> : null}
    </Segment>
  }

  return (
    <Segment id="details" className="HQComps">
      <HostInfo selectedHost={selectedHost} changeStatus={changeStatus} changeArea={changeArea}/>
    </Segment>
  );
}

export default Details;

import React from "react";
import HostList from "./HostList";
import { Segment } from "semantic-ui-react";

function ColdStorage({storageHosts, selectHost}) {
  return (
    <Segment.Group className="HQComps">
      <Segment compact>
        <h3 className="labels">ColdStorage</h3>
      </Segment>
      <Segment compact>
       <HostList hosts={storageHosts} selectHost={selectHost}/>
      </Segment>
    </Segment.Group>
  );
}

export default ColdStorage;

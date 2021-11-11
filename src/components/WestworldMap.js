import React from "react";
import Area from "./Area";
import { Segment } from "semantic-ui-react";

function WestworldMap({activeHosts, areaData, selectHost}) {
  const areas = areaData.map(area => <Area name={area.name} limit={area.limit} selectHost={selectHost}
     activeHosts={activeHosts} key={area.id}/>)

  return( 
    <Segment id="map">
      {areas}
    </Segment>
  );
}

export default WestworldMap;

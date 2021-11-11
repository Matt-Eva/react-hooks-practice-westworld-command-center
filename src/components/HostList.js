import React from "react";
import Host from "./Host";
import { Card } from "semantic-ui-react";

function HostList({hosts, selectHost}) {
  const displayHosts = hosts.map(host => <Host host={host} selectHost={selectHost} key={host.id}/>)
  return (
    <Card.Group itemsPerRow={6}>
      {displayHosts}
    </Card.Group>
  );
}

export default HostList;

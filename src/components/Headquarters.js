import React from "react";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import ColdStorage from "./ColdStorage";
import LogPanel from "./LogPanel";
import "../stylesheets/Headquarters.css";

function Headquarters({selectedHost, storageHosts, selectHost, changeStatus, changeArea, updateStatusAll, hostData, logs}) {
  return (
    <Grid celled="internally">
      <Grid.Column width={8}>
        <ColdStorage storageHosts={storageHosts} selectHost={selectHost}/>
      </Grid.Column>
      <Grid.Column width={5}>
        <Details selectedHost={selectedHost} changeStatus={changeStatus} changeArea={changeArea}/>
      </Grid.Column>
      <Grid.Column width={3}>
        <LogPanel updateStatusAll={updateStatusAll} hostData={hostData} logs={logs}/>
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;

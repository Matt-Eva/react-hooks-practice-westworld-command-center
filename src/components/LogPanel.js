import React, {useState} from "react";
import { Segment, Button } from "semantic-ui-react";

function LogPanel({updateStatusAll, hostData, logs}) {

  const [status, setStatus] = useState(false)

  const unifiedTrue = hostData.filter(host => host.active === true)
  const unifiedFalse = hostData.filter(host => host.active === false)

  if (unifiedTrue.length === hostData.length){
    if (status !== false){
      setStatus(false)
    }
  } else if(unifiedFalse.length === hostData.length){
    if(status !== true){
      setStatus(true)
    }
  }

  return (
    <Segment className="HQComps" id="logPanel">
      <pre>
        {logs.map((log, i) => (
          <>
          <p key={i} className={log.type}>
            {log.msg}
          </p>
          </>
        ))}
      </pre>
      <Button fluid color={status ? "green" : "red" } content={status ? "ACTIVATE ALL" : "DECOMMISSION ALL" } onClick={() => {
        updateStatusAll(status)
        setStatus(status => !status)
        }}/>
    </Segment>
  );
}

export default LogPanel;

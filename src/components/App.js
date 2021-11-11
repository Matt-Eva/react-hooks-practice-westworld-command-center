import React, { useState, useEffect } from "react";
import { Segment } from "semantic-ui-react";
import WestworldMap from "./WestworldMap";
import Headquarters from "./Headquarters";
import "../stylesheets/App.css";
import { Log } from "../services/Log";

function App() {
const [hostData, setHostData] = useState([]);
const [areaData, setAreaData] = useState([]);
const [selectedHost, setSelectedHost] = useState([])
const [logs, setLogs] = useState([])
// FUNCTION USED ONCE TO CORRECT BERNARD'S NAME
// function patchBernard() {
//   const bernard = hostData.filter(host => host.firstName === "Beranrd")
//   const configObj = {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({firstName: "Bernard"})
//   }
//   fetch(`http://localhost:3001/hosts/${bernard[0].id}`, configObj)
//   .then(r => r.json())
//   .catch(error => console.error(error))
//   .then(data =>{
//     const updatedBernard = hostData.map(host => {
//       if (host.id === data.id){
//         return data
//       } else{
//         return host
//       }
//     })
//     console.log(updatedBernard)
//     setHostData(updatedBernard)
//   })
// }

const activeHosts = hostData.filter(host => host.active === true)
const storageHosts = hostData.filter(host => host.active === false)

useEffect(() =>{
  fetch("http://localhost:3001/hosts")
    .then(r => r.json())
    .then(hosts => setHostData([...hosts]))

  fetch("http://localhost:3001/areas")
    .then(r => r.json())
    .then(areas => setAreaData([...areas]))
}, [])

const selectHost = (host) =>{
  setSelectedHost(host)
}

const changeStatus = (host) =>{
  const newStatus = {
    active: !host.active
  }
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newStatus)
  }

  fetch(`http://localhost:3001/hosts/${host.id}`, configObj)
  .then(r => r.json())
  .catch(error => console.error(error))
  .then(data => {
    const updatedHosts = hostData.map(host =>{
      if (host.id === data.id){
        return data
      } else {
        return host
      }
    })
    setSelectedHost(data)
    setHostData([...updatedHosts])
    const nameArray = host.area.split("_")
    const casedArray = nameArray.map(name => {
      return name.charAt(0).toUpperCase() + name.slice(1)
    })
    const areaTitle = casedArray.join(" ")
    data.active ? setLogs([Log.warn(`Activated ${host.firstName}. Deployed to ${areaTitle}.`), ...logs]) : setLogs([Log.notify(`Decommissioned ${host.firstName}.`), ...logs]);
  })
}

const changeArea = (value, id, name) => {
  const areaCapacity = hostData.filter(host => host.area === value)
  const thisArea = areaData.filter(area => area.name === value)
  const nameArray = value.split("_")
  const casedArray = nameArray.map(name => {
    return name.charAt(0).toUpperCase() + name.slice(1)
  })
  const areaTitle = casedArray.join(" ")

  if (areaCapacity.length < thisArea[0].limit){
    const newArea ={
      area: value
    }
    const configObj = {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newArea)
    }
  
    fetch(`http://localhost:3001/hosts/${id}`, configObj)
    .then(r => r.json())
    .catch(error => console.error(error))
    .then(data => {
      const updatedHosts = hostData.map(host =>{
        if (host.id === data.id){
          return data;
        } else{
          return host;
        }
      })
  
      setSelectedHost(data)
      setHostData([...updatedHosts])
      setLogs([Log.notify(`${data.firstName} has been moved to ${areaTitle}`), ...logs])
    })
  }else {
    const targetAreaHosts = hostData.filter(host => host.area === thisArea[0].name)
    const capacityHosts = targetAreaHosts.map(host => ` | ${host.firstName}: ${host.active ? "active": "storage"}`)
    setLogs([Log.error(`Too many hosts. Cannot add ${name} to ${areaTitle}. ${areaTitle} is limited to ${thisArea[0].limit} hosts. ${areaTitle} already contains: ${capacityHosts}`), ...logs])
  }
}

const updateStatusAll = (status) => {
   const allUpdated = hostData.map(host =>{
     return {...host, active: status}
   })
  setHostData([...allUpdated])
  setSelectedHost({...selectedHost, active: status})
  status ? setLogs([Log.warn(`Activating all hosts!`), ...logs]) : setLogs([Log.notify("Decommissioning all hosts."), ...logs])
// NOTE: GETTING CORS ACCESS ISSUE WHEN I TRY TO RUN LOOPING FETCHES FOR PATCH BULK UPDATE
    // for (const host of hostData){
    //   const configObj ={
    //     method: "Patch",
    //     headers:{
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Origin": "*"
    //     },
    //     body: JSON.stringify({active: status})
    //   }
    //   console.log(status, host, host.id)
    //   fetch(`http://localhost:3001/hosts/1`, configObj)
    //   .then(r => r.json())
    //   .catch(error => console.error(error))
    //   .then(data => {
    //     console.log(data)
        // const updatedStatus = hostData.map(host =>{
        //   if (host.id === data.id){
        //     return data
        //   } else{
        //     return host
        //   }
        // })

        // setHostData([...updatedStatus])
    //   })
    // }
}

  return (
    <Segment id="app">
      {/* <button onClick={patchBernard}>Patch Bernard</button> */}
      <WestworldMap activeHosts={activeHosts} areaData={areaData} selectHost={selectHost}/>
      <Headquarters selectedHost={selectedHost} storageHosts={storageHosts} selectHost={selectHost}
      changeStatus={changeStatus} changeArea={changeArea} updateStatusAll={updateStatusAll} hostData={hostData} logs={logs} />
    </Segment>
  );
}

export default App;

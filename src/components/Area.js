import React from "react";
import HostList from "./HostList";
import "../stylesheets/Area.css";

function Area(props) {
  const {name, activeHosts, selectHost} = props
  const nameArray = name.split("_")
  const casedArray = nameArray.map(name => {
    return name.charAt(0).toUpperCase() + name.slice(1)
  })
  const areaTitle = casedArray.join(" ")
  const hosts = activeHosts.filter(host => host.area === name)

  return (
    <div
      className="area"
      id={name}
    >
      <h3 className="labels">
        {areaTitle}
        {/* Don't just pass in the name from the data...clean that thing up */}
      </h3>
      <HostList hosts={hosts} selectHost={selectHost}/>
    </div>
  );
}

// Area.propTypes = {
//   activeHosts: function (props) {
//     if (props.activeHosts.length > props.limit) {
//       throw Error(
//         `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
//       );
//     }
//   },
// };

export default Area;

import React from "react";
import "./SidebarOption.css";
export default function SidebarOption({ title, Icon, onClick, selected }) {
  const selectedClass = selected  ? "_selected" : ""
  return (
    <div className={"sidebarOption"+selectedClass} onClick={()=>onClick(title)}>
      {Icon && <Icon className="sidebar_icon" />}
      {Icon && <h4>{title}</h4>}
    </div>
  );
}

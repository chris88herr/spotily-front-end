import React from "react";
import "./SidebarOption.css";
export default function SidebarOption({ title, Icon }) {

  return (
    <div className="sidebarOption">
      {Icon && <Icon className="sidebar_icon" />}
      {Icon && <h4>{title}</h4>}
    </div>
  );
}

import React from "react";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
    {
        title: "Home",
        path: "/",
        icon: <AiIcons.AiFillHome size={24}/>,
    },
    {
        title: <>Room Change<br />Request</>,
        path: "/room-changes",
        icon: <RiIcons.RiExchangeLine size={24}/>,
    },
    {
        title: "IT Support",
        path: "/it-support",
        icon: <AiIcons.AiOutlineTool size={24}/>,
    },
];
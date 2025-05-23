import React from "react";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";
import { ReactComponent as CanvasLogo } from "../images/canvaslogo.svg";

export const SidebarData = [
    {
        title: "Home",
        path: "/home",
        icon: <AiIcons.AiFillHome size={24}/>,
    },
    {
        title: <>Automated <br />Attendance</>,
        path: "/attendance",
        icon: <FaIcons.FaIdCard size={24}/>,
    },
    {
        title: <>Room Change <br />Request</>,
        path: "/room-changes",
        icon: <RiIcons.RiExchangeLine size={24}/>,
    },
    {
        title: "IT Support",
        path: "/it-support",
        icon: <AiIcons.AiOutlineTool size={24}/>,
    },
    {
        title: "Canvas",
        path: "https://montclair.instructure.com/",
        icon: <CanvasLogo style={{ width: 24, height: 24 }} />,
    },
    {
        title: "Gmail",
        path: "https://mail.google.com/mail/u/0/#inbox",
        icon: <AiIcons.AiOutlineMail size={24}/>,
    },

    
];
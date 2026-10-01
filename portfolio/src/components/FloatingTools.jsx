import {
    FaReact,
    FaNodeJs,
    FaJsSquare,
    FaHtml5,
    FaCss3Alt,
    FaPython,
    FaGitAlt,
    FaGithub
} from "react-icons/fa";

import {
    SiMongodb,
    SiExpress,
    SiDjango,
    SiTypescript
} from "react-icons/si";


function FloatingTools() {
    const tools = [
        { icon: <FaReact />, className: "tool-1" },
        { icon: <FaNodeJs />, className: "tool-2" },
        { icon: <FaJsSquare />, className: "tool-3" },
        { icon: <FaHtml5 />, className: "tool-4" },
        { icon: <FaCss3Alt />, className: "tool-5" },
        { icon: <SiMongodb />, className: "tool-6" },
        { icon: <SiExpress />, className: "tool-7" },
        { icon: <FaPython />, className: "tool-8" },
        { icon: <SiDjango />, className: "tool-9" },
        { icon: <FaGitAlt />, className: "tool-10" },
        { icon: <FaGithub />, className: "tool-11" },
        { icon: <SiTypescript />, className: "tool-12" }
    ];

    return (
        <div className="floating-tools">
            {tools.map((tool, index) => (
                <span
                    key={index}
                    className={`floating-tool ${tool.className}`}
                >
                    {tool.icon}
                </span>
            ))}
        </div>
    );
}

export default FloatingTools;
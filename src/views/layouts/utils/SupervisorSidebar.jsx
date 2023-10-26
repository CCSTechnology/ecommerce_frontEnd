/* eslint-disable react-hooks/exhaustive-deps */
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { Doorbell, Chat, Project, TaskIcon, profileIcon } from "helpers/images";
import { useEffect, useState } from "react";
import companyLogo from "../../.././assets/images/company-logo.svg";
import collapseRight from "../../.././assets/images/collapse-right.svg";
import smallLogo from "../../.././assets/images/small-logo.png";
import IconComponent from "components/icon";

const SupervisorDashboard = (props) => {
    const [collapse, setCollapse] = useState(false)
    const roleName = localStorage.getItem("roleName");
    const [width, setWidth] = useState("");

    function getSize() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener("resize", getSize);
        if (width === "") {
            setCollapse(false);
        } else if (width <= 768) {
            setCollapse(true);
        } else {
            setCollapse(false);
        }
        return () => {
            window.removeEventListener("resize", getSize);
        };
    }, [window.innerWidth]);

    return (
        <Sidebar
            className="app"
            collapsed={collapse}
            responsive={true}
            width="208px"
            backgroundColor="#F0FAF5"
            transitionDuration={500}>
            <Menu>
                <div className="cg-logo">
                    {collapse ? (
                        <div>
                            <Link to={`/${roleName}/dashboard`}>
                                <img className="cg-logo-mobile-img" src={smallLogo} alt="logo" width={"80px"} />
                            </Link>
                            <div className="cg-logo-lg-leftarrow">
                                <img
                                    className="rotate"
                                    src={collapseRight}
                                    alt="arrow"
                                    width={"15px"}
                                    height={"15px"}
                                    onClick={() => setCollapse(false)}
                                />
                            </div>
                        </div>
                    ) :
                        <div>
                            <Link to={`/${roleName}/dashboard`}>
                                <img className="cg-logo-lg-img" src={companyLogo} alt="logo" />
                            </Link>
                            <div className="cg-logo-lg-leftarrow">
                                <img
                                    src={collapseRight}
                                    alt="arrow"
                                    width={"15px"}
                                    height={"15px"}
                                    onClick={() => setCollapse(true)}
                                />
                            </div>

                        </div>
                    }
                </div>

                <MenuItem
                    component={<Link to="supervisor/jobs" className="link" />}
                    icon={<IconComponent src={Project} />}
                >
                    Jobs
                </MenuItem>

                <MenuItem
                    component={<Link to="https://web.whatsapp.com/" className="link" target="blank" />}
                    icon={<IconComponent src={Chat} />}
                >
                    Chats
                </MenuItem>

                <MenuItem
                    component={<Link to="supervisor/tasks" className="link" />}
                    icon={<IconComponent src={TaskIcon} />}
                >
                    Tasks
                </MenuItem>
                <MenuItem
                    component={<Link to="supervisor/notifications" className="link" />}
                    icon={<IconComponent src={Doorbell} />}
                >
                    Notification
                </MenuItem>
                <MenuItem
                    icon={<IconComponent src={profileIcon} />}
                    component={<Link to='supervisor/changePassword' className="link" />}
                >
                    Change Password
                </MenuItem>
            </Menu>
        </Sidebar>
    );
};

export default SupervisorDashboard;

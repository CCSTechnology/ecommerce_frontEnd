/* eslint-disable react-hooks/exhaustive-deps */
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { Doorbell, Chat, Friends, GoogleForms, Project, TaskIcon, masterIcon, profileIcon, logo } from "helpers/images";
import { useEffect, useState } from "react";
import companyLogo from "assets/images/company-logo.svg";
import collapseRight from "assets/images/collapse-right.svg";
import smallLogo from "assets/images/small-logo.png";
import IconComponent from "components/icon";

const AdminSidebar = () => {

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
            backgroundColor="white"
            transitionDuration={500}>
            <Menu>
                <div className="cg-logo">
                    {collapse ? (
                        <div>
                            <Link to={`/dashboard`}>
                                <img className="cg-logo-mobile-img" src={logo} alt="logo" width={"80px"} />
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
                            <Link to={`/dashboard`}>
                                <img className="cg-logo-lg-img" src={logo} alt="logo" style={{}} />
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
                    component={<Link to="/customers" className="link" />}
                    icon={<IconComponent src={Project} />}
                >
                    Customers
                </MenuItem>

                <MenuItem
                    component={<Link to="/category" className="link" />}
                    icon={<IconComponent src={Friends}
                    />}
                >
                    Categories
                </MenuItem>


                <MenuItem
                    component={<Link to="/products" className="link" />}
                    icon={<IconComponent src={Chat} />}
                >
                    Products
                </MenuItem>
                <MenuItem
                    component={<Link to="admin/forms" className="link" />}
                    icon={<IconComponent src={GoogleForms} />}
                >
                    Settings
                </MenuItem>
            </Menu>
        </Sidebar>
    );
};

export default AdminSidebar;

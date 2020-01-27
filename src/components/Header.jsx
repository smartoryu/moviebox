import React, { Component } from "react";
import { connect } from "react-redux";
import { LogoutSuccessAction } from "../redux/action";
import { Link, Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class Header extends Component {
  state = {
    onMouseEnter: false,
    menuOpen: false
  };

  handleLogout = () => {
    Swal.fire({
      title: "Are you sure logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout!"
    }).then(result => {
      if (result.value) {
        Swal.fire({
          title: "Logging out!",
          timer: 1000,
          allowOutsideClick: false,
          timerProgressBar: true,
          onBeforeOpen: () => {
            Swal.showLoading();
          }
        })
          .then(result => {
            if (result.dismiss === Swal.DismissReason.timer) return <Redirect to={"/"} />;
          })
          .then(() => {
            Swal.fire({
              title: "Logged out",
              icon: "success",
              showConfirmButton: false,
              timer: 1000
            }).then(() => {
              localStorage.removeItem("userLogin");
              this.props.LogoutSuccessAction();
            });
          });
      }
    });
  };

  /* ============================================================/
  /                         RENDER MENU                          /
  ==============================================================*/

  renderMenuDefault = () => {
    return (
      <DropdownMenu onMouseLeave={() => this.setState({ onMouseEnter: false })} right>
        <DropdownItem href={"/login"} style={{ textDecoration: "none", color: "inherit" }}>
          Login
        </DropdownItem>
        <DropdownItem>
          <Link to={"/register"} style={{ textDecoration: "none", color: "#a6a6a6" }}>
            Are you new?
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link to={"/manage_movies"} style={{ textDecoration: "none", color: "inherit" }}>
            Manage Movies
          </Link>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem disabled>Reset</DropdownItem>
      </DropdownMenu>
    );
  };

  renderMenuAdmin = () => {
    return (
      <DropdownMenu onMouseLeave={() => this.setState({ onMouseEnter: false })} right>
        <DropdownItem href={"/manage_users"}>Manage Users</DropdownItem>
        <DropdownItem>
          <Link to={"/manage_movies"} style={{ textDecoration: "none", color: "inherit" }}>
            Manage Movies
          </Link>
        </DropdownItem>
        <DropdownItem href={"/manage_studios"}>Manage Studios</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>
          <Link to={"/change_password"} style={{ textDecoration: "none", color: "inherit" }}>
            Change Password
          </Link>
        </DropdownItem>
        <DropdownItem onClick={this.handleLogout}>Logout</DropdownItem>
      </DropdownMenu>
    );
  };

  renderMenuUser = () => {
    return (
      <DropdownMenu onMouseLeave={() => this.setState({ onMouseEnter: false })} right>
        <DropdownItem>
          <Link to={""} style={{ textDecoration: "none", color: "inherit" }}>
            Profile
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link to={""} style={{ textDecoration: "none", color: "inherit" }}>
            History
          </Link>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem>
          <Link to={"/change_password"} style={{ textDecoration: "none", color: "inherit" }}>
            Change Password
          </Link>
        </DropdownItem>
        <DropdownItem onClick={this.handleLogout}>Logout</DropdownItem>
      </DropdownMenu>
    );
  };

  /* ============================================================/
  /                           RENDER                             /
  ==============================================================*/

  render() {
    const { AuthLogin, AuthUser, AuthRole } = this.props;

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Moviebox</NavbarBrand>
          <NavbarToggler onClick={() => this.setState({ menuOpen: !this.state.menuOpen })} />
          <Collapse isOpen={this.state.menuOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="https://github.com/smartoryu/moviebox" target="_blank">
                  GitHub
                </NavLink>
              </NavItem>

              <UncontrolledDropdown isOpen={this.state.onMouseEnter} nav inNavbar>
                <DropdownToggle onMouseEnter={() => this.setState({ onMouseEnter: true })} nav caret>
                  {!AuthLogin ? "Account" : `Hi, ${AuthUser}`}
                </DropdownToggle>
                {!AuthLogin
                  ? this.renderMenuDefault() /// KONDISI TIDAK ADA YANG LOGIN
                  : AuthUser && AuthRole === "admin"
                  ? this.renderMenuAdmin() /// KONDISI ADMIN SEDANG LOGIN
                  : this.renderMenuUser() /// KONDISI USER SEDANG LOGIN
                }
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    AuthLogin: state.Auth.login,
    AuthUser: state.Auth.name,
    AuthRole: state.Auth.role
  };
};

export default connect(mapStateToProps, { LogoutSuccessAction })(Header);

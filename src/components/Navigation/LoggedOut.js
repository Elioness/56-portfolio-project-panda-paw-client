import React from "react";
import NavbarItem from "./NavbarItem";

export default function LoggedOut() {
  return (
    <>
      <NavbarItem path="/myPaw" linkText="myPaw" />
      <NavbarItem path="/login" linkText="Login" />
    </>
  );
}

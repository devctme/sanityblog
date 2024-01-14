"use client";

import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  return (
    <nav className="w-full relative flex items-center justify-between  ">
      <Link href="/" className="font-bold text-3xl">
        <span>Devct</span>
        <span className="text-blue-500">Blog</span>
      </Link>
      <ModeToggle />
    </nav>
  );
};

export default Navbar;

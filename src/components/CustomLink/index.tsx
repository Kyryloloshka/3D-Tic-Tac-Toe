"use client"
import Link from "next/link";
import React from "react";

const CustomLink = ({label, href}: {label: string, href: string}) => {
  return (
    <Link
      href={href}
      className={`link-underline transition capitalize relative text-primary-500 whitespace-nowrap`}
    >
      {label}
    </Link>
  );
};

export default CustomLink;

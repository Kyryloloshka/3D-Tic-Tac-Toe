"use client";
import Link from "next/link";
import React, { LinkHTMLAttributes } from "react";

const CustomLink = ({
  label,
  href,
  capitalize = true,
  ...props
}: {
  label: string;
  href: string;
  capitalize?: boolean;
  [key: string]: any;
}) => {
  return (
    <Link
      href={href}
      className={`link-underline transition ${
        capitalize && "capitalize"
      } relative text-primary-500 whitespace-nowrap`}
      {...props}
    >
      {label}
    </Link>
  );
};

export default CustomLink;

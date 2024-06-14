import { NextRequest, NextResponse } from "next/server";

const BLOCKED_COUNTRIES = 'RU';


export default function middleware(req: NextRequest) {
  const country = req.geo?.country;

  if (req.nextUrl.pathname === '/blocked') {
    return NextResponse.next();
  }

  if (country === BLOCKED_COUNTRIES) {
    return NextResponse.redirect('/blocked');
  }
}
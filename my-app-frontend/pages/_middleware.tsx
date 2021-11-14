import { NextRequest, NextResponse, NextFetchEvent } from 'next/server';

import { isSigned } from '../src/services/is-signed';
import { availablePathWithoutLogin } from '../src/services/available-paths-without-login';

export const middleware = (req: NextRequest, ev: NextFetchEvent) => {
  if (!isSigned()) {
    if (!availablePathWithoutLogin(req.nextUrl.pathname)) {
      return NextResponse.redirect('/login');
    }
  } else {
    return NextResponse.redirect('/home');
  }
};

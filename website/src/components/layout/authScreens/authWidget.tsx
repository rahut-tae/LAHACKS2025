"use client";

import { useState } from "react";
import AuthScreenRegister from '@/components/layout/authScreens/authScreenRegister';
import AuthScreenLogin from '@/components/layout/authScreens/authScreenLogin';
import AuthScreenCheckout from '@/components/layout/authScreens/authScreenCheckout';
import AuthScreenForgotPassword from '@/components/layout/authScreens/authScreenForgotPassword';
import AuthScreenSentForgotPassword from '@/components/layout/authScreens/authScreenSentForgotPassword';

export enum AuthWidgetPage {
    REGISTER,
    LOGIN,
    CHECKOUT,
    FORGOT_PASSWORD,
    SENT_FORGOT_PASSWORD,
}
export default function AuthWidget() {
    const [ page, setPage ] = useState(AuthWidgetPage.REGISTER);
    let pageElements;
    switch (page) {
        case AuthWidgetPage.REGISTER:
            pageElements = <AuthScreenRegister authWidgetPage={page} setAuthWidgetPage={setPage} />;
            break;
        case AuthWidgetPage.LOGIN:
            pageElements = <AuthScreenLogin authWidgetPage={page} setAuthWidgetPage={setPage} />
            break;
        case AuthWidgetPage.CHECKOUT:
            pageElements = <AuthScreenCheckout authWidgetPage={page} setAuthWidgetPage={setPage} />
            break;
        case AuthWidgetPage.FORGOT_PASSWORD:
            pageElements = <AuthScreenForgotPassword authWidgetPage={page} setAuthWidgetPage={setPage} />
            break;
        case AuthWidgetPage.SENT_FORGOT_PASSWORD:
            pageElements = <AuthScreenSentForgotPassword authWidgetPage={page} setAuthWidgetPage={setPage} />
            break;
    }
    return <div
        className="flex flex-col gap-4 md:border-neutral-200 md:border p-2 rounded-lg max-w-[40rem] bg-white dark:bg-neutral-900 md:p-8"
    >
        {pageElements}
    </div>;
}

export interface AuthScreenProps {
    authWidgetPage: AuthWidgetPage;
    setAuthWidgetPage: (page: AuthWidgetPage) => void;
}
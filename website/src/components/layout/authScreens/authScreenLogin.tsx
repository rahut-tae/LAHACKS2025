import { SaraburiTypography, SaraburiFormInput, SaraburiFormInputType, SaraburiButtonSubmit, SaraburiSpinner, SaraburiButtonClickable } from "@/components";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { AuthScreenProps, AuthWidgetPage } from "@/components/layout/authScreens/authWidget";
import { fetchServer, checkInternetConnection, authenticate, checkout } from "@/services/networkingService";

export default function AuthScreenLogin({ authWidgetPage, setAuthWidgetPage }: AuthScreenProps) {
    const { t } = useTranslation(); // Access toggle from the provider

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
    try {
        setEmailError("");
        setPasswordError("");
        const response = await fetchServer({
            action: "login",
            username: formData.email,
            password: formData.password,
            organizationId: 0,
        });

        const responseBody = await response.json();
        if (response.status === 200) {
            // successful register
            authenticate(responseBody.token);
            setAuthWidgetPage(AuthWidgetPage.CHECKOUT);
            await checkout();
        } else {
            const errorData = responseBody.errorData;
            switch (errorData.authErrorType) {
                case "email":
                case "general":
                    setEmailError(errorData.message);
                    break;
                case "password":
                    setPasswordError(errorData.message);
                    break;
                default:
                    alert("Something went wrong.");
                    setEmailError("Something went wrong.");
            }
            setLoading(false);
            return;
        }
        
    } catch (e) {
        let isThereInternet: boolean = await checkInternetConnection();
        if (isThereInternet === false) {
            alert("No internet connection.");
            setEmailError("No internet connection.");
        } else {
            alert("Something went wrong.");
            setEmailError("Something went wrong.");
        }
        setLoading(false);
        return;
    }
    };

    return <>
        <form id="contactForm" onSubmit={handleSubmit} className="flex flex-col gap-4">
            <SaraburiTypography variant="h3" className="mb-8 text-center md:text-left">{t.auth_login_title}</SaraburiTypography>
            <SaraburiFormInput
                formInputType={SaraburiFormInputType.TEXT}
                labelName={t.auth_login_email}
                id="email"
                inputValue={formData.email}
                inputOnChange={handleChange}
            ></SaraburiFormInput>
            <SaraburiTypography variant="error" className="mt-[-0.5rem]">{emailError}</SaraburiTypography>
            <SaraburiFormInput
                formInputType={SaraburiFormInputType.PASSWORD}
                labelName={t.auth_login_password}
                id="password"
                inputValue={formData.password}
                inputOnChange={handleChange}
            ></SaraburiFormInput>
            <SaraburiTypography variant="error" className="mt-[-0.5rem]">{passwordError}</SaraburiTypography>
            <button
                type="button"
                className="w-fit text-sm"
                onClick={() => setAuthWidgetPage(AuthWidgetPage.FORGOT_PASSWORD)}>
                    <u>{t.auth_login_forgotpassword}</u>
            </button>
            <div className="block md:flex mt-8">
                <SaraburiButtonSubmit
                    style={3}
                    isLoading={loading}
                    className="w-full md:w-32">
                        {t.auth_login_cta}
                </SaraburiButtonSubmit>
                <SaraburiButtonClickable
                    style={5}
                    className="w-full md:w-auto ml-0 md:ml-4 mt-4 md:mt-0"
                    onClick={() => setAuthWidgetPage(AuthWidgetPage.REGISTER)}>
                        {t.auth_login_cta2}
                </SaraburiButtonClickable>
            </div>
        </form>
    </>;
}
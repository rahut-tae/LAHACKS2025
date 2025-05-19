import { SaraburiTypography, SaraburiFormInput, SaraburiFormInputType, SaraburiButtonSubmit, SaraburiSpinner, SaraburiButtonClickable } from "@/components";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { AuthScreenProps, AuthWidgetPage } from "@/components/layout/authScreens/authWidget";
import { fetchServer, checkInternetConnection } from "@/services/networkingService";

export default function AuthScreenForgotPassword({ authWidgetPage, setAuthWidgetPage }: AuthScreenProps) {
    const { t } = useTranslation(); // Access toggle from the provider
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [emailError, setEmailError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        try {
            const response = await fetchServer({
                action: "forgotPassword",
                username: formData.email,
                organizationId: 0,
            });
            let responseBody = await response.json();
            if (response.status === 200) {
                // successful
                setAuthWidgetPage(AuthWidgetPage.SENT_FORGOT_PASSWORD);
                setLoading(false);
            } else {
                const errorData = responseBody.errorData;
                setEmailError(errorData.message);
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
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return <>
        <form id="contactForm" onSubmit={handleSubmit} className="flex flex-col gap-4">
            <SaraburiTypography variant="h3" className="mb-8 text-center md:text-left">{t.auth_forgotPassword_title}</SaraburiTypography>
            <p>{t.auth_forgotPassword_description}</p>
            <SaraburiFormInput
                formInputType={SaraburiFormInputType.TEXT}
                labelName={t.auth_forgotPassword_email}
                id="email"
                inputValue={formData.email}
                inputOnChange={handleChange}
            ></SaraburiFormInput>
            <SaraburiTypography variant="error" className="mt-[-0.5rem]">{emailError}</SaraburiTypography>
            <div className="block md:flex mt-8">
                <SaraburiButtonSubmit
                    style={3}
                    isLoading={loading}
                    className="w-full md:w-32">
                        {t.auth_forgotPassword_cta}
                </SaraburiButtonSubmit>
                <SaraburiButtonClickable
                    style={5}
                    className="md:ml-4 mt-4 md:mt-0"
                    onClick={() => setAuthWidgetPage(AuthWidgetPage.LOGIN)}>
                        {t.auth_forgotPassword_cta2}
                </SaraburiButtonClickable>
            </div>
        </form>
    </>;
}
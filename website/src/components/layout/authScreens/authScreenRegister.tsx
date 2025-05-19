import { SaraburiTypography, SaraburiFormInput, SaraburiFormInputType, SaraburiButtonSubmit, SaraburiSpinner, SaraburiButtonClickable } from "@/components";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { AuthScreenProps, AuthWidgetPage } from "@/components/layout/authScreens/authWidget";
import { fetchServer, authenticate, checkInternetConnection, checkout } from "@/services/networkingService";

export default function AuthScreenRegister({ authWidgetPage, setAuthWidgetPage }: AuthScreenProps) {
    const { t, getLinkWithLocale } = useTranslation(); // Access toggle from the provider

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [fullNameError, setFullNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setFullNameError("");
        setEmailError("");
        setPasswordError("");

        // parse the names
        const names = formData.fullName.split(' ');
        let firstName = "", lastName = "";
        if (names.length > 1) {
            firstName = names[0];
            // last names are all the names after the first one.
            for (let i = 1; i < names.length; i++) {
                lastName += `${names[i]} `;
            }
            lastName = lastName.substring(0, lastName.length - 1);
        } else {
            firstName = formData.fullName;
        }

        try {
            const response = await fetchServer({
                action: "register",
                username: formData.email,
                password: formData.password,
                email: formData.email,
                firstName: firstName,
                lastName: lastName,
                organizationId: 0,
            });

            const responseBody = await response.json();
            if (response.status === 200) {
                // successful register
                // create an organization for that user
                const orgResponse = await fetchServer({
                    action: "createOrganization",
                    token: responseBody.token,
                    organizationName: "Untitled Organization",
                });
                const orgResponseBody = await orgResponse.json();
                const organizationId = orgResponseBody.organizationId;
            
                // create subscription based off organization
                const subscriptionReponse = await fetchServer({
                    action: "createStripeSubscription",
                    token: responseBody.token,
                    organizationId: organizationId,
                    currency: "thb",
                    plan: 0,
                });
                const subscriptionResponseBody = await subscriptionReponse.json();
                authenticate(responseBody.token);
                setAuthWidgetPage(AuthWidgetPage.CHECKOUT);
                await checkout();
            } else {
                const errorData = responseBody.errorData;
                switch (errorData.authErrorType) {
                    case "name":
                    case "general":
                        setFullNameError(errorData.message);
                        break;
                    case "email":
                        setEmailError(errorData.message);
                        break;
                    case "password":
                        setPasswordError(errorData.message);
                        break;
                    default:
                        alert("Something went wrong.");
                        setFullNameError("Something went wrong.");
                }
                setLoading(false);
                return;
            }
            
        } catch (e) {
            let isThereInternet: boolean = await checkInternetConnection();
            if (isThereInternet === false) {
                alert("No internet connection.");
                setFullNameError("No internet connection.");
            } else {
                alert("Something went wrong.");
                setFullNameError("Something went wrong.");
            }
            setLoading(false);
            return;
        }
    };

    return <>
        <form id="contactForm" onSubmit={handleSubmit} className="flex flex-col gap-4">
            <SaraburiTypography variant="h3" className="mb-8 text-center md:text-left">{t.auth_register_title}</SaraburiTypography>
            <SaraburiFormInput
                formInputType={SaraburiFormInputType.TEXT}
                labelName={t.auth_register_fullName}
                id="fullName"
                inputValue={formData.fullName}
                inputOnChange={handleChange}
            ></SaraburiFormInput>
            <SaraburiTypography variant="error" className="mt-[-0.5rem]">{fullNameError}</SaraburiTypography>
            <SaraburiFormInput
                formInputType={SaraburiFormInputType.TEXT}
                labelName={t.auth_register_email}
                id="email"
                inputValue={formData.email}
                inputOnChange={handleChange}
            ></SaraburiFormInput>
            <SaraburiTypography variant="error" className="mt-[-0.5rem]">{emailError}</SaraburiTypography>
            <SaraburiFormInput
                formInputType={SaraburiFormInputType.PASSWORD}
                labelName={t.auth_register_password}
                id="password"
                inputValue={formData.password}
                inputOnChange={handleChange}
            ></SaraburiFormInput>
            <SaraburiTypography variant="error" className="mt-[-0.5rem]">{passwordError}</SaraburiTypography>
            <p className="text-xs text-neutral-400">{t.auth_register_disclaimer1} <u><a href={getLinkWithLocale("/terms")}>{t.auth_register_disclaimer_terms}</a></u> {t.auth_register_disclaimer2} <u><a href={getLinkWithLocale("/privacy")}>{t.auth_register_disclaimer_privacy}</a></u> {t.auth_register_disclaimer3}</p>
            <div className="block md:flex mt-8">
                <SaraburiButtonSubmit
                    style={3}
                    isLoading={loading}
                    className="w-full md:w-32">
                        {t.auth_register_cta}
                </SaraburiButtonSubmit>
                <SaraburiButtonClickable
                    style={5}
                    className="w-full md:w-auto ml-0 mt-4 md:ml-4 md:mt-0"
                    onClick={() => setAuthWidgetPage(AuthWidgetPage.LOGIN)}>
                        {t.auth_register_cta2}
                </SaraburiButtonClickable>
            </div>
        </form>
    </>;
}

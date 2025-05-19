import { SaraburiTypography } from "@/components";
import { useTranslation } from "@/hooks/useTranslation";
import { AuthScreenProps } from "@/components/layout/authScreens/authWidget";

export default function AuthScreenCheckout({ authWidgetPage, setAuthWidgetPage }: AuthScreenProps) {
    const { t } = useTranslation(); // Access toggle from the provider
    return <>
        <SaraburiTypography variant="h3" className="mb-8 text-center md:text-left">{t.auth_checkout_title}</SaraburiTypography>
        <p>{t.auth_checkout_description}</p>
    </>;
}
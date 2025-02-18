import {CUSTOM_FONT_FAMILY} from "Theme";
import {LogoLink} from "base/navigation/components";
import {Footer, FooterTextLink} from "base/ui/footer";

const IsocronasFooter = ({isFixed = false}) => {
    const logoHeight = "36px";
    const logoHeightMobile = "28px";

    const isocronasFooterLinks = [
        <FooterTextLink
            to="https://icarto.es/www/politica-de-privacidad/"
            title="Página de Aviso Legal de iCarto"
            text="Aviso legal"
        />,
    ];

    const isocronasFooterLogo = (
        <LogoLink
            href=""
            title="Navega a la web de iCarto"
            src="/images/footer_logo.png"
            alt="Logo de iCarto"
            style={{my: "14px"}}
            logoHeight={logoHeight}
            logoHeightMobile={logoHeightMobile}
        />
    );

    return (
        <Footer
            text="© 2024 iCarto"
            fontFamily={CUSTOM_FONT_FAMILY}
            position={isFixed ? "fixed" : "relative"}
        />
    );
};

export default IsocronasFooter;

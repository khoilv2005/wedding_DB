import ContactHeroSection from "./_components/about-us";
import ContactFormSection from "./_components/contact-form";
import EmailCTASection from "./_components/email-section";
import GetInTouchSection from "./_components/get-in-touch";

const contact = () => {
    return(
        <>
        <div>
            <ContactHeroSection />
        </div>
        <div className="mt-[100px] md:mt-[100px]">
            <GetInTouchSection  />
        </div>
        <div>
            <ContactFormSection />
        </div>
        <div>
            <EmailCTASection
                scriptText="Get in touch with us"
                mainText="We are here to help you with your wedding planning."
                buttonText="Contact Us"
                buttonLink="/contact"
                backgroundColor="bg-gray-800"
                backgroundOpacityClass="bg-opacity" 
            />
        </div>
        </>
    )
}
export default contact;

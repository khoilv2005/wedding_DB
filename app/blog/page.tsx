import HeroAboutSection from "./_components/about-us";
import EmailCTASection from "./_components/contact-us";

const Blog = () => {
  return (
    <>
    <div>
      <HeroAboutSection />
    </div>
     <div className="mt-[400px] md:mt-[500px]">
      <EmailCTASection />
      </div>
    </>
  );
};

export default Blog;

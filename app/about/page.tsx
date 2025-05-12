import HeroAboutSection from "./_components/about-us";
import OurBelow from "./_components/below-our-story";
import DreamItDoItSection from "./_components/introduce";
import MeetTheTeamSection from "./_components/meet-team";
import OurApproach from "./_components/our-approach";
import OurStorySection from "./_components/our-story";
import TeamMembersSection from "./_components/team-members";
import TwoWeddingImagesSection from "./_components/two-wedding";


const About = () => {
    return (
        <div>
            <div className="mb-24">
                <HeroAboutSection />
            </div>
            <div className="mt-[400px] md:mt-[500px]">
                <OurApproach />
            </div>
            <div>
                <TwoWeddingImagesSection />
            </div>
            <div>
                <DreamItDoItSection />
            </div>
            <div>
                <OurStorySection />
            </div>
            <div>
                <OurBelow />
            </div>
            <div>
                <MeetTheTeamSection />
            </div>
            <div>
                <TeamMembersSection />
            </div>
            <div>
                <TeamMembersSection />
            </div>
        </div>
        
    )
}

export default About;
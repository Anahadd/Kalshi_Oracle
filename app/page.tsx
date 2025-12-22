import { ProjectCard } from "@/components/project-card";
import { ScrollToExplore } from "@/components/scroll-to-explore";
import { Hero } from "@/components/hero";
import { FooterTrigger } from "@/components/footer-trigger";

const projects = [
  {
    title: "NYC Election",
    category: "Generative AI Experiment",
    image: "/images/nyc_mayor_no_text.png",
    href: "https://kalshi.com/hub/elections-2025",
  },
  {
    title: "Field Unit",
    category: "Film Production Company",
    image: "/images/field-unit.jpg",
    href: "/project/field-unit",
  },
  {
    title: "Östgötateatern",
    category: "Sweden's Largest Regional Theatre",
    image: "/images/ostgotateatern.jpg",
    href: "/project/ostgotateatern",
  },
  {
    title: "Rudolfson",
    category: "Photographer Portfolio",
    image: "/images/rudolfson.jpg",
    href: "/project/rudolfson",
  },
  {
    title: "Design is Funny",
    category: "Designer Portfolio",
    image: "/images/design-is-funny.jpg",
    href: "/project/design-is-funny",
  },
  {
    title: "Kolmården",
    category: "Interactive Wildlife Park Map",
    image: "/images/kolmarden.jpg",
    href: "/project/kolmarden",
  },
  {
    title: "Scavolini sthlm",
    category: "Kitchen showroom",
    image: "/images/scavolini.jpg",
    href: "/project/scavolini",
  },
];

export default function Home() {
  return (
    <main 
      className="bg-black min-h-screen w-full relative selection:bg-white selection:text-black"
    >
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{ 
          backgroundImage: 'url(/images/kalshi-texture.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="relative z-10 w-full">
        <Hero />
        <ScrollToExplore />
      
        <div className="flex flex-col items-center w-full pb-20">
        <div className="w-full py-32 flex justify-center">
            <span className="font-serif text-[15vw] leading-none text-white opacity-100 select-none">
                From
            </span>
        </div>

        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            index={index}
            {...project}
          />
        ))}

        <FooterTrigger />
        </div>
      </div>
    </main>
  );
}

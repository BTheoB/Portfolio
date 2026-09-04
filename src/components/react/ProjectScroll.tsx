import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  data: {
    title: string;
    description: string;
    screens: string[];
    videos?: string[];
  };
}

interface Props {
  projects: Project[];
}

type Media = { type: "image" | "video"; src: string };

// Découpe un tableau en groupes de `size` éléments
function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export default function ProjectsScroll({ projects }: Props) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mediaItems = gsap.utils.toArray<HTMLElement>(".project-media");

    mediaItems.forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, { scope: container });

  return (
    <div ref={container} className="projects-scroll">
      {projects.map((project) => {
        // Fusionne screens + videos en une seule liste typée
        const media: Media[] = [
          ...(project.data.videos ?? []).map((src) => ({ type: "video" as const, src })),
          ...project.data.screens.map((src) => ({ type: "image" as const, src })),
        ];

        // Découpe en lignes de 2
        const rows = chunkArray(media, 2);

        return (
          <section key={project.id} className="project-block lg:flex flex-row-reverse">
            <div className="project-text sm:w-2/10">
              <h2>{project.data.title}</h2>
              <p>{project.data.description}</p>
            </div>
            <div className="media-stack flex flex-col gap-2 lg:w-8/10">
              {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex flex-wrap gap-4">
                  {row.map((item, i) =>
                    item.type === "video" ? (
                      <video
                        key={i}
                        className="project-media w-full sm:w-1/2 h-auto rounded-xl"
                        src={item.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        key={i}
                        className="project-media w-full sm:w-1/3 h-auto rounded-md"
                        src={item.src}
                        alt=""
                        loading="lazy"
                      />
                    )
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
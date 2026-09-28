import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectLightbox from "./ProjectLightbox";
import BorderStyle from "./BorderStyle";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  data: {
    title: string;
    description: string;
    media: string[];
    displayStructure: number[];
    technologies: string[];
    githubUrl?: string;
  };
}
interface Props {
  projects: Project[];
}

function getColSpan(rowLength: number): string {
  if (rowLength === 1) return "col-span-6";
  if (rowLength === 2) return "col-span-3";
  if (rowLength === 3) return "col-span-2";
  return "col-span-6";
}

function chunkMediaByStructure(
  media: string[],
  displayStructure: number[],
): string[][] {
  const rows: string[][] = [];
  let index = 0;
  for (const size of displayStructure) {
    rows.push(media.slice(index, index + size));
    index += size;
  }
  return rows;
}

export default function ProjectsScroll({ projects }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const [activeMediaList, setActiveMediaList] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const openLightbox = (mediaList: string[], index: number) => {
    setActiveMediaList(mediaList);
    setCurrentIndex(index);
    setIsOpen(true);
  };

  useGSAP(
    () => {
      const mediaItems = gsap.utils.toArray<HTMLElement>(".project-media");
      mediaItems.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 200 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power4.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              end: "top 30%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className="m-5">
      {projects.map((project) => {
        const rows = chunkMediaByStructure(
          project.data.media,
          project.data.displayStructure,
        );

        return (
          <section
            key={project.id}
            className="lg:flex flex-row-reverse mb-7 gap-7"
          >
            <div className="flex flex-col items-center lg:w-2/10 mb-10">
              <BorderStyle>
                <h2 className="text-text-primary text-center text-title-size font-bold italic">
                  {project.data.title}
                </h2>
              </BorderStyle>
              <p className="text-text-primary text-corps-size mb-5">
                {project.data.technologies.join(" | ")}
              </p>
              <p className="text-text-primary text-sm text-justify">
                {project.data.description}
              </p>
              {project.data.githubUrl && (
                <a
                  className="text-accent mt-5 underline decoration-accent decoration-2 underline-offset-4 transition duration-200 ease-in-out hover:-translate-y-0.5 hover:text-[#e9d5ff] focus-visible:-translate-y-0.5 focus-visible:text-[#e9d5ff]"
                  href={project.data.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Information détaillé sur GitHub
                </a>
              )}
            </div>
            <div className="flex flex-col gap-4 lg:w-8/10">
              {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-6 gap-4">
                  {row.map((media, mediaIdx) => {
                    const globalIndex = project.data.media.indexOf(media);

                    return (
                      <button
                        key={mediaIdx}
                        type="button"
                        onClick={() =>
                          openLightbox(project.data.media, globalIndex)
                        }
                        className={`project-media overflow-hidden rounded-xl cursor-pointer ${getColSpan(row.length)}`}
                      >
                        {media.includes(".mp4") ? (
                          <video
                            className="w-full h-auto object-contain rounded-md"
                            src={media}
                            autoPlay
                            muted
                            loop
                            playsInline
                          />
                        ) : (
                          <img
                            className="w-full h-auto object-contain rounded-md"
                            src={media}
                            alt=""
                            loading="lazy"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </section>
        );
      })}

      <ProjectLightbox
        mediaList={activeMediaList}
        currentIndex={currentIndex}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}

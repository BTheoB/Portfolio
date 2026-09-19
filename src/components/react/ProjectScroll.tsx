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
            className="project-block lg:flex flex-row-reverse mb-7 gap-7"
          >
            <div className="project-text sm:w-2/10">
              <BorderStyle>
                <h2 className="text-text-primary text-center text-title-size font-bold italic">
                  {project.data.title}
                </h2>
              </BorderStyle>
              <p className="text-text-primary text-corps-size text-justify">
                {project.data.description}
              </p>
            </div>
            <div className="media-stack flex flex-col gap-4 lg:w-8/10">
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
                        className={`project-media overflow-hidden aspect-video rounded-xl cursor-pointer ${getColSpan(row.length)}`}
                      >
                        {media.includes(".mp4") ? (
                          <video
                            className="w-full h-auto rounded-xl"
                            src={media}
                            autoPlay
                            muted
                            loop
                            playsInline
                          />
                        ) : (
                          <img
                            className="w-full h-auto rounded-md"
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

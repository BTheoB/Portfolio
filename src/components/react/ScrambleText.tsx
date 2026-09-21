import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

interface Props {
  text: string;
  offset: number;
  duration: number;
}

export default function ScrambleText({ text, offset, duration }: Props) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        id: "text-scramble",
        defaults: { ease: "none" },
      });
      const scrambleText = gsap.utils.toArray<HTMLElement>(".scramble-text")[0];
      scrambleText.innerText = "";
      function Scramble() {
        tl.to(scrambleText, {
        duration: duration,
        scrambleText: {text,
        chars :"01&'()=^$*µ%£@#~{}[]<>",
    },
      });
      }
      gsap.delayedCall(offset, Scramble);
      
    },
    { scope: container },
  );

  return (
    <div ref={container}>
      <div className="scramble-text">{text}</div>
    </div>
  );
}

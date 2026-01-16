import useInView from "@/hooks/useInView";
import { faker } from "@faker-js/faker";
import {
  BookmarkIcon,
  ForwardIcon,
  HeartIcon,
  MessageCircleIcon,
  TagIcon,
} from "lucide-react";
import { useEffect, type ReactNode } from "react";

function PostVideo({ src }: { src: string }) {
  const { ref, inView } = useInView<HTMLVideoElement>({ threshold: 0.9 });
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (inView) {
      video.play();
    } else {
      video.pause();
    }
  }, [inView]);

  return (
    <video
      ref={ref}
      src={src}
      playsInline
      className="w-full h-full"
      loop
      preload="metadata"
      onClick={({ currentTarget: element }) => {
        if (element.paused) {
          element.play();
        } else {
          element.pause();
        }
      }}
    />
  );
}

function PostImages({ images }: { images: string[] }) {
  return (
    <div className="w-full h-full overflow-x-scroll overflow-y-hidden flex items-center gap-2 snap-x snap-mandatory scroll-smooth no-scrollbar">
      {images.map((image) => (
        <div className="w-full shrink-0 h-full  snap-center">
          <img
            src={image}
            className="w-full h-full object-center object-contain"
          />
        </div>
      ))}
    </div>
  );
}

function IconButton({ children }: { children: ReactNode }) {
  return (
    <button className="flex flex-col justify-center items-center text-primary-foreground/50  hover:text-primary-foreground   p-2 duration-200">
      {children}
    </button>
  );
}

export function Snap({ snap }: { snap: SnapType }) {
  return (
    <div className="h-dvh w-dvw relative snap-center">
      <div className="h-dvh w-dvw flex items-center justify-center">
        {"video" in snap && <PostVideo src={snap.video} />}
        {"images" in snap && <PostImages images={snap.images} />}
      </div>

      <div className="absolute right-1 sm:right-2 top-[50%] translate-y-[-50%] flex flex-col  items-center p-2">
        <IconButton>
          <HeartIcon />
          <span>{snap.links}</span>
        </IconButton>

        <IconButton>
          <ForwardIcon />
          <span>{snap.shares}</span>
        </IconButton>

        <IconButton>
          <MessageCircleIcon />
          <span>{snap.comments}</span>
        </IconButton>
        <IconButton>
          <BookmarkIcon />
          <span>{snap.comments}</span>
        </IconButton>

        <img
          src={snap.creator.avatar}
          className="size-8 rounded-full mt-2 ring"
        />
      </div>
      <div className="absolute bottom-18 text-sm sm:text-base left-[50%] min-w-xs translate-x-[-50%]  flex flex-col gap-2">
        <p>{snap.description}</p>
        <div className="flex flex-wrap gap-2">
          {snap.tags.map((tag) => (
            <div className="flex items-center gap-1">
              <TagIcon className="size-4" />
              <span>{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const createSnap = () => ({
  ...{
    id: faker.string.uuid(),
    description: faker.lorem.paragraph(),
    tags: faker.helpers.arrayElements([
      faker.book.genre(),
      faker.book.genre(),
      faker.book.genre(),
      faker.book.genre(),
      faker.book.genre(),
      faker.book.genre(),
    ]),
    links: faker.number.int(1000),
    comments: faker.number.int(1000),
    shares: faker.number.int(1000),
    creator: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      avatar: faker.image.avatar(),
    },
    linked: faker.datatype.boolean(),
    isInYourWishlist: faker.datatype.boolean(),
    inInPlaylist: faker.datatype.boolean(),
  },
  ...(faker.datatype.boolean({ probability: 0.3 })
    ? {
        type: "images",
        images: faker.helpers.arrayElements([
          faker.image.url(),
          faker.image.url(),
          faker.image.url(),
          faker.image.url(),
          faker.image.url(),
          faker.image.url(),
        ]),
      }
    : {
        type: "video",
        video: faker.helpers.arrayElement([
          "./videos/1.mp4",
          "./videos/2.mp4",
          "./videos/3.mp4",
          "./videos/4.mp4",
        ]),
      }),
});

type SnapType = ReturnType<typeof createSnap>;

export default function SnapList() {
  return (
    <div className="w-dvw h-dvh overflow-x-hidden snap-y snap-mandatory scroll-smooth no-scrollbar">
      <Snap snap={createSnap()} />
      <Snap snap={createSnap()} />
      <Snap snap={createSnap()} />
      <Snap snap={createSnap()} />
      <Snap snap={createSnap()} />
      <Snap snap={createSnap()} />
      <Snap snap={createSnap()} />
      <Snap snap={createSnap()} />
      <Snap snap={createSnap()} />
      <Snap snap={createSnap()} />
    </div>
  );
}

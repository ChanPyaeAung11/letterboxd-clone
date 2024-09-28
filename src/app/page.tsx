import Image from "next/image";
import heroImg from "@/images/hero-img.jpg";
import batPost from "@/images/batman.jpg";
import pastPost from "@/images/pastlives.jpg";
import dunePost from "@/images/dune2.jpg";
import oldPost from "@/images/oldboy.jpg";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-grow flex flex-col mx-auto px-4 py-0 text-center overflow-hidden">
      <div className="flex flex-col items-center justify-between">
        <div className="relative w-full h-64 md:h-96 mb-4">
          <Image
            src={heroImg}
            objectFit="cover"
            layout="fill"
            alt="A fram from Interstellar"
          ></Image>
        </div>
        <h1 className="text-3xl font-bold mb-4">Welcome to Letterboxd Clone</h1>
        <p className="mb-4">
          Track films you've watched. Save those you want to see. Tell your
          friends what's good.
        </p>
        <Link
          href="/films"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-bold"
        >
          Get Started - it's free!
        </Link>
        <p className="mt-4 mb-4">The social network for film lovers.</p>
      </div>
      <div className="overflow-x-auto whitespace-nowrap pb-4">
        <div className="inline-flex space-x-4">
          {[batPost, pastPost, dunePost, oldPost].map((src, index) => (
            <Image
              key={index}
              src={src}
              width={200}
              height={50}
              alt={`Movie poster ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

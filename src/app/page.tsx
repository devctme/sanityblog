import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCards } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";

async function getData() {
  const query = `
  *[_type=='blog'] | order(_createdAt desc){
    title,
    smallDescription,
    "currentSlug": slug.current,
    titleImge      
  }
  `;

  const data = await client.fetch(query);

  return data;
}

export default async function Home() {
  const datas: simpleBlogCards[] = await getData();

  return (
    <div className=" grid grid-cols-1 md:grid-cols-3 mt-5 gap-5 ">
      {datas.map((post, idx) => (
        <Card key={idx} className="flex items-center gap-4 flex-col">
          <Image
            width={500}
            height={500}
            src={urlFor(post.titleImge).url()}
            alt="image"
            className="object-cover"
          />

          <CardContent className="mt-5">
            <h3 className="text-2xl font-bold line-clamp-2">{post.title}</h3>
            <p className="line-clamp-3 dark:text-gray-300">
              {post.smallDescription}
            </p>

            <Button asChild className="w-full mt-7">
              <Link href={`/blog/${post.currentSlug}`}>Read more</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

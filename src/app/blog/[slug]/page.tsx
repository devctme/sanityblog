import { fullBlog } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import React from "react";

async function getData(slug: string) {
  const query = `
  *[_type == 'blog' && slug.current == '${slug}']{
    "currentSlug": slug.current,
    title,
    content,
    titleImge
  }[0]  
  `;

  const data = await client.fetch(query);

  return data;
}

const BlogArticle = async ({ params }: { params: { slug: string } }) => {
  const blogsData: fullBlog = await getData(params.slug);

  return (
    <div className="flex flex-col  items-center gap-6 ">
      <h1>
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
          devct- Blog
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tighter sm:text-4xl">
          {blogsData.title}
        </span>
      </h1>
      <Image
        src={urlFor(blogsData.titleImge).url()}
        width={500}
        height={500}
        alt={blogsData.title}
        priority
        className="object-cover rounded-lg border shadow-xl border-gray-300"
      />
      <div className="mt-16 prose prose-blue prose-xl dark:prose-invert prose-li:marker:text-primary ">
        <PortableText value={blogsData.content} />
      </div>
    </div>
  );
};

export default BlogArticle;

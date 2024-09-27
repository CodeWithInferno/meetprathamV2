"use client";
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import BlockContent from "@sanity/block-content-to-react";

const client = sanityClient({
  projectId: "1igdvz19",
  dataset: "production",
  useCdn: false, // Enable if you want to use the CDN
});

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

async function getData(slug) {
  const query = `
    *[_type == "post" && slug.current == '${slug}'] {
      "CurrentSlug": slug.current,
      title, 
      publishedAt,
      body[]{
        ...,
        asset->{
          _id
        }
      }
    }[0]
  `;
  const data = await client.fetch(query);

  // Add the image URL to the asset object for each block in the body array
  if (data.body) {
    data.body = data.body.map((block) => {
      if (block.asset) {
        block.asset.url = urlFor(block.asset).url();
      }
      return block;
    });
  }

  return data;
}

export default function BlogArticle({ params }) {
  const { slug } = params || {};
  const [data, setData] = useState(null);

  useEffect(() => {
    getData(slug).then(setData);
  }, [slug]);

  if (!data)
    return (
      <div className="bg-white text-black min-h-screen h-full bg-no-repeat">
        Loading...
      </div>
    );

  return (
    <div className="bg-white text-black">
      <Header />

      <div className="bg-white text-black min-h-screen h-full bg-no-repeat flex flex-col items-center">
        <div className="mt-12 w-full mb-28 max-w-4xl px-8 py-6 bg-gray-100 shadow-lg rounded-lg mx-auto">
          <h1 className="font-bold text-4xl mb-4">{data.title}</h1>
          <p className="text-gray-600">
            Published at: {new Date(data.publishedAt).toLocaleDateString()}
          </p>
          {data.body.map((block, index) => (
  <div key={index} className="my-4">
    {block._type === "block" && (
      <BlockContent blocks={block} projectId="1igdvz19" dataset="production" />
    )}
    {block.asset && (
      <img className="my-4 rounded" src={block.asset.url} alt="" />
    )}
  </div>
))} 
        </div>
        <Footer />
      </div>
    </div>
  );
}





















"use client";
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import BlockContent from "@sanity/block-content-to-react";
import LoadingAnimation from "../../Components/ui/loader/loader";

const client = sanityClient({
  projectId: "1igdvz19",
  dataset: "production",
  useCdn: true,
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

  // Check if data and data.body exist
  if (data && data.body) {
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
      <div className="bg-white text-black min-h-screen flex items-center justify-center">
      <div>
        <LoadingAnimation />
      </div>
      </div>
    );

  return (
    <div className="bg-gray-100 text-black font-serif">
      <Header />

      <div className="bg-white text-black min-h-screen flex flex-col items-center px-4">
        <div className="mt-12 w-full mb-28 max-w-2xl sm:max-w-3xl px-4 sm:px-8 py-8 bg-white shadow-lg rounded-lg mx-auto transition-all duration-300 transform hover:shadow-2xl">
          <h1 className="font-bold text-4xl sm:text-5xl text-center mb-6 text-gray-800 break-words">
            {data.title}
          </h1>
          <p className="text-gray-500 text-center text-sm sm:text-base mb-8">
            Published on: {new Date(data.publishedAt).toLocaleDateString()}
          </p>

          <div className="space-y-6">
            {/* Ensure data.body exists before mapping */}
            {data.body && data.body.map((block, index) => (
              <div key={index} className="my-4">
                {block._type === "block" && (
                  <BlockContent
                    blocks={block}
                    projectId="1igdvz19"
                    dataset="production"
                    className="text-base sm:text-lg leading-relaxed text-gray-700"
                  />
                )}
                {block.asset && (
                  <div className="my-6 flex justify-center">
                    <img
                      className="rounded-lg border border-gray-300 shadow-lg transition-transform duration-300 transform hover:scale-105"
                      src={block.asset.url}
                      alt=""
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
import React from "react";
import PreviewPageComponent from "@/components/PreviewPageComponent";
import { Metadata, ResolvingMetadata } from "next";
import axios from "axios";
import { notFound } from "next/navigation"; // Import notFound

type Props = {
  params: {
    username: string;
  };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    console.log("hello");
    // Make the API call to get metadata for the user
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/api/v1/profile/get-metadata/${params.username}`
    );

    // If the response indicates failure (success is false), redirect to 404
    if (!res.data.success) {
      notFound(); // This will redirect to the 404 page
    }

    const { name, username, image, profile_title, bio } = res.data.newUser;

    // Return metadata if successful
    return {
      title: `${params.username}'s profile`, // Customize metadata based on API response
      openGraph: {
        title: `${params.username}'s profile`,
        description: profile_title,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: `${username}'s profile Image`,
          },
        ],
        type: "profile",
      },
      twitter: {
        card: "summary_large_image", // Use the large image card
        title: `${params.username}'s profile`,
        description: profile_title || bio,
        images: [image], // Twitter supports a single image URL for large cards
      },
    };
  } catch (error) {
    // console.error("Error fetching metadata:", error);
    notFound(); // Redirect to 404 if an error occurs
    return {
      title: "Default Title", // Fallback in case of an error
    };
  }
}

const Page = ({ params }: Props) => {
  return <PreviewPageComponent />;
};

export default Page;

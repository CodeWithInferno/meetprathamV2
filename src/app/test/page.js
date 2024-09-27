 

import { Metadata } from "next";


export const metadata = {
  title: "Test",
  description: "This is a test page",
  keywords: ["test", "testing"]
};

export default function Test() {
  return (
    <div>
      <h1>Test</h1>
      <p>This is a test page</p>
    </div>
  );
}
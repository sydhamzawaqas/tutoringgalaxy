import Page from "../../academy/[slug]/page";
export default function P() {
  return <Page params={Promise.resolve({ slug: "ged" })} searchParams={Promise.resolve({})} />;
}

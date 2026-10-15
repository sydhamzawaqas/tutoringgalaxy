import Page from "../../academy/[slug]/page";
export default function P() {
  return <Page params={Promise.resolve({ slug: "ib" })} searchParams={Promise.resolve({})} />;
}

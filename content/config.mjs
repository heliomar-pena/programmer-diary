/**
 * @type {import("../config/siteConfig").UserConfig}
 */
const config = {
  title: "Programmer's Diary",
  description: "A blog about programming and web development from the perspective of a self-taught developer.",
  author: "Heliomar Peña",
  domain: "https://programmers-diary.vercel.app/",
  // links to the pages you want to link to in the navbar and in the footer
  navLinks: [{ href: "/blog", name: "Blog" }],
  comments: {
    provider: "giscus",
    config: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
    }
  }
};

export default config;

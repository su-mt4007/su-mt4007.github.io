import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Statistical Data Processing",
  description: "Course page for MT4007 given at Stockholm University",
  markdown: {
    math: true,
  },
  themeConfig: {
   // editLink: {
   //   pattern:"https://github.com/mt4007-ht23/mt4007-ht23.github.io/issues/new?title=:path",
   //   text:"Suggest a change or notify an issue on this page"
   // },
    search:{
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Lectures', link: '/lectures/' },
      { text: 'Homework', link: '/homework/' },
      { text: 'Project', link: '/project' },
      { text: 'Exam', link: '/exam/' },
    ],
    sidebar: {
      '/lectures/': [
        {
          text: "Lectures",
          items: [
            { text: 'Week 1', link: '/lectures/week-1' },
//            { text: 'Week 2', link: '/lectures/week-2' },
//            { text: 'Week 3', link: '/lectures/week-3' },
//            { text: 'Week 4', link: '/lectures/week-4' },
//            { text: 'Week 5', link: '/lectures/week-5' },
//            { text: 'Week 6', link: '/lectures/week-6' },
          ]
        }
      ],
      '/homework/': [
        {
          text: "Homework",
          items: [
            { text: 'Homework 1', link: '/homework/1' },
//            { text: 'Homework 2', link: '/homework/2' },
//            { text: 'Homework 3', link: '/homework/3' },
//            { text: 'Homework 4', link: '/homework/4' },
//            { text: 'Homework 5', link: '/homework/5' },
//            { text: 'Homework 6', link: '/homework/6' },
          ]
        }
      ],
    },
    //socialLinks: [
    //  { icon: 'github', link: 'https://github.com/su-mt4007' }
    //]
  }
})

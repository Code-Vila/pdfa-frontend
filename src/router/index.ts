import type { RouteRecordRaw } from "vue-router";

// Lazy loading das views
const Home = () => import("@/views/Home.vue");
const PdfConverter = () => import("@/views/PdfConverter.vue");
const History = () => import("@/views/History.vue");
const Expansion = () => import("@/views/Expansion.vue");
const About = () => import("@/views/About.vue");

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Ferramentas para Documentos",
      description:
        "Plataforma completa com ferramentas profissionais para processamento de documentos PDF",
    },
  },
  {
    path: "/pdf-converter",
    name: "PdfConverter",
    component: PdfConverter,
    meta: {
      title: "Converter PDF para PDF/A",
      description:
        "Converta seus documentos PDF para o formato PDF/A de forma rápida e gratuita",
    },
  },
  {
    path: "/history",
    name: "History",
    component: History,
    meta: {
      title: "Histórico de Conversões",
      description:
        "Visualize o histórico das suas conversões e baixe os arquivos",
    },
  },
  {
    path: "/expansion",
    name: "Expansion",
    component: Expansion,
    meta: {
      title: "Solicitar Expansão",
      description: "Solicite aumento do limite diário de conversões",
    },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      title: "Sobre o PDF/A Converter",
      description:
        "Saiba mais sobre o serviço e como funciona a conversão PDF/A",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

import { Suspense, type ComponentType } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import {
  AboutPage,
  CertificationsPage,
  ContactPage,
  EducationPage,
  ExperiencePage,
  HomePage,
  ProjectsPage,
  SkillsPage,
} from "@/lib/route-prefetch";

const routeLoader = (
  <div className="min-h-[70vh] flex items-center justify-center px-6">
    <div className="glass rounded-2xl px-6 py-4 text-sm text-gray-300">
      Loading section...
    </div>
  </div>
);

const withSuspense = (Page: ComponentType) => (
  <Suspense fallback={routeLoader}>
    <Page />
  </Suspense>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={withSuspense(HomePage)} />
        <Route path="about" element={withSuspense(AboutPage)} />
        <Route path="experience" element={withSuspense(ExperiencePage)} />
        <Route path="projects" element={withSuspense(ProjectsPage)} />
        <Route path="skills" element={withSuspense(SkillsPage)} />
        <Route path="education" element={withSuspense(EducationPage)} />
        <Route
          path="certifications"
          element={withSuspense(CertificationsPage)}
        />
        <Route path="contact" element={withSuspense(ContactPage)} />
      </Route>
    </Routes>
  );
}

export default App;

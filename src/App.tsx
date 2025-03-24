import React, { useState } from 'react';
import { DataEntryForm } from './components/DataEntryForm';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ThemeToggle } from './components/ThemeToggle';
import type { PortfolioData } from './types';

function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleFormSubmit = (data: PortfolioData) => {
    const enhancedData = {
      ...data,
      about: {
        ...data.about,
        skills: data.about.skills.split(',').map(item => item.trim()).filter(item => item.length > 0),
        interests: data.about.interests.split(',').map(item => item.trim()).filter(item => item.length > 0),
      }
    };
    setPortfolioData(enhancedData);
    setShowForm(false);
  };

  const toggleTheme = () => {
    setIsDark(prevState => !prevState);
    document.documentElement.classList.toggle('dark');
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center mb-8">Create Your Portfolio</h1>
          <DataEntryForm onSubmit={handleFormSubmit} />
        </div>
      </div>
    );
  }

  if (!portfolioData) return null;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
      <Navbar name={portfolioData.name} />
      <Hero name={portfolioData.name} shortBio={portfolioData.shortBio} />
      <About
        profilePicture={portfolioData.about.profilePicture}
        description={portfolioData.about.description}
        skills={portfolioData.about.skills}
        interests={portfolioData.about.interests}
      />
      <Projects initialProjects={portfolioData.projects} />
      <Contact />
      <Footer socialMedia={portfolioData.socialMedia} />
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
    </div>
  );
}

export default App;
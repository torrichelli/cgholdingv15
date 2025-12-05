import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import Divisions from './components/Divisions';
import DivisionDetail from './components/DivisionDetail';
import AboutSection from './components/AboutSection';
import Contact from './components/Contact';
import ChatWidget from './components/ChatWidget';
import Footer from './components/Footer';
import SystemStatus from './components/SystemStatus';
import CreativeID from './components/CreativeID';
import { Ecosystem, Partners } from './components/HomeSections';
import { CareerPage, ResearchPage, TechnologiesPage, InvestorRelationsPage } from './components/ExtraPages';
import ArticleDetail from './components/ArticleDetail';
import { PrivacyPolicy, TermsOfUse } from './components/LegalPages';
import { StatusPage } from './components/StatusPage';
import { DIVISIONS, NAV_ITEMS, ARTICLES } from './constants';
import { PageView } from './types';
import { useAuthStore } from './stores/authStore';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [previousView, setPreviousView] = useState<PageView>('home');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [ssoRedirect, setSsoRedirect] = useState<'cms' | null>(null);
  const { isAuthenticated, checkAuth, user, generateSSOToken } = useAuthStore();

  useEffect(() => {
    checkAuth();
    
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get('redirect');
    
    if (redirect === 'cms') {
      setSsoRedirect('cms');
      setIsAuthOpen(true);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const title = currentView === 'home' 
      ? 'CreativeGroup | Technology Ecosystem' 
      : `CreativeGroup | ${currentView.charAt(0).toUpperCase() + currentView.slice(1)}`;
    document.title = title;
  }, [currentView]);

  const navigateTo = (view: PageView, id?: string) => {
    // Save the current view as previous before changing, unless we are just refreshing the same view
    if (view !== currentView) {
      setPreviousView(currentView);
    }
    
    // Handle Article Selection
    if (view === 'article' && id) {
       setSelectedArticleId(id);
    }

    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getDivisionData = (id: string) => DIVISIONS.find(d => d.id === id);
  const getArticleData = (id: string) => ARTICLES.find(a => a.id === id);

  // Logic to determine Back Button behavior
  const getBackProps = () => {
    // If we came from 'about', we go back to 'about'. Otherwise default to 'home'.
    const isFromAbout = previousView === 'about';
    return {
      label: isFromAbout ? 'Назад в О компании' : 'На Главную',
      action: () => navigateTo(isFromAbout ? 'about' : 'home')
    };
  };

  return (
      <div className="min-h-screen font-sans bg-[#F5F5F7]">
        {currentView !== 'cms' && <SystemStatus />}
        {currentView !== 'cms' && (
          <CreativeID 
            isOpen={isAuthOpen} 
            onClose={() => {
              setIsAuthOpen(false);
              setSsoRedirect(null);
            }}
            onSuccess={() => {
              setIsAuthOpen(false);
              setSsoRedirect(null);
              setCurrentView('cms');
            }}
            ssoRedirect={ssoRedirect}
          />
        )}
        
        {/* Only show main navbar if not in CMS mode */}
        {currentView !== 'cms' && (
          <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
            <div className="bg-white/90 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-full px-2 py-2 flex items-center gap-1 scale-90 md:scale-100 transition-transform">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => navigateTo(item.view)}
                    className={`
                      px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap
                      ${currentView === item.view 
                        ? 'bg-black text-white shadow-md' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-black'}
                    `}
                  >
                    {item.label}
                  </button>
                ))}
            </div>
            <button 
              onClick={async () => {
                if (isAuthenticated) {
                  const result = await generateSSOToken('/admin');
                  if (result) {
                    window.location.href = result.ssoUrl;
                  } else {
                    setCurrentView('cms');
                  }
                } else {
                  setSsoRedirect('cms');
                  setIsAuthOpen(true);
                }
              }}
              className="bg-black text-white px-6 py-3 rounded-full font-bold shadow-xl hover:scale-105 transition-transform hidden md:block"
            >
              {isAuthenticated ? (user?.displayName || 'CMS') : 'CreativeID'}
            </button>
          </nav>
        )}

        <div> 
        <AnimatePresence mode='wait'>
          {currentView === 'home' && (
            <motion.main
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero onNavigate={navigateTo} />
              <Ecosystem onNavigate={navigateTo} />
              <Partners />
              <Footer onNavigate={navigateTo} onOpenAuth={() => { setSsoRedirect('cms'); setIsAuthOpen(true); }} />
            </motion.main>
          )}

          {currentView === 'about' && (
            <motion.div key="about" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
               <AboutSection onNavigate={navigateTo} />
               <Footer onNavigate={navigateTo} onOpenAuth={() => { setSsoRedirect('cms'); setIsAuthOpen(true); }} />
            </motion.div>
          )}

          {currentView === 'contact' && (
            <motion.div key="contact" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              <Contact />
              <Footer onNavigate={navigateTo} onOpenAuth={() => { setSsoRedirect('cms'); setIsAuthOpen(true); }} />
            </motion.div>
          )}

          {currentView === 'technologies' && (
            <motion.div key="technologies" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              <TechnologiesPage onNavigate={navigateTo} />
              <Footer onNavigate={navigateTo} onOpenAuth={() => { setSsoRedirect('cms'); setIsAuthOpen(true); }} />
            </motion.div>
          )}

          {currentView === 'career' && (
            <motion.div key="career" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              <CareerPage onNavigate={navigateTo} />
              <Footer onNavigate={navigateTo} onOpenAuth={() => { setSsoRedirect('cms'); setIsAuthOpen(true); }} />
            </motion.div>
          )}

          {currentView === 'research' && (
              <motion.div key="research" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                  <ResearchPage onNavigate={navigateTo} />
                  <Footer onNavigate={navigateTo} onOpenAuth={() => { setSsoRedirect('cms'); setIsAuthOpen(true); }} />
              </motion.div>
          )}

          {currentView === 'investors' && (
              <motion.div key="investors" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                  <InvestorRelationsPage onNavigate={navigateTo} />
                  <Footer onNavigate={navigateTo} onOpenAuth={() => { setSsoRedirect('cms'); setIsAuthOpen(true); }} />
              </motion.div>
          )}
          
          {currentView === 'privacy' && (
              <motion.div key="privacy" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                  <PrivacyPolicy onBack={() => navigateTo('home')} />
                  <Footer onNavigate={navigateTo} onOpenAuth={() => { setSsoRedirect('cms'); setIsAuthOpen(true); }} />
              </motion.div>
          )}

          {currentView === 'terms' && (
              <motion.div key="terms" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                  <TermsOfUse onBack={() => navigateTo('home')} />
                  <Footer onNavigate={navigateTo} onOpenAuth={() => { setSsoRedirect('cms'); setIsAuthOpen(true); }} />
              </motion.div>
          )}

          {currentView === 'status' && (
              <motion.div key="status" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                  <StatusPage />
                  <Footer onNavigate={navigateTo} onOpenAuth={() => { setSsoRedirect('cms'); setIsAuthOpen(true); }} />
              </motion.div>
          )}
          
          {currentView === 'cms' && (
              <motion.div key="cms" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="min-h-screen flex items-center justify-center">
                  <div className="text-center p-8">
                    <h2 className="text-2xl font-bold mb-4">CreativeCMS</h2>
                    <p className="text-gray-600 mb-6">Система управления контентом открывается в отдельном окне</p>
                    <a 
                      href="/admin" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
                    >
                      Открыть CreativeCMS
                    </a>
                    <button 
                      onClick={() => navigateTo('home')}
                      className="block mx-auto mt-4 text-gray-500 hover:text-black transition-colors"
                    >
                      Вернуться на главную
                    </button>
                  </div>
              </motion.div>
          )}

          {/* Article Detail View */}
          {currentView === 'article' && selectedArticleId && (
              <motion.div key="article" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                  <ArticleDetail 
                    article={getArticleData(selectedArticleId)!}
                    onBack={() => navigateTo('research')}
                    onNavigate={navigateTo}
                  />
                  <Footer onNavigate={navigateTo} onOpenAuth={() => { setSsoRedirect('cms'); setIsAuthOpen(true); }} />
              </motion.div>
          )}

          {/* Division Routes including new companies */}
          {(['studio', 'tech', 'media', 'gaming', 'yoursite', 'logiflex', 'jobhunt', 'nexium'].includes(currentView)) && (
            <motion.div key="detail" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              <DivisionDetail 
                division={getDivisionData(currentView)!}
                onBack={getBackProps().action}
                backLabel={getBackProps().label}
                onContact={() => navigateTo('contact')}
              />
               <Footer onNavigate={navigateTo} onOpenAuth={() => { setSsoRedirect('cms'); setIsAuthOpen(true); }} />
            </motion.div>
          )}
        </AnimatePresence>
        </div>

        {currentView !== 'cms' && <ChatWidget />}
      </div>
  );
};

export default App;

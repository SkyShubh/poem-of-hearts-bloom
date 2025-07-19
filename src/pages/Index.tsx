import { useState } from 'react';
import { PoemEditor } from '@/components/PoemEditor';
import { WordExplorer } from '@/components/WordExplorer';
import { MoodPrompts } from '@/components/MoodPrompts';
import { Heart, Feather, Sparkles } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'write' | 'explore' | 'inspire'>('write');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-soft/30 to-accent-glow/40">
      {/* Header */}
      <header className="romantic-card m-6 mb-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="text-romantic animate-pulse" size={32} />
            <h1 className="font-dancing text-4xl md:text-5xl text-gradient font-semibold">
              Romance in Verse
            </h1>
            <Feather className="text-primary animate-float" size={28} />
          </div>
          <p className="font-playfair text-lg text-muted-foreground italic max-w-2xl">
            "Poetry is the language of love, dreams, and the heart's whispered secrets. 
            Let your soul dance with words in this enchanted space of creation."
          </p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="max-w-4xl mx-auto px-6 mb-8">
        <div className="romantic-card p-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setActiveTab('write')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'write'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'hover:bg-primary-soft text-foreground'
              }`}
            >
              <Feather size={18} />
              <span className="font-poppins">Writing Zone</span>
            </button>
            
            <button
              onClick={() => setActiveTab('explore')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'explore'
                  ? 'bg-secondary text-secondary-foreground shadow-lg'
                  : 'hover:bg-secondary-glow text-foreground'
              }`}
            >
              <Sparkles size={18} />
              <span className="font-poppins">Word Explorer</span>
            </button>
            
            <button
              onClick={() => setActiveTab('inspire')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'inspire'
                  ? 'bg-accent text-accent-foreground shadow-lg'
                  : 'hover:bg-accent-glow text-foreground'
              }`}
            >
              <Heart size={18} />
              <span className="font-poppins">Inspiration Zone</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 pb-12">
        <div className="animate-fade-in">
          {activeTab === 'write' && <PoemEditor />}
          {activeTab === 'explore' && <WordExplorer />}
          {activeTab === 'inspire' && <MoodPrompts />}
        </div>
      </main>

      {/* Floating Hearts Animation */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <Heart className="absolute top-1/4 left-1/4 text-primary-glow/30 animate-float" size={16} style={{ animationDelay: '0s' }} />
        <Heart className="absolute top-1/3 right-1/4 text-romantic-glow/30 animate-float" size={12} style={{ animationDelay: '2s' }} />
        <Heart className="absolute bottom-1/3 left-1/3 text-accent-glow/30 animate-float" size={14} style={{ animationDelay: '4s' }} />
        <Sparkles className="absolute top-1/2 right-1/3 text-secondary-glow/30 animate-float" size={18} style={{ animationDelay: '1s' }} />
        <Sparkles className="absolute bottom-1/4 right-1/5 text-primary-glow/30 animate-float" size={16} style={{ animationDelay: '3s' }} />
      </div>
    </div>
  );
};

export default Index;

import { useState } from 'react';
import { Search, BookOpen, Heart, Sparkles, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WordData {
  synonyms: string[];
  antonyms: string[];
  rhymes: string[];
  poetic: string[];
}

export const WordExplorer = () => {
  const [searchWord, setSearchWord] = useState('');
  const [wordData, setWordData] = useState<WordData | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const exploreWord = async () => {
    if (!searchWord.trim()) {
      toast({
        title: "💕 Enter a word to explore",
        description: "Type any word to discover its synonyms, antonyms, and rhymes!",
        duration: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      // Using Datamuse API for word associations
      const [synonymsRes, rhymesRes] = await Promise.all([
        fetch(`https://api.datamuse.com/words?ml=${encodeURIComponent(searchWord)}&max=10`),
        fetch(`https://api.datamuse.com/words?rel_rhy=${encodeURIComponent(searchWord)}&max=15`)
      ]);

      const synonymsData = await synonymsRes.json();
      const rhymesData = await rhymesRes.json();

      // Get antonyms (related words with opposite meaning)
      const antonymsRes = await fetch(`https://api.datamuse.com/words?rel_ant=${encodeURIComponent(searchWord)}&max=8`);
      const antonymsData = await antonymsRes.json();

      // Create poetic alternatives based on romantic/emotional words
      const poeticAlternatives = generatePoeticAlternatives(searchWord.toLowerCase());

      setWordData({
        synonyms: synonymsData.slice(0, 5).map((item: any) => item.word),
        antonyms: antonymsData.map((item: any) => item.word),
        rhymes: rhymesData.map((item: any) => item.word),
        poetic: poeticAlternatives
      });

      toast({
        title: "✨ Word exploration complete!",
        description: `Found beautiful alternatives for "${searchWord}"`,
        duration: 3000,
      });

    } catch (error) {
      toast({
        title: "💔 Oops, something went wrong",
        description: "Unable to fetch word data. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const generatePoeticAlternatives = (word: string): string[] => {
    const poeticMap: Record<string, string[]> = {
      'love': ['adoration', 'devotion', 'affection', 'passion', 'tenderness'],
      'beautiful': ['radiant', 'luminous', 'ethereal', 'sublime', 'enchanting'],
      'heart': ['soul', 'spirit', 'essence', 'core', 'being'],
      'eyes': ['orbs', 'windows to the soul', 'gaze', 'vision', 'sight'],
      'smile': ['beam', 'grin', 'radiance', 'glow', 'warmth'],
      'kiss': ['caress', 'embrace', 'touch', 'whisper', 'blessing'],
      'night': ['twilight', 'dusk', 'darkness', 'starlight', 'moonbeams'],
      'day': ['dawn', 'morning', 'sunlight', 'brightness', 'daybreak'],
      'dream': ['vision', 'fantasy', 'reverie', 'slumber', 'wish'],
      'time': ['moment', 'eternity', 'forever', 'instant', 'infinity'],
      'sad': ['melancholy', 'sorrowful', 'wistful', 'forlorn', 'blue'],
      'happy': ['joyful', 'blissful', 'elated', 'euphoric', 'gleeful'],
      'touch': ['caress', 'stroke', 'graze', 'brush', 'whisper'],
      'voice': ['melody', 'song', 'whisper', 'murmur', 'harmony'],
      'moon': ['lunar light', 'celestial orb', 'night\'s companion', 'silver goddess'],
      'sun': ['golden orb', 'day\'s herald', 'radiant star', 'light bringer'],
      'flower': ['blossom', 'bloom', 'petal', 'bloom', 'bud'],
      'rose': ['crimson beauty', 'thorned love', 'passion\'s symbol', 'garden\'s jewel']
    };

    return poeticMap[word] || ['enchanting', 'sublime', 'ethereal'];
  };

  const insertWordIntoPoem = (word: string) => {
    // This would typically integrate with the poem editor
    navigator.clipboard.writeText(word);
    toast({
      title: "📋 Word copied!",
      description: `"${word}" has been copied to your clipboard`,
      duration: 2000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <div className="romantic-card">
        <div className="text-center mb-6">
          <h2 className="font-dancing text-3xl text-gradient mb-2">Word Explorer</h2>
          <p className="font-playfair text-muted-foreground italic">
            Discover the perfect words to paint your emotions with language
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && exploreWord()}
              placeholder="Enter a word to explore... (e.g., love, beautiful, dream)"
              className="romantic-input w-full text-lg"
            />
          </div>
          <button
            onClick={exploreWord}
            disabled={loading}
            className="romantic-button flex items-center gap-2 whitespace-nowrap"
          >
            <Search size={18} />
            <span>{loading ? 'Exploring...' : 'Explore'}</span>
          </button>
        </div>
      </div>

      {/* Results */}
      {wordData && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Synonyms */}
          <div className="romantic-card">
            <h3 className="font-playfair text-xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="text-primary" size={20} />
              Synonyms
              <span className="text-sm font-normal text-muted-foreground">
                (words with similar meaning)
              </span>
            </h3>
            <div className="space-y-2">
              {wordData.synonyms.length > 0 ? (
                wordData.synonyms.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => insertWordIntoPoem(word)}
                    className="block w-full text-left p-3 rounded-lg bg-primary-soft/30 hover:bg-primary-soft/50 transition-colors border border-primary/20"
                  >
                    <span className="font-medium">{word}</span>
                    <div className="text-xs text-muted-foreground mt-1">
                      Click to copy to clipboard
                    </div>
                  </button>
                ))
              ) : (
                <p className="text-muted-foreground italic">No synonyms found</p>
              )}
            </div>
          </div>

          {/* Antonyms */}
          <div className="romantic-card">
            <h3 className="font-playfair text-xl font-semibold mb-4 flex items-center gap-2">
              <Volume2 className="text-secondary" size={20} />
              Antonyms
              <span className="text-sm font-normal text-muted-foreground">
                (words with opposite meaning)
              </span>
            </h3>
            <div className="space-y-2">
              {wordData.antonyms.length > 0 ? (
                wordData.antonyms.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => insertWordIntoPoem(word)}
                    className="block w-full text-left p-3 rounded-lg bg-secondary-glow/30 hover:bg-secondary-glow/50 transition-colors border border-secondary/20"
                  >
                    <span className="font-medium">{word}</span>
                    <div className="text-xs text-muted-foreground mt-1">
                      Click to copy to clipboard
                    </div>
                  </button>
                ))
              ) : (
                <p className="text-muted-foreground italic">No antonyms found</p>
              )}
            </div>
          </div>

          {/* Poetic Alternatives */}
          <div className="romantic-card">
            <h3 className="font-playfair text-xl font-semibold mb-4 flex items-center gap-2">
              <Heart className="text-romantic" size={20} />
              Poetic Alternatives
              <span className="text-sm font-normal text-muted-foreground">
                (romantic & metaphorical)
              </span>
            </h3>
            <div className="space-y-2">
              {wordData.poetic.map((word, index) => (
                <button
                  key={index}
                  onClick={() => insertWordIntoPoem(word)}
                  className="block w-full text-left p-3 rounded-lg bg-romantic-glow/20 hover:bg-romantic-glow/30 transition-colors border border-romantic/20"
                >
                  <span className="font-medium">{word}</span>
                  <div className="text-xs text-muted-foreground mt-1">
                    Click to copy to clipboard
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Rhymes */}
          <div className="romantic-card">
            <h3 className="font-playfair text-xl font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="text-accent" size={20} />
              Rhyming Words
              <span className="text-sm font-normal text-muted-foreground">
                (perfect for poetry)
              </span>
            </h3>
            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
              {wordData.rhymes.length > 0 ? (
                wordData.rhymes.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => insertWordIntoPoem(word)}
                    className="p-2 rounded-lg bg-accent-glow/20 hover:bg-accent-glow/30 transition-colors border border-accent/20 text-sm"
                  >
                    {word}
                  </button>
                ))
              ) : (
                <p className="text-muted-foreground italic col-span-2">No rhymes found</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Word Explorer Tips */}
      <div className="romantic-card bg-gradient-to-r from-secondary-glow/20 to-accent-glow/20">
        <h3 className="font-playfair text-lg font-semibold mb-3 flex items-center gap-2">
          <Sparkles className="text-accent" size={20} />
          Word Explorer Tips
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-foreground/80">
          <div>
            <p className="font-medium mb-1">🔍 Try different words</p>
            <p>Explore emotions like "longing," "bliss," or "sorrow"</p>
          </div>
          <div>
            <p className="font-medium mb-1">💭 Use poetic alternatives</p>
            <p>Replace common words with more evocative alternatives</p>
          </div>
          <div>
            <p className="font-medium mb-1">🎵 Find perfect rhymes</p>
            <p>Use rhyming words to create musical flow in your poetry</p>
          </div>
          <div>
            <p className="font-medium mb-1">📝 Build your vocabulary</p>
            <p>Discover new words to express complex emotions</p>
          </div>
        </div>
      </div>
    </div>
  );
};
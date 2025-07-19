import { useState, useRef, useEffect } from 'react';
import { Download, Save, Heart, Wand2, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const PoemEditor = () => {
  const [poem, setPoem] = useState('');
  const [title, setTitle] = useState('');
  const [misspelledWords, setMisspelledWords] = useState<Set<string>>(new Set());
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  // Simple spell check function using a basic dictionary
  const spellCheck = (text: string) => {
    const commonWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
      'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
      'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
      'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can',
      'love', 'heart', 'soul', 'dream', 'kiss', 'rose', 'flower', 'beauty', 'sweet',
      'tender', 'gentle', 'soft', 'warm', 'light', 'bright', 'shine', 'glow', 'whisper',
      'touch', 'embrace', 'forever', 'always', 'never', 'every', 'all', 'some', 'any',
      'time', 'day', 'night', 'morning', 'evening', 'moment', 'hour', 'year', 'life',
      'eyes', 'smile', 'face', 'hand', 'lips', 'hair', 'voice', 'laugh', 'tear', 'joy'
    ]);

    const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
    const errors = new Set<string>();
    
    words.forEach(word => {
      if (word.length > 2 && !commonWords.has(word)) {
        errors.add(word);
      }
    });
    
    setMisspelledWords(errors);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (poem) {
        spellCheck(poem);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [poem]);

  const handleSave = () => {
    if (!title.trim() || !poem.trim()) {
      toast({
        title: "💕 Sweet reminder",
        description: "Please add both a title and some beautiful verses to save your poem.",
        duration: 3000,
      });
      return;
    }

    const savedPoems = JSON.parse(localStorage.getItem('savedPoems') || '[]');
    const newPoem = {
      id: Date.now(),
      title: title.trim(),
      content: poem.trim(),
      createdAt: new Date().toISOString(),
    };
    
    savedPoems.push(newPoem);
    localStorage.setItem('savedPoems', JSON.stringify(savedPoems));
    
    toast({
      title: "✨ Poem saved!",
      description: `"${title}" has been lovingly preserved in your collection.`,
      duration: 3000,
    });
  };

  const handleExport = (format: 'txt' | 'pdf') => {
    if (!title.trim() || !poem.trim()) {
      toast({
        title: "💕 Nothing to export yet",
        description: "Write something beautiful first, then I'll help you save it.",
        duration: 3000,
      });
      return;
    }

    const content = `${title}\n\n${poem}\n\n— Written with Romance in Verse`;
    
    if (format === 'txt') {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }

    toast({
      title: "📄 Download ready!",
      description: `Your poem "${title}" is being downloaded.`,
      duration: 3000,
    });
  };

  const makeItRhyme = () => {
    // Simple rhyme suggestion system
    toast({
      title: "🎭 Rhyme magic coming soon!",
      description: "AI-powered rhyme suggestions will be available in the next update.",
      duration: 3000,
    });
  };

  const highlightText = (text: string) => {
    if (misspelledWords.size === 0) return text;
    
    const words = text.split(/(\b[a-z]+\b)/gi);
    return words.map((word, index) => {
      const isError = misspelledWords.has(word.toLowerCase());
      return (
        <span
          key={index}
          className={isError ? 'spell-error' : ''}
          title={isError ? `"${word}" might be misspelled` : ''}
        >
          {word}
        </span>
      );
    });
  };

  return (
    <div className="space-y-6">
      {/* Title Input */}
      <div className="romantic-card">
        <label className="block font-playfair text-lg font-medium text-foreground mb-3">
          ✨ Give your poem a beautiful title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="A title as lovely as your words..."
          className="romantic-input w-full font-playfair text-xl"
        />
      </div>

      {/* Poem Editor */}
      <div className="romantic-card">
        <div className="flex justify-between items-center mb-4">
          <label className="font-playfair text-lg font-medium text-foreground">
            💕 Your poetic sanctuary
          </label>
          <div className="flex gap-2">
            <button
              onClick={makeItRhyme}
              className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent-glow transition-colors"
            >
              <Wand2 size={16} />
              <span className="text-sm font-medium">Make it Rhyme</span>
            </button>
          </div>
        </div>
        
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={poem}
            onChange={(e) => setPoem(e.target.value)}
            placeholder="Let your heart speak through verse...

Write about the way sunlight dances in their eyes,
How their laughter sounds like wind chimes in spring,
Or perhaps the quiet moments that make love feel infinite..."
            className="romantic-input w-full h-80 font-poppins text-base leading-relaxed resize-none"
            style={{ fontFamily: '"Poppins", sans-serif' }}
          />
          
          {/* Spell check overlay */}
          {misspelledWords.size > 0 && (
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none p-4 whitespace-pre-wrap font-poppins text-base leading-relaxed text-transparent">
              {highlightText(poem)}
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
          <span>Words: {poem.trim().split(/\s+/).filter(w => w).length}</span>
          <span>Lines: {poem.split('\n').length}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="romantic-card">
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={handleSave}
            className="romantic-button flex items-center gap-2"
          >
            <Save size={18} />
            <span>Save to Collection</span>
          </button>
          
          <button
            onClick={() => handleExport('txt')}
            className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary-glow transition-colors"
          >
            <Download size={18} />
            <span>Export as Text</span>
          </button>
          
          <button
            onClick={() => handleExport('pdf')}
            className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-xl font-medium hover:bg-accent-glow transition-colors"
          >
            <FileText size={18} />
            <span>Export as PDF</span>
          </button>
        </div>
      </div>

      {/* Writing Tips */}
      <div className="romantic-card bg-gradient-to-r from-primary-soft/30 to-accent-glow/30">
        <h3 className="font-playfair text-lg font-semibold mb-3 flex items-center gap-2">
          <Heart className="text-romantic" size={20} />
          Writing Tips for Beautiful Poetry
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-foreground/80">
          <div>
            <p className="font-medium mb-1">🌹 Use all your senses</p>
            <p>Describe what you see, hear, feel, smell, and taste</p>
          </div>
          <div>
            <p className="font-medium mb-1">💫 Show, don't tell</p>
            <p>Instead of "I was sad," write "Tears traced silver paths down my cheeks"</p>
          </div>
          <div>
            <p className="font-medium mb-1">🎭 Use metaphors</p>
            <p>Compare emotions to nature, weather, or everyday objects</p>
          </div>
          <div>
            <p className="font-medium mb-1">🎵 Find your rhythm</p>
            <p>Read your poem aloud to hear its natural music</p>
          </div>
        </div>
      </div>
    </div>
  );
};
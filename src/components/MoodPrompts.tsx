import { useState } from 'react';
import { Heart, Moon, Sun, Zap, Smile, Frown, Mountain, Star, Cloud, Clock } from 'lucide-react';

interface Mood {
  name: string;
  icon: React.ReactNode;
  color: string;
  prompts: string[];
}

const moods: Mood[] = [
  {
    name: 'Romantic',
    icon: <Heart size={24} />,
    color: 'mood-romantic',
    prompts: [
      "Write a poem about the first time your fingers touched theirs.",
      "Compare your lover's smile to the dawn of spring.",
      "If love had a scent, what would it smell like?",
      "Describe the moment you knew you were falling in love.",
      "Write about a kiss that felt like coming home.",
      "Compare your beloved's voice to something in nature.",
      "Write about dancing together in an empty room.",
      "Describe how they look when they're sleeping peacefully.",
      "Write about a love letter that was never sent.",
      "Compare your relationship to the phases of the moon."
    ]
  },
  {
    name: 'Sad',
    icon: <Cloud size={24} />,
    color: 'mood-sad',
    prompts: [
      "Write about the empty space left behind by someone who's gone.",
      "Describe rain as a metaphor for your tears.",
      "Write about a memory that used to bring joy but now brings pain.",
      "Compare heartbreak to a withering flower.",
      "Write about the silence that fills a house after goodbye.",
      "Describe the weight of unspoken words.",
      "Write about watching someone you love walk away.",
      "Compare loneliness to an ocean at midnight.",
      "Write about finding a photo of happier times.",
      "Describe the moment when hope begins to fade."
    ]
  },
  {
    name: 'Happy',
    icon: <Sun size={24} />,
    color: 'mood-happy',
    prompts: [
      "Write about the feeling of sunshine on your face after a long winter.",
      "Describe laughter that bubbles up from deep within your soul.",
      "Write about a moment when everything felt perfectly right.",
      "Compare your joy to a butterfly emerging from its cocoon.",
      "Write about the magic of unexpected good news.",
      "Describe the warmth of being surrounded by loved ones.",
      "Write about a dream that came true against all odds.",
      "Compare happiness to the first flowers of spring.",
      "Write about a memory that never fails to make you smile.",
      "Describe the feeling of accomplishing something you thought impossible."
    ]
  },
  {
    name: 'Energetic',
    icon: <Zap size={24} />,
    color: 'mood-energetic',
    prompts: [
      "Write about the electricity that runs through your veins when you're alive.",
      "Describe the feeling of running toward your dreams.",
      "Write about the power of music to move your soul.",
      "Compare your energy to a lightning storm.",
      "Write about the rush of adrenaline during an adventure.",
      "Describe the feeling of dancing until dawn.",
      "Write about the moment when passion ignites within you.",
      "Compare your enthusiasm to wildfire spreading across a field.",
      "Write about the exhilaration of taking a leap of faith.",
      "Describe the energy of a crowd united in celebration."
    ]
  },
  {
    name: 'Hopeful',
    icon: <Star size={24} />,
    color: 'mood-hopeful',
    prompts: [
      "Write about the first star visible in the twilight sky.",
      "Describe hope as a seed planted in winter soil.",
      "Write about believing in tomorrow when today feels impossible.",
      "Compare hope to a lighthouse in a storm.",
      "Write about the courage to begin again.",
      "Describe the moment when you see light at the end of the tunnel.",
      "Write about planting a garden for the future.",
      "Compare optimism to the sun rising after the darkest night.",
      "Write about finding strength you didn't know you had.",
      "Describe the feeling of doors opening when you least expect it."
    ]
  },
  {
    name: 'Apologetic',
    icon: <Frown size={24} />,
    color: 'mood-apologetic',
    prompts: [
      "Write about words you wish you could take back.",
      "Describe the weight of regret on your shoulders.",
      "Write about the courage it takes to say 'I'm sorry.'",
      "Compare guilt to shadows that follow you everywhere.",
      "Write about the hope for forgiveness and redemption.",
      "Describe the moment when pride gets in the way of love.",
      "Write about learning from your mistakes.",
      "Compare apology to rain washing away the dust.",
      "Write about the vulnerability of admitting you were wrong.",
      "Describe the healing power of genuine remorse."
    ]
  },
  {
    name: 'Rebellious',
    icon: <Mountain size={24} />,
    color: 'mood-rebellious',
    prompts: [
      "Write about breaking free from others' expectations.",
      "Describe the fire that burns within a revolutionary spirit.",
      "Write about choosing your own path despite opposition.",
      "Compare rebellion to a river carving its own course.",
      "Write about the strength to stand alone for what's right.",
      "Describe the moment you decided to be authentically yourself.",
      "Write about challenging the status quo with quiet determination.",
      "Compare defiance to a wildflower growing through concrete.",
      "Write about the courage to speak truth to power.",
      "Describe the freedom that comes from releasing others' approval."
    ]
  },
  {
    name: 'Ambitious',
    icon: <Mountain size={24} />,
    color: 'mood-ambitious',
    prompts: [
      "Write about the summit you're determined to reach.",
      "Describe the hunger for something greater than yourself.",
      "Write about the vision that drives you forward each day.",
      "Compare ambition to an eagle soaring toward the sun.",
      "Write about the price you're willing to pay for your dreams.",
      "Describe the moment when you decided to bet on yourself.",
      "Write about climbing higher when others said it was impossible.",
      "Compare determination to a river that carves through mountains.",
      "Write about the fire that keeps you going when others quit.",
      "Describe the view from the top of your personal mountain."
    ]
  },
  {
    name: 'Lonely',
    icon: <Moon size={24} />,
    color: 'mood-lonely',
    prompts: [
      "Write about being alone in a crowded room.",
      "Describe the echo of your footsteps in an empty hallway.",
      "Write about the silence that speaks louder than words.",
      "Compare loneliness to an island surrounded by endless ocean.",
      "Write about missing someone who's still right beside you.",
      "Describe the comfort found in solitude versus the pain of isolation.",
      "Write about the moon as your only companion.",
      "Compare solitude to a book with pages only you can read.",
      "Write about the conversations you have with yourself.",
      "Describe the beauty and sorrow of walking alone at midnight."
    ]
  },
  {
    name: 'Nostalgic',
    icon: <Clock size={24} />,
    color: 'mood-nostalgic',
    prompts: [
      "Write about a photograph that holds a thousand memories.",
      "Describe the scent that instantly transports you to childhood.",
      "Write about a song that brings back a specific moment in time.",
      "Compare memory to waves washing over the shore of your mind.",
      "Write about a place that exists now only in your heart.",
      "Describe the bittersweet taste of remembering what once was.",
      "Write about finding an old letter in a forgotten drawer.",
      "Compare nostalgia to golden light filtering through autumn leaves.",
      "Write about the person you used to be and who you've become.",
      "Describe the feeling of visiting your childhood home years later."
    ]
  }
];

export const MoodPrompts = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    // Could add a toast notification here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="romantic-card text-center">
        <h2 className="font-dancing text-3xl text-gradient mb-2">Inspiration Zone</h2>
        <p className="font-playfair text-muted-foreground italic max-w-2xl mx-auto">
          "Every emotion holds the seed of a poem. Choose your mood and let inspiration guide your pen through the landscape of human experience."
        </p>
      </div>

      {/* Mood Selection */}
      <div className="romantic-card">
        <h3 className="font-playfair text-xl font-semibold mb-4 text-center">
          How does your heart feel today?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {moods.map((mood) => (
            <button
              key={mood.name}
              onClick={() => setSelectedMood(mood)}
              className={`
                p-6 rounded-2xl border-2 transition-all duration-300 ${mood.color}
                ${selectedMood?.name === mood.name 
                  ? 'border-foreground shadow-lg scale-105' 
                  : 'border-transparent hover:border-foreground/30 hover:scale-102'
                }
              `}
            >
              <div className="flex flex-col items-center gap-3">
                <div className="text-foreground/80">
                  {mood.icon}
                </div>
                <span className="font-playfair font-medium text-foreground">
                  {mood.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Mood Prompts */}
      {selectedMood && (
        <div className="romantic-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-primary">
              {selectedMood.icon}
            </div>
            <h3 className="font-playfair text-2xl font-semibold">
              {selectedMood.name} Poetry Prompts
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {selectedMood.prompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => copyPrompt(prompt)}
                className="text-left p-4 rounded-xl bg-gradient-to-r from-primary-soft/20 to-accent-glow/20 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                    <span className="text-xs font-bold text-primary">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-poppins text-foreground leading-relaxed">
                      {prompt}
                    </p>
                    <div className="text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to copy prompt
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Writing Exercise */}
      <div className="romantic-card bg-gradient-to-r from-romantic-glow/20 to-primary-glow/20">
        <h3 className="font-playfair text-lg font-semibold mb-3 flex items-center gap-2">
          <Heart className="text-romantic" size={20} />
          Daily Writing Exercise
        </h3>
        <div className="space-y-4 text-sm text-foreground/80">
          <div>
            <p className="font-medium mb-2">🌅 Morning Pages</p>
            <p>Start each day by writing three pages of stream-of-consciousness thoughts. Don't edit, just write whatever comes to mind.</p>
          </div>
          <div>
            <p className="font-medium mb-2">🎭 Emotion Mapping</p>
            <p>Choose one emotion you felt today and explore it through different senses. What does anger taste like? What color is joy?</p>
          </div>
          <div>
            <p className="font-medium mb-2">🖼️ Image Poetry</p>
            <p>Find a photograph that moves you and write a poem from the perspective of someone or something in the image.</p>
          </div>
          <div>
            <p className="font-medium mb-2">💌 Letter Poems</p>
            <p>Write a poem in the form of a letter to your past self, future self, or someone you've never met but always imagined.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
# 🥺✨ Magic Kawaii Todo

A kawaii-themed todo app that magically breaks down tasks with "pien" levels! Inspired by Goblin Tools for learning purposes.

## ✨ Features

- 🪄 **Magic Breakdown**: One-line tasks → Auto-decomposed steps
- 🥺 **Pien Level**: Adjustable complexity (0-4) for task granularity  
- 💖 **Kawaii UI**: Cute design with Kansai-ben (関西弁) copy
- 📱 **Local Storage**: Offline-first with IndexedDB
- 🎯 **Drag & Drop**: Reorder subtasks easily

## 🚀 Tech Stack

- **Framework**: Next.js 14 + TypeScript
- **AI**: Mastra + Vercel AI SDK + Gemini
- **UI**: Tailwind CSS + Radix UI
- **Storage**: IndexedDB (via idb)
- **Drag & Drop**: @dnd-kit

## 🛠️ Development

### Prerequisites
- Node.js 18+
- Google Generative AI API key

### Setup

```bash
# Clone the repo
git clone https://github.com/MAA39/magic-kawaii-todo.git
cd magic-kawaii-todo

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your GOOGLE_GENERATIVE_AI_API_KEY

# Start development server
npm run dev
```

## 📋 Project Structure

```
src/
├── app/                 # Next.js App Router
├── components/
│   ├── ui/             # Reusable UI components
│   └── features/       # Feature-specific components
├── lib/
│   ├── mastra/         # Mastra agent & tools
│   └── storage/        # Local storage utilities
└── types/              # TypeScript definitions
```

## 🎯 Roadmap

### MVP (Phase 1)
- [x] Project setup
- [ ] Basic breakdown functionality
- [ ] Kawaii UI implementation
- [ ] Local storage

### Phase 2
- [ ] Web fetch integration
- [ ] Category auto-assignment
- [ ] Time estimation

### Phase 3
- [ ] Export functionality (JSON/Print/Todoist)
- [ ] Experimental sync
- [ ] PWA features

## 🤝 Contributing

This is a learning project inspired by [Goblin Tools](https://goblin.tools). 
Feel free to suggest improvements or report issues!

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- Inspired by [Goblin Tools](https://goblin.tools) by Skye Kensington
- Built for educational purposes to learn Mastra framework

---

Made with 💖 and 🥺 by はせっち (Haseshi)

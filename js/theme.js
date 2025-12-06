tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Core UI Colors - Light Mode (Primary)
                alabaster: '#F2F0E9',
                'isoline-white': '#FFFFFF',
                onyx: '#1A1A1A',
                pumice: '#595959',
                'international-orange': '#D94E36',

                // Core UI Colors - Dark Mode (Secondary)
                obsidian: '#141414',
                basalt: '#1F1F1F',
                ash: '#A1A1AA',
                clay: '#E66E58',

                // Data Visualization & Infographics Palette
                'slate-indigo': '#2E4057',    // Light: Primary Data
                'slate-indigo-dark': '#8DA3BF', // Dark: Primary Data
                'sage-green': '#5F7363',      // Light: Comparison A
                'sage-green-dark': '#9CAD9F',   // Dark: Comparison A
                'ochre-gold': '#C79F36',      // Light: Comparison B
                'ochre-gold-dark': '#DBC074',   // Dark: Comparison B
                'burnt-sienna': '#B56149',    // Light: Comparison C
                'burnt-sienna-dark': '#D98A77', // Dark: Comparison C
                taupe: '#9E9B93',             // Light: Neutral Data
                'taupe-dark': '#73706A',        // Dark: Neutral Data
            },
            fontFamily: {
                sans: ['Inter', 'Manrope', 'Helvetica Neue', 'sans-serif'],
                serif: ['Playfair Display', 'Lora', 'serif'],
                mono: ['JetBrains Mono', 'monospace'],
            }
        }
    }
}

// Simple Theme Toggle Logic
function toggleTheme() {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Apply theme on load
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
} else {
    document.documentElement.classList.remove('dark')
}

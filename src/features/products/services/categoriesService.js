// Mock service for categories
// Will be replaced by actual API calls later

const initialCategories = [
    "Все",
    "Протеин",
    "Витамины",
    "Аминокислоты",
    "Гейнер",
    "Креатин"
];

// Simulate delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const categoriesService = {
    // Get all categories
    getAll: async () => {
        await delay(500);
        // In a real app, this would fetch from API
        // For now, returning mock data. 
        // Optimization: If we wanted persistence without API, we could use localStorage here.
        const stored = localStorage.getItem('fitness_categories');
        return stored ? JSON.parse(stored) : initialCategories;
    },

    // Create a new category
    create: async (categoryName) => {
        await delay(500);
        // Mock persistence
        const stored = localStorage.getItem('fitness_categories');
        const current = stored ? JSON.parse(stored) : initialCategories;

        if (!current.includes(categoryName)) {
            const updated = [...current, categoryName];
            localStorage.setItem('fitness_categories', JSON.stringify(updated));
            return { success: true, data: categoryName };
        }
        return { success: false, error: "Category already exists" };
    },

    // Future methods: delete, update
};

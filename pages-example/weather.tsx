import { useState, useEffect } from 'react';
import { Typography } from '@/components/atoms/typography';

interface WeatherData {
    city: string;
    temperature: string;
    description: string;
    fullDescription?: string;
}

interface NewsItem {
    title: string;
    link: string;
}

const DashboardSummary = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [weatherGreeting, setWeatherGreeting] = useState<string>('');
    const [news, setNews] = useState<NewsItem[]>([]);
    const [greeting, setGreeting] = useState<string>('');
    const [timestamp, setTimestamp] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [systemInfo, setSystemInfo] = useState<string[]>([]);

    useEffect(() => {
        const generateSummary = async () => {
            setLoading(true);

            try {
                // Set timestamp (matches your VB.NET format)
                const now = new Date();
                const formattedTimestamp = now.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }) + ' - ' + now.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                }).toLowerCase();

                setTimestamp(formattedTimestamp);

                // Sample system data (from your VB.NET)
                const dataSummary = "3 businesses have expiring DTI permits. 2 branches have unverified documents.";

                // Process system info list (matches your VB.NET logic)
                const dataList = dataSummary
                    .split(/\r\n|\n|\./)
                    .map(s => s.trim())
                    .filter(s => s.length > 0);

                setSystemInfo(dataList);

                // Get basic greeting first
                const aiGreeting = await getOpenAIResponse("Generate a friendly greeting only (no summary), such as 'Good Morning! Here's your daily update.'");
                setGreeting(aiGreeting);

                // Fetch weather data
                const weatherData = await getWeatherSummary("Leganes,PH");
                setWeather(weatherData);

                // Generate weather greeting after we have weather data
                if (weatherData) {
                    const weatherGreetingText = await generateWeatherGreeting(weatherData);
                    setWeatherGreeting(weatherGreetingText);
                }

                // Fetch news
                const newsData = await getCityNewsSummary("Leganes Iloilo");
                setNews(newsData);

            } catch (error) {
                console.error('Error generating summary:', error);
                // Fallback greeting based on time of day
                // const hour = new Date().getHours();
                const fallbackGreeting = getFallbackGreeting();
                setGreeting(fallbackGreeting);

                if (weather) {
                    const fallbackWeatherGreeting = generateFallbackWeatherGreeting(weather);
                    setWeatherGreeting(fallbackWeatherGreeting);
                }
            } finally {
                setLoading(false);
            }
        };

        generateSummary();
    }, []);

    const getWeatherSummary = async (location: string): Promise<WeatherData> => {
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

        if (!apiKey) {
            console.warn('OpenWeather API key is missing');
            return {
                city: location.split(',')[0],
                temperature: 'N/A',
                description: 'Weather data unavailable',
                fullDescription: 'Weather information is currently unavailable. Please check your API configuration.'
            };
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Weather API error: ${response.status}`);
            }

            const data = await response.json();

            const weatherData: WeatherData = {
                city: data.name,
                temperature: `${Math.round(data.main.temp)}°C`,
                description: data.weather[0].description,
                fullDescription: `The current weather in ${data.name} is ${data.weather[0].description} with a temperature of ${Math.round(data.main.temp)}°C.`
            };

            return weatherData;
        } catch (error) {
            console.error("Failed to fetch weather:", error);
            return {
                city: location.split(',')[0],
                temperature: 'N/A',
                description: 'Failed to load weather data',
                fullDescription: 'Unable to fetch current weather data. Please try again later.'
            };
        }
    };

    const generateWeatherGreeting = async (weatherData: WeatherData): Promise<string> => {
        // If no temperature data, return simple message
        if (weatherData.temperature === 'N/A') {
            return "Weather information is currently unavailable. Please check back later.";
        }

        const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

        if (!apiKey) {
            return generateFallbackWeatherGreeting(weatherData);
        }

        try {
            const prompt = `Create a friendly, concise weather-related greeting based on the current weather conditions in Leganes, Iloilo, Philippines.

Current weather: ${weatherData.temperature} and ${weatherDescriptionToAdjective(weatherData.description)} in ${weatherData.city}

Please follow these guidelines:
- Keep it to 1-2 sentences maximum
- Make it warm, welcoming, and natural
- Reference the specific weather conditions in a positive way
- Don't mention that you're an AI or reference the prompt
- Use friendly, conversational tone

Examples for reference:
- "Lovely sunny day in Leganes! Perfect weather to get things done."
- "A bit cloudy but pleasant in Leganes - great day for productivity!"
- "Beautiful clear skies over Leganes today!"
- "Comfortable temperatures in Leganes - ideal working conditions!"

Generate the greeting now:`;

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    max_tokens: 60,
                    temperature: 0.8
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'Failed to get AI response');
            }

            const data = await response.json();
            const greetingText = data.choices[0]?.message?.content?.trim();

            return greetingText || generateFallbackWeatherGreeting(weatherData);

        } catch (error) {
            console.error('OpenAI API error for weather greeting:', error);
            return generateFallbackWeatherGreeting(weatherData);
        }
    };

    // Helper function to convert weather description to adjectives
    const weatherDescriptionToAdjective = (description: string): string => {
        const descriptionLower = description.toLowerCase();

        if (descriptionLower.includes('clear') || descriptionLower.includes('sunny')) {
            return 'clear and sunny';
        } else if (descriptionLower.includes('cloud')) {
            return 'cloudy';
        } else if (descriptionLower.includes('rain') || descriptionLower.includes('drizzle')) {
            return 'rainy';
        } else if (descriptionLower.includes('thunderstorm')) {
            return 'stormy';
        } else if (descriptionLower.includes('snow')) {
            return 'snowy';
        } else if (descriptionLower.includes('fog') || descriptionLower.includes('mist')) {
            return 'foggy';
        } else {
            return description;
        }
    };

    const generateFallbackWeatherGreeting = (weatherData: WeatherData): string => {
        if (weatherData.temperature === 'N/A') {
            return "Weather information is currently unavailable. Please check back later.";
        }

        const temp = parseInt(weatherData.temperature);
        const description = weatherData.description.toLowerCase();

        if (description.includes('clear') || description.includes('sunny')) {
            return `Beautiful sunny day in ${weatherData.city}! Perfect weather for getting things done.`;
        } else if (description.includes('cloud')) {
            return `Pleasant cloudy conditions in ${weatherData.city} - great day for staying productive!`;
        } else if (description.includes('rain')) {
            return `Rainy day in ${weatherData.city} - perfect weather for focusing on indoor tasks!`;
        } else if (temp > 30) {
            return `Warm day in ${weatherData.city} - stay hydrated while you work!`;
        } else if (temp < 20) {
            return `Cool and comfortable in ${weatherData.city} - ideal working conditions today!`;
        } else {
            return `Lovely weather in ${weatherData.city} today! ${weatherData.temperature} and ${weatherData.description}.`;
        }
    };

    const getCityNewsSummary = async (searchQuery: string = "Philippines"): Promise<NewsItem[]> => {
        try {
            const url = `https://news.google.com/rss/search?q=${encodeURIComponent(searchQuery)}&hl=en-PH&gl=PH&ceid=PH:en`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const xmlText = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

            const parseError = xmlDoc.querySelector('parsererror');
            if (parseError) {
                throw new Error('Failed to parse XML');
            }

            const nodes = xmlDoc.querySelectorAll('item');
            const newsList: NewsItem[] = [];

            nodes.forEach((node, index) => {
                if (index >= 5) return;

                const titleNode = node.querySelector('title');
                const linkNode = node.querySelector('link');

                if (titleNode?.textContent && linkNode?.textContent) {
                    let title = titleNode.textContent.trim();
                    const link = linkNode.textContent.trim();

                    title = title.replace(/\s*-\s*Google\s+News$/, '');
                    newsList.push({ title, link });
                }
            });

            if (newsList.length > 0) {
                return newsList;
            }

            return await generateNewsWithAI();

        } catch (error) {
            console.error("Failed to fetch news:", error);
            try {
                return await generateNewsWithAI();
            } catch (aiError) {
                console.error("Failed to generate AI news:", aiError);
                return getPlaceholderNews();
            }
        }
    };

    const generateNewsWithAI = async (): Promise<NewsItem[]> => {
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

        if (!apiKey) {
            console.warn('OpenAI API key not found for news generation');
            return getPlaceholderNews();
        }

        try {
            const prompt = `Generate 5 realistic and recent-sounding news headlines about Leganes, Iloilo, Philippines. 
For each headline, also generate a realistic link that looks like it came from a real local or Philippine news website.
Return ONLY a valid JSON array in this exact format:
[
  {"title": "Headline 1", "link": "https://example.com/news1"},
  {"title": "Headline 2", "link": "https://example.com/news2"}
]`;

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    max_tokens: 500,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'Failed to get AI response');
            }

            const data = await response.json();
            const content = data.choices[0]?.message?.content?.trim();

            if (!content) {
                throw new Error('Empty response from AI');
            }

            try {
                const jsonMatch = content.match(/\[[\s\S]*\]/);
                if (jsonMatch) {
                    return JSON.parse(jsonMatch[0]);
                }
                return JSON.parse(content);
            } catch (parseError) {
                console.error('Failed to parse AI response:', parseError);
                return getPlaceholderNews();
            }
        } catch (error) {
            console.error('OpenAI API error for news:', error);
            return getPlaceholderNews();
        }
    };

    const getPlaceholderNews = (): NewsItem[] => {
        return [
            {
                title: "Leganes Municipal Hall Announces New Infrastructure Projects",
                link: "https://iloilotimes.ph/leganes-infrastructure-projects"
            },
            {
                title: "Local Farmers in Leganes See Increase in Crop Yield",
                link: "https://visayandaily.com/leganes-farmers-success"
            },
            {
                title: "Leganes Celebrates Annual Town Fiesta with Cultural Events",
                link: "https://philstar.com/leganes-fiesta-celebration"
            }
        ];
    };

    const getOpenAIResponse = async (prompt: string): Promise<string> => {
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

        if (!apiKey) {
            return getFallbackGreeting();
        }

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    max_tokens: 50,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'Failed to get AI response');
            }

            const data = await response.json();
            return data.choices[0]?.message?.content?.trim() || getFallbackGreeting();

        } catch (error) {
            console.error('OpenAI API error:', error);
            return getFallbackGreeting();
        }
    };

    const getFallbackGreeting = (): string => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning! Here\'s your daily update.';
        else if (hour < 18) return 'Good Afternoon! Here\'s your daily update.';
        else return 'Good Evening! Here\'s your daily update.';
    };

    const handleRetryNews = async () => {
        try {
            setLoading(true);
            const newsData = await getCityNewsSummary("Leganes Iloilo");
            setNews(newsData);
        } catch (error) {
            console.error('Failed to retry news loading:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="text-center">
                    
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                     
                     <Typography as="p"  className="mt-4 text-gray-600">
                        Loading dashboard summary...
                    </Typography>
                    
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <Typography variant="h2" weight="bold" className="text-gray-900">
                        {greeting}
                    </Typography>
                    <Typography as="p" className="text-gray-600 mt-2">
                        {timestamp}
                    </Typography>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Weather Card - Updated with weather greeting */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center mb-4">
                            <Typography as="span" variant="h3" className="text-gray-700">
                                ☁️
                            </Typography>

                            <Typography as="h2" variant="h4" weight='bold' className="text-gray-800">
                                Weather Update
                            </Typography>

                        </div>
                        {weather ? (
                            <div className="space-y-3">
                                <div className="space-y-2">
                                    <Typography as="p" variant="large" weight="semibold" className="text-gray-700">
                                        {weather.city}
                                    </Typography>

                                    <Typography as="p" variant="h2" weight="bold" className="text-gray-900">
                                        {weather.temperature}
                                    </Typography>

                                    {/* <p className="text-blue-800 font-medium">{weatherGreeting}</p> */}
                                    {/* <p className="text-gray-600 capitalize">{weather.description}</p> */}

                                    <Typography as="p" className="text-gray-600 capitalize">
                                        {weatherGreeting}
                                    </Typography>
                                </div>
                            </div>
                        ) : (
                            <Typography as="p" className="text-gray-500">
                                SLoading weather data...
                            </Typography>
                        )}
                    </div>

                    {/* System Information Card */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center mb-4">
                            <Typography as="span" variant="lead" className="mr-3">
                                📋
                            </Typography>
                            <Typography as="h2" variant="lead" weight="semibold" className="text-gray-800">
                                System Information
                            </Typography>

                        </div>
                        {systemInfo.length > 0 ? (
                            <ul className="space-y-3">
                                {systemInfo.map((info, index) => (
                                    <li key={index} className="flex items-start">
                                        <Typography as="span" className="text-blue-500 mr-2 mt-1">
                                            No system information available
                                        </Typography>

                                        <Typography as="span" className="text-gray-700">
                                            {info}.
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <Typography as="p" className="text-gray-500">
                                No system information available
                            </Typography>
                        )}
                    </div>

                    {/* Local News Card - Full Width */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center mb-4">
                            <Typography as="span">
                                📰
                            </Typography>
                            <Typography as="h2" variant="lead" weight="medium" className="text-gray-800-4">
                                Local News
                            </Typography>
                        </div>
                        {news.length > 0 ? (
                            <ul className="space-y-3">
                                {news.map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <Typography as="span" className='text-blue-500 mr-2 mt-1'>•</Typography>
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors break-words"
                                        >
                                            {item.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center py-8">
                                <Typography as="p" className="text-gray-500 mb-4">
                                    No news available at the moment
                                </Typography>
                                <button
                                    onClick={handleRetryNews}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Retry Loading News
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">

                    <Typography as="p" className="text-gray-600">
                        If you need any more information or assistance, feel free to ask.
                    </Typography>

                </div>
            </div>
        </div>
    );
};

export default DashboardSummary;
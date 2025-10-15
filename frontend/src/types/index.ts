export interface WeatherData {
  city: string;
  temperature: string;
  description: string;
  fullDescription?: string;
}

export interface NewsItem {
  title: string;
  link: string;
}

export interface OpenAIConfig {
  model?: string;
  max_tokens?: number;
  temperature?: number;
}
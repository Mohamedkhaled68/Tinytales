export interface Slider {
    id: number;
    sale: string | null;
    title: string;
    description: string;
}

export interface Category {
    id: number;
    name: string;
    image: string;
}

export interface CustomerFeedback {
    id: number;
    rating: number;
    name: string;
    subtitle: string;
    description: string;
    image: string;
}

export interface FAQ {
    id: number;
    question: string;
    answer: string;
}

export interface Communications {
    communication_facebook: string;
    communication_twitter: string;
    communication_telegram: string;
    communication_instagram: string;
    communication_whatsapp: string;
    communication_linkedin: string;
}

export interface HomeData {
    sliders: Slider[];
    categories: Category[];
    customer_feedback: CustomerFeedback[];
    faqs: FAQ[];
    products: Product[];
    communications: Communications;
}

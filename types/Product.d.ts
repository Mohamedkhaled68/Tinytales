type Category = {
    id: number;
    name: string;
    image: string;
};

type Rates = {
    count: number;
    avg: string;
};

export type Product = {
    id: number;
    name: string;
    is_cart: boolean;
    cart_item_id: number | null;
    is_favorite: boolean;
    description: string;
    categories: Category[];
    price: string;
    image: string;
    price_before_discount: string | null;
    discount_percentage: string | null;
    stock: number;
    rates: Rates;
    color_list: any[];
};

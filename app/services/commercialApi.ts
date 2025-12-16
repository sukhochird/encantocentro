// API base URL - adjust this to match your Django server
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface FloorPlan {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  order: number; // Display order
}

export interface Brand {
  id: number;
  name: string;
  image: string;
  order: number; // Display order
}

// Fetch floor plans from Django API
export const fetchFloorPlans = async (): Promise<FloorPlan[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/commercial/floors/`);

    if (!response.ok) {
      throw new Error(`API хариу алдаатай байна: ${response.status}`);
    }

    const data = await response.json();

    // Transform Django API response to match frontend interface
    // Sort by order field
    const floors: FloorPlan[] = (data.results || data).map((floor: any) => ({
      id: floor.id,
      title: floor.title,
      subtitle: floor.subtitle || '',
      image: floor.image || '',
      order: floor.order || floor.id,
    }));

    // Sort by order
    return floors.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error fetching floor plans:', error);
    throw new Error(error instanceof Error ? error.message : 'Давхрын төлөвлөлт ачааллахад алдаа гарлаа');
  }
};

// Fetch brands from Django API
export const fetchBrands = async (): Promise<Brand[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/commercial/brands/`);

    if (!response.ok) {
      throw new Error(`API хариу алдаатай байна: ${response.status}`);
    }

    const data = await response.json();

    // Transform Django API response to match frontend interface
    // Sort by order field
    const brands: Brand[] = (data.results || data).map((brand: any) => ({
      id: brand.id,
      name: brand.name,
      image: brand.image || '',
      order: brand.order || brand.id,
    }));

    // Sort by order
    return brands.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw new Error(error instanceof Error ? error.message : 'Брэндүүд ачааллахад алдаа гарлаа');
  }
};

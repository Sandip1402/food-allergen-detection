import axios, { AxiosInstance } from "axios";
import { ScanResult, Allergen } from "@/context/allergenStore";

// Replace with your actual backend URL
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  "http://10.159.156.148:8000/api";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
    });
  }

  // Scan food/product for allergens
  async scanImage(
    imageUri: string,
    mode: "food" | "ingredient"
  ) {
    try {
      const formData = new FormData();

      formData.append("mode", mode);

      formData.append("image", {
        uri: imageUri,
        type: "image/jpeg",
        name: "scan.jpg",
      } as any);

      const response = await this.api.post(
        "/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get allergen database
  async getAllergens(): Promise<Allergen[]> {
    try {
      const response = await this.api.get<Allergen[]>("/allergens");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get allergen by ID
  async getAllergen(id: string): Promise<Allergen> {
    try {
      const response = await this.api.get<Allergen>(`/allergens/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Search allergens
  async searchAllergens(query: string): Promise<Allergen[]> {
    try {
      const response = await this.api.get<Allergen[]>("/allergens/search", {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get user scan history (if backend supports it)
  async getUserHistory(): Promise<ScanResult[]> {
    try {
      const response = await this.api.get<ScanResult[]>("/scans");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Save scan result to backend
  async saveScan(scan: ScanResult): Promise<ScanResult> {
    try {
      const response = await this.api.post<ScanResult>("/scans", scan);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete scan from backend
  async deleteScan(id: string): Promise<void> {
    try {
      await this.api.delete(`/scans/${id}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.api.get("/health");
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      return new Error(message);
    }
    return new Error("An unexpected error occurred");
  }
}

export const apiService = new ApiService();

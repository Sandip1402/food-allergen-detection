# BiteSure - Allergen Detection System

## Overview
BiteSure is a mobile app interface for an allergen detection system built with React Native, Expo, and TypeScript. The app allows users to scan food products and receive warnings about potential allergens matching their known allergies.

## Features

### 1. **Home Screen** (`/app/index.tsx`)
- Dashboard with quick stats (known allergies, total scans, risk level)
- Recent scan history preview
- Quick access buttons to camera and photo upload
- User allergen display
- Empty state guidance for new users

### 2. **Scanner Screen** (`/app/scanner.tsx`)
- **Camera Mode**: Real-time camera feed with focus guides
- **Photo Capture**: Take pictures of product labels
- **Photo Upload**: Select images from device gallery
- **Analysis Display**: Shows detected allergens with severity levels and confidence scores
- **Product Naming**: Option to name products
- **User Allergy Matching**: Highlights allergens the user is allergic to
- **Warning System**: Visual and alert warnings for dangerous combinations

### 3. **History Screen** (`/app/history.tsx`)
- Complete scan history with expandable cards
- Thumbnail previews of scanned images
- Allergen details and confidence scores
- Delete individual scans
- Clear entire history
- View/Delete actions
- Empty state with guidance

### 4. **Profile Screen** (`/app/profile.tsx`)
- **Allergen Management**: Add/remove personal allergies
- **Allergen Database**: Common allergens with descriptions
- **Settings**: 
  - Notifications toggle
  - Dark mode toggle
- **About Section**: App version and legal links
- **Data Management**: Clear all data option

## Project Structure

```
BiteSure/
├── app/
│   ├── _layout.tsx           # Root layout with tab navigation
│   ├── index.tsx             # Home screen
│   ├── scanner.tsx           # Scanner/camera screen
│   ├── history.tsx           # History screen
│   └── profile.tsx           # Profile/settings screen
├── components/
│   ├── ThemedButton.tsx      # Reusable button component
│   ├── ThemedText.tsx        # Reusable text component
│   └── AllergenCard.tsx      # Allergen display card
├── constants/
│   └── Colors.ts             # Theme colors for light/dark mode
├── context/
│   └── allergenStore.ts      # Zustand state management store
├── services/
│   └── apiService.ts         # Backend API communication
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── app.json                  # Expo config
└── README.md
```

## Technologies Used

### Core
- **React Native 0.81.5**: Mobile app framework
- **Expo 54.0**: Development and deployment platform
- **TypeScript 5.9.2**: Type safety
- **Expo Router 6.0**: File-based routing (similar to Next.js)

### UI & Navigation
- **@react-navigation**: Tab-based navigation
- **@expo/vector-icons**: Material Community Icons
- **React Native Reanimated**: Smooth animations
- **React Native Gesture Handler**: Enhanced gesture support

### Camera & Media
- **expo-camera**: Camera access and photo capture
- **expo-image-picker**: Photo gallery access
- **expo-image**: Image optimization

### State Management & Forms
- **zustand 4.5.2**: Lightweight global state management
- **react-hook-form**: Form handling (ready for future use)

### API & Data
- **axios 1.7.7**: HTTP client for backend communication
- **uuid 9.0.1**: Unique ID generation

### Utilities
- **expo-constants**: Environment variables and constants
- **expo-haptics**: Haptic feedback
- **expo-linking**: Deep linking

## Key Components

### ThemedButton
Reusable button component with variants (primary, secondary, danger), sizes, and loading states.

```tsx
<ThemedButton
  label="Scan"
  icon="camera"
  onPress={() => router.push("/scanner")}
  size="large"
  variant="primary"
/>
```

### ThemedText
Themed text component that adapts to light/dark modes with different text types (default, title, subtitle, link).

```tsx
<ThemedText type="title">My Title</ThemedText>
```

### AllergenCard
Displays allergen information with severity indicators, description, and optional confidence scores.

```tsx
<AllergenCard
  allergen={allergen}
  showConfidence={true}
  confidenceScore={0.92}
/>
```

## State Management (Zustand)

The app uses Zustand for global state management stored in `context/allergenStore.ts`:

```typescript
interface AllergenStore {
  // User preferences
  userPreferences: UserPreferences;
  updateUserAllergies: (allergies: Allergen[]) => void;
  
  // Scan history
  scanHistory: ScanResult[];
  addScanResult: (result: ScanResult) => void;
  removeScanResult: (id: string) => void;
  
  // UI state
  isLoading: boolean;
  error: string | null;
}
```

Usage:
```tsx
const { userPreferences, addScanResult } = useAllergenStore();
```

## API Service

The `apiService` provides methods to communicate with your backend:

```typescript
// Scan an image
apiService.scanImage(imageData);

// Get allergens database
apiService.getAllergens();

// Search allergens
apiService.searchAllergens(query);

// Manage scan history
apiService.saveScan(scan);
apiService.deleteScan(id);
```

**API Base URL**: Set via `EXPO_PUBLIC_API_URL` environment variable or defaults to `http://localhost:3000/api`

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
# or
yarn install
```

### 2. Configure Environment Variables
Create a `.env` file:
```
EXPO_PUBLIC_API_URL=http://your-backend-url/api
```

### 3. Run the App

**Development**:
```bash
npm start
```

**Android**:
```bash
npm run android
```

**iOS**:
```bash
npm run ios
```

**Web**:
```bash
npm run web
```

## Backend Integration

The app is ready to connect to your backend. You need to implement these endpoints:

### Required Endpoints

**POST `/api/scan`**
- Input: Image data and product name
- Output: Detected allergens with confidence scores

**GET `/api/allergens`**
- Output: Database of all allergens

**GET `/api/allergens/:id`**
- Output: Specific allergen details

**GET `/api/allergens/search?q=query`**
- Output: Search results for allergen query

**GET `/api/health`**
- Output: Health check response

### Example Backend Response Format

```json
{
  "id": "unique-id",
  "imageUri": "file://...",
  "detectedAllergens": [
    {
      "id": "1",
      "name": "Peanuts",
      "severity": "high",
      "description": "Tree nut allergen"
    }
  ],
  "confidence": 0.92,
  "timestamp": "2024-01-01T00:00:00Z",
  "productName": "Snack Bar"
}
```

## Permissions Required

### Android
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

### iOS
```xml
<key>NSCameraUsageDescription</key>
<string>We need camera access to scan product labels</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>We need access to your photos to upload product images</string>
```

## Theming

Colors are defined in `constants/Colors.ts`:

```typescript
Colors = {
  light: {
    tint: "#0A84FF",
    background: "#fff",
    success: "#34C759",
    warning: "#FF9500",
    danger: "#FF3B30",
    info: "#00C7FD",
  },
  dark: { /* ... */ }
}
```

The app automatically uses light or dark theme based on system preferences.

## Mock Data

The app currently uses mock data for demonstrations:
- Scanner returns sample allergens (Peanuts, Dairy)
- Profile has 10 common allergens to choose from
- History stores scans in local state

Replace with actual backend calls when ready.

## Suggested Enhancements

1. **Authentication**: Add user login/signup
2. **Push Notifications**: Send alerts for new allergen info
3. **Barcode Scanning**: Integrate barcode reading
4. **Sharing**: Share scan results with family/doctors
5. **Dietary Filters**: Add vegan, keto, etc. filters
6. **Restaurant Mode**: Search restaurant menus
7. **Sync Across Devices**: Cloud synchronization
8. **Ingredient Recognition**: ML model integration
9. **Offline Mode**: Cache data for offline use
10. **Real-time Collaboration**: Share allergies with household

## Troubleshooting

### Camera not working
- Check permissions in `app.json`
- Ensure device camera is accessible
- Verify `expo-camera` is installed

### Images not loading
- Check image URIs are valid
- Ensure `expo-image` is properly configured
- Verify file permissions

### State not persisting
- State is currently in-memory; implement AsyncStorage for persistence
- Consider using `@react-native-async-storage/async-storage`

## Contributing

When adding new features:
1. Create new screen files in `/app`
2. Add components in `/components`
3. Use Zustand for state management
4. Follow TypeScript types strictly
5. Use themed colors for consistency

## License

Your license here

---

**Ready for Backend Integration**: This is a fully functional frontend. Your backend should implement the API endpoints described above, and the app will automatically integrate with them.

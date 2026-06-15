# Quick Start Guide

## Installation

1. **Navigate to project directory**
   ```bash
   cd BiteSure
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your device**
   - **Android**: Press `a` in terminal or `npm run android`
   - **iOS**: Press `i` in terminal or `npm run ios`
   - **Web**: Press `w` in terminal or `npm run web`

## What You Get

✅ **4 Main Screens**
- Home: Dashboard with stats and quick actions
- Scanner: Camera + photo upload with allergen detection
- History: Scan history with expandable details
- Profile: Allergen management and app settings

✅ **Complete UI Components**
- Themed buttons with variants
- Allergen cards with severity indicators
- Consistent dark/light mode support

✅ **State Management**
- Zustand for global state
- Scan history tracking
- User preferences storage

✅ **Backend Ready**
- API service layer configured
- Ready to connect to your backend
- Mock data for testing

## Next Steps

### 1. Connect Your Backend
Update `EXPO_PUBLIC_API_URL` in `.env`:
```
EXPO_PUBLIC_API_URL=http://your-backend.com/api
```

Update the mock detection in `app/scanner.tsx` to call your actual backend:
```typescript
// Replace this:
const result: ScanResult = { /* mock data */ };

// With this:
const result = await apiService.scanImage({
  uri: capturedImage,
  productName: productName
});
```

### 2. Add Data Persistence
Install AsyncStorage:
```bash
npm install @react-native-async-storage/async-storage
```

Update `context/allergenStore.ts` to persist data.

### 3. Add Authentication
Implement login/signup screens in `/app`
Update API service with auth headers

### 4. Enable Push Notifications
```bash
npm install expo-notifications
```

### 5. Test Camera Permissions
The app requests camera permissions automatically. Grant permission when prompted.

## Available Scripts

```bash
npm start           # Start Expo dev server
npm run android     # Run on Android
npm run ios         # Run on iOS
npm run web         # Run on web
npm run lint        # Check code quality
```

## Project Structure Quick Reference

```
/app              → Screens (auto-routed via Expo Router)
/components       → Reusable UI components
/constants        → Theme colors and configs
/context          → Global state (Zustand)
/services         → API and external services
```

## Features by Screen

### Home
- Risk level indicator
- Known allergies display
- Recent scans preview
- Quick scan buttons

### Scanner
- Live camera feed
- Photo gallery upload
- Allergen detection results
- Confidence scoring
- User allergy warnings

### History
- Complete scan list
- Expandable details
- Delete individual/all scans
- Allergen breakdown per scan

### Profile
- Add/remove allergies
- Allergen database browser
- Notifications toggle
- Dark mode toggle
- App info & legal

## Customization

### Colors
Edit `constants/Colors.ts`:
```typescript
tint: "#0A84FF",        // Main brand color
success: "#34C759",     // Safe/OK state
warning: "#FF9500",     // Caution state
danger: "#FF3B30",      // Danger state
```

### Icons
Replace icons from `@expo/vector-icons`:
```tsx
<MaterialCommunityIcons name="camera" size={24} color={color} />
```

### Allergen List
Edit the `COMMON_ALLERGENS` array in `app/profile.tsx`

## Testing

### Test Data
The app includes mock allergens and scan results for testing without a backend.

### Camera Fallback
If camera permission is denied, the app shows a fallback UI with permission request.

### Empty States
All screens have proper empty states with guidance.

## Deployment

### Build for Production
```bash
# Android
eas build --platform android

# iOS
eas build --platform ios
```

### Publish
```bash
eas submit --platform android
eas submit --platform ios
```

## Troubleshooting

**Camera not working?**
- Check permissions in `app.json`
- Ensure `expo-camera` is installed: `npm install expo-camera`

**Build errors?**
- Clear cache: `npm start -- --clear`
- Reinstall: `rm -rf node_modules && npm install`

**State not saving?**
- Currently uses in-memory state
- Add AsyncStorage for persistence (see step 2 in Next Steps)

**Backend connection issues?**
- Verify `EXPO_PUBLIC_API_URL` is correct
- Check network connectivity
- Verify backend is running and accessible

## Backend API Contract

Your backend should provide these endpoints:

```
POST   /api/scan              # Analyze image for allergens
GET    /api/allergens         # Get allergen database
GET    /api/allergens/:id     # Get allergen details
GET    /api/allergens/search  # Search allergens
GET    /api/health            # Health check
```

See `APP_DOCUMENTATION.md` for detailed API specs.

## Support

For issues or questions:
1. Check `APP_DOCUMENTATION.md` for detailed info
2. Review code comments in component files
3. Check Expo Router documentation: https://docs.expo.dev/router/
4. Check React Native docs: https://reactnative.dev/

---

**Ready to go!** Your allergen detection app interface is ready for backend integration. 🎉

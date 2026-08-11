import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import BookingModal from "./components/BookingModal";
import RecipeModal from "./components/RecipeModal";
import PageTransition from "./components/animations/PageTransition";
import HomePage from "./pages/HomePage";
import RecipesPage from "./pages/RecipesPage";
import CateringPage from "./pages/CateringPage";
import AboutPage from "./pages/AboutPage";
import ShopPage from "./pages/ShopPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [recipeOpen, setRecipeOpen] = useState(null);
  const location = useLocation();

  const onBookClick = () => setBookingOpen(true);
  const onOpenRecipe = (recipe) => setRecipeOpen(recipe);
  const onCloseRecipe = () => setRecipeOpen(null);

  return (
    <div className="app-shell">
      <Header onBookClick={onBookClick} />

      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <HomePage
                    onOpenRecipe={onOpenRecipe}
                    onBookClick={onBookClick}
                  />
                </PageTransition>
              }
            />
            <Route
              path="/services"
              element={
                <PageTransition>
                  <CateringPage onBookClick={onBookClick} />
                </PageTransition>
              }
            />
            <Route
              path="/menus"
              element={
                <PageTransition>
                  <RecipesPage onOpenRecipe={onOpenRecipe} />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <AboutPage />
                </PageTransition>
              }
            />
            <Route
              path="/journal"
              element={
                <PageTransition>
                  <ShopPage />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <ContactPage />
                </PageTransition>
              }
            />
            <Route path="/recipes" element={<Navigate to="/menus" replace />} />
            <Route path="/catering" element={<Navigate to="/services" replace />} />
            <Route path="/shop" element={<Navigate to="/journal" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
      <RecipeModal recipe={recipeOpen} onClose={onCloseRecipe} />
    </div>
  );
}

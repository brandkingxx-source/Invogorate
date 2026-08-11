import { useState, useMemo } from "react";
import { Search, X, ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { RECIPES_DATA } from "../data/siteData";
import SplitText from "../components/animations/SplitText";
import Reveal from "../components/animations/Reveal";

const COURSES = ["All", "Main Meals", "Desserts", "Baked Goods", "Drinks & Elixirs"];
const DIETS = ["All", "Seed-Oil Free", "Gluten-Free", "Raw Vegan", "Gut Healthy", "Meal Prep"];

export default function RecipesPage({ onOpenRecipe }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [selectedDiet, setSelectedDiet] = useState("All");

  const filtered = useMemo(() => {
    return RECIPES_DATA.filter((r) => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.subtitle.toLowerCase().includes(q) ||
        r.ingredients.some((i) => i.item.toLowerCase().includes(q));
      const matchCourse = selectedCourse === "All" || r.course === selectedCourse;
      const matchDiet = selectedDiet === "All" || r.diet.includes(selectedDiet);
      return matchSearch && matchCourse && matchDiet;
    });
  }, [searchQuery, selectedCourse, selectedDiet]);

  return (
    <div className="page page--recipes">
      <section className="page-hero page-hero--compact">
        <div className="page-hero-bg">
          <img
            src="https://images.pexels.com/photos/1580466/pexels-photo-1580466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
            aria-hidden="true"
          />
        </div>
        <div className="container page-hero-content">
          <span className="section-eyebrow section-eyebrow--light">Wholefood Recipe Vault</span>
          <SplitText
            text="100% Seed-Oil Free Organic Recipes"
            className="page-hero-title"
          />
          <p>
            Filter by dietary goals, scale servings for catering batches, and open hands-free Cook Mode with
            built-in timers.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="search-bar-wrap">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search by ingredient, dish, or dietary tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-bar"
            />
            {searchQuery && (
              <button type="button" className="search-clear" onClick={() => setSearchQuery("")}>
                <X size={18} />
              </button>
            )}
          </Reveal>

          <Reveal delay={0.1} className="filter-row">
            <div className="filter-group">
              <span className="filter-label">Course</span>
              <div className="filter-pills horizontal-scroll">
                {COURSES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`filter-pill ${selectedCourse === c ? "filter-pill--active" : ""}`}
                    onClick={() => setSelectedCourse(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <span className="filter-label">Diet</span>
              <div className="filter-pills horizontal-scroll">
                {DIETS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    className={`filter-pill ${selectedDiet === d ? "filter-pill--active" : ""}`}
                    onClick={() => setSelectedDiet(d)}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <p className="results-count">
            Showing <strong>{filtered.length}</strong> of {RECIPES_DATA.length} recipes
          </p>

          <div className="card-grid card-grid--auto">
            {filtered.map((recipe, i) => (
              <Reveal key={recipe.id} delay={(i % 6) * 0.06} direction="up">
                <motion.article
                  className="recipe-card recipe-card--full"
                  whileHover={{ y: -8 }}
                  onClick={() => onOpenRecipe(recipe)}
                >
                  <div className="recipe-card-img">
                    <img src={recipe.image} alt={recipe.title} />
                    <span className="badge-seed-oil">100% Seed-Oil Free</span>
                    <span className="recipe-course-tag">{recipe.course}</span>
                  </div>
                  <div className="recipe-card-body">
                    <div className="recipe-meta">
                      <span className="recipe-rating">
                        <Star size={13} fill="var(--brand-accent)" color="var(--brand-accent)" />
                        {recipe.rating}
                      </span>
                      <span>{recipe.prepTime + recipe.cookTime} min</span>
                      <span>{recipe.servings} servings</span>
                    </div>
                    <h4>{recipe.title}</h4>
                    <p>{recipe.subtitle}</p>
                    <div className="recipe-tags">
                      {recipe.tags.slice(0, 3).map((t) => (
                        <span key={t} className="tag-chip">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="card-link">
                      View Recipe & Cook Mode <ArrowRight size={14} />
                    </span>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state">
              <p>No recipes match your filters. Try adjusting your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

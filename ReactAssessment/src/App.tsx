import Loading from "./Loading/Loading";
import { useState, useEffect } from "react";
import "./App.css";
import { API_KEY, CX } from "../config";

const App: React.FC = () => {
  const [animal, setAnimal] = useState<string>("");
  const [adjective, setAdjective] = useState<string>("");
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAnimalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAnimal(value);
    setImageURL(null);
    setAdjective("");
    setErrorMessage(null);
  };

  const generateRandomAdjective = (): string => {
    const adjectives: string[] = [
      "Happy",
      "Sad",
      "Angry",
      "Excited",
      "Calm",
      "Energetic",
      "Peaceful",
      "Anxious",
      "Brave",
      "Shy",
      "Confident",
      "Timid",
      "Curious",
      "Intelligent",
      "Creative",
      "Generous",
      "Selfish",
      "Ambitious",
      "Lazy",
      "Hardworking",
      "Patient",
      "Impatient",
      "Friendly",
      "Hostile",
      "Polite",
      "Rude",
      "Honest",
      "Dishonest",
      "Trustworthy",
      "Untrustworthy",
      "Optimistic",
      "Pessimistic",
      "Joyful",
      "Gloomy",
      "Sincere",
      "Fake",
      "Modest",
      "Arrogant",
      "Humble",
      "Proud",
      "Grateful",
      "Ungrateful",
      "Cheerful",
      "Melancholic",
      "Enthusiastic",
      "Apathetic",
      "Loyal",
      "Disloyal",
      "Caring",
      "Indifferent",
    ];

    const randomIndex = Math.floor(Math.random() * adjectives.length);
    return adjectives[randomIndex];
  };

  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setAdjective(generateRandomAdjective());
    }, 1000);

    return () => clearTimeout(typingTimeout);
  }, [animal]);

  const handleFetchError = (error: any) => {
    console.error("Error fetching data from Google:", error);
    setErrorMessage("An error occurred while fetching data from Google.");
    setLoading(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const minLength = 2;
    const maxLength = 20;

    if (animal.length < minLength || animal.length > maxLength) {
      setErrorMessage(
        `Animal name must be between ${minLength} and ${maxLength} characters.`
      );
      return;
    }

    const searchURL = `https://www.googleapis.com/customsearch/v1?q=${animal} ${adjective}&key=${API_KEY}&cx=${CX}&searchType=image`;

    try {
      const response = await fetch(searchURL);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        setImageURL(data.items[0].link);
        setErrorMessage(null);
      } else {
        setErrorMessage("No image found for the specified animal.");
      }
    } catch (error) {
      handleFetchError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <header>
        <h1>Favorite Animal</h1>
      </header>
      <section>
        <form onSubmit={handleSubmit}>
          <label>
            Enter your favorite animal:
            <input
              className="input-field"
              type="text"
              value={animal}
              onChange={handleAnimalChange}
              required
            />
          </label>
          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {loading ? (
          <Loading />
        ) : (
          imageURL && (
            <div className="image-container">
              <h2>
                Your {adjective} {animal}
              </h2>
              <figure>
                <img
                  className="animal-image"
                  src={imageURL}
                  alt={`${adjective} ${animal}`}
                />
                <figcaption>
                  Image of a {adjective} {animal}
                </figcaption>
              </figure>
            </div>
          )
        )}
      </section>
    </main>
  );
};

export default App;
